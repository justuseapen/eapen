#!/usr/bin/env python3
"""Check the built static site over HTTP; no browser or third-party packages.

python3 tests/site-integrity.py --base-url http://127.0.0.1:8003 \
    --container eapen-workshop-preview --include-fonts

The transfer inventory is conservative accounting, not a browser waterfall or CWV
measurement. It includes every homepage image variant, all imported modules, and
(with --include-fonts) every font file returned for the mobile user agent.
"""

import argparse
import gzip
import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit
from urllib.request import Request, urlopen
from xml.etree import ElementTree

ORIGIN = 'https://eapentechnology.com'
ROOT = Path(__file__).resolve().parent.parent
MOBILE_UA = ('Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 '
             '(KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36')
PUBLIC_GLOBS = [
    'index.html', 'portrait.jpg', 'robots.txt', 'sitemap.xml',
    'assets/*.webp', 'assets/*.svg', 'assets/social-card.png',
    'assets/workshop/*.webp', 'assets/workshop/*.svg', 'assets/workshop/*.avif',
    'styles/*.css', 'scripts/site.js', 'scripts/workshop-demo.js',
    'scripts/workshop-policy.js', 'scripts/workshop-navigation.js',
    'essays/*.html', 'work/*.html',
]
PRIVATE_PATHS = [
    '/design/', '/docs/', '/tests/', '/.claude/', '/.git/config', '/Dockerfile',
    '/nginx.conf', '/CLAUDE.md', '/crm.md', '/podcast.html', '/scripts/autopost.py',
    '/assets/justus-headshot-source.png', '/essays/_drafts/why-the-bay-cant-help.md',
    '/docs/plans/2026-09-08-1320-feat-eapen-workshop-experience-plan.md',
    '/tests/site-integrity.py',
]


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.refs, self.resources, self.font_css = [], [], []
        self.ids, self.canonical, self.images = set(), None, []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        resource = tag in ('img', 'source', 'script', 'video', 'audio')
        if tag == 'link':
            resource = attrs.get('rel') in ('stylesheet', 'preload', 'icon')
            if attrs.get('rel') == 'canonical':
                self.canonical = attrs.get('href')
            if attrs.get('rel') == 'stylesheet' and attrs.get('href', '').startswith('https://fonts.googleapis.com/'):
                self.font_css.append(attrs['href'])
        refs = [attrs[key] for key in ('href', 'src', 'poster') if attrs.get(key)]
        if attrs.get('srcset') and not attrs['srcset'].startswith('data:'):
            refs.extend(item.strip().split()[0] for item in attrs['srcset'].split(','))
        if tag == 'meta' and attrs.get('property', attrs.get('name')) in ('og:image', 'twitter:image'):
            refs.append(attrs.get('content', ''))
        self.refs.extend(refs)
        if resource:
            self.resources.extend(refs)
        if tag == 'img':
            self.images.append(attrs)


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def check_image(name, data):
    if name.endswith('.png'):
        check(data.startswith(b'\x89PNG\r\n\x1a\n'), 'PNG extension does not match image bytes: ' + name)
    elif name.endswith('.webp'):
        check(data[:4] == b'RIFF' and data[8:12] == b'WEBP', 'Invalid WebP image: ' + name)
    elif name.endswith(('.jpg', '.jpeg')):
        check(data.startswith(b'\xff\xd8\xff'), 'Invalid JPEG image: ' + name)
    if name == 'assets/social-card.png':
        width, height = int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')
        check((width, height) == (1200, 630), 'Social preview must be 1200 × 630 pixels.')


def css_refs(text):
    # Match a whole quoted data URL before looking for the next CSS URL.
    pattern = r'''url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s]+))\s*\)'''
    return [next(value for value in match if value) for match in re.findall(pattern, text)]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default='http://127.0.0.1:8003')
    parser.add_argument('--container', help='Also compare the nginx document root with the public allowlist.')
    parser.add_argument('--include-fonts', action='store_true', help='Fetch Google Fonts CSS and all referenced font files for a conservative upper bound.')
    args = parser.parse_args()
    base = args.base_url.rstrip('/')
    local_host = urlsplit(base).netloc
    responses, pages = {}, {}

    def resolve(ref, source='/'):
        url = urlsplit(urljoin(base + source, ref))
        if url.scheme not in ('http', 'https') or url.netloc not in (local_host, urlsplit(ORIGIN).netloc):
            return None
        return urlunsplit(('', '', url.path or '/', url.query, ''))

    def fetch(url):
        if url not in responses:
            request = Request(url, headers={'Accept-Encoding': 'gzip', 'User-Agent': MOBILE_UA})
            try:
                response = urlopen(request, timeout=20)
            except HTTPError as error:
                response = error
            with response:
                wire = response.read()
                encoding = response.headers.get('Content-Encoding')
                data = gzip.decompress(wire) if encoding == 'gzip' else wire
                responses[url] = {
                    'status': response.status, 'wire_bytes': len(wire), 'data': data,
                    'type': response.headers.get('Content-Type', ''),
                    'encoding': encoding, 'cache': response.headers.get('Cache-Control'),
                    'etag': response.headers.get('ETag'),
                }
        return responses[url]

    def get(path):
        result = fetch(base + path)
        check(result['status'] == 200, '{} returned {}'.format(path, result['status']))
        return result

    sitemap = ElementTree.fromstring(get('/sitemap.xml')['data'])
    canonical_paths = [resolve(node.text) for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    check(None not in canonical_paths, 'Sitemap contains an unexpected host.')
    check(len(canonical_paths) == len(set(canonical_paths)), 'Sitemap contains duplicate routes.')
    for path in ('/', '/work/1t-home.html', '/work/tradecraft.html', '/work/pavlok.html'):
        check(path in canonical_paths, 'Missing canonical sitemap route: ' + path)

    pending, checked, fragments = list(canonical_paths) + ['/robots.txt'], set(), []
    while pending:
        path = pending.pop()
        if path in checked:
            continue
        checked.add(path)
        result = get(path)
        text = result['data'].decode('utf-8') if any(kind in result['type'] for kind in ('text/', 'javascript', 'xml', 'json')) else ''
        refs = []
        if 'text/html' in result['type']:
            page = pages[path] = Page(text)
            refs = page.refs
            if path == '/' or path.startswith('/work/') or page.canonical:
                check(page.canonical == ORIGIN + path, 'Canonical URL mismatch on ' + path)
            for img in page.images:
                check(img.get('width') and img.get('height'), 'Image dimensions missing on {}: {}'.format(path, img.get('src')))
        elif 'text/css' in result['type']:
            refs = css_refs(text)
        elif 'javascript' in result['type']:
            refs = re.findall(r'(?:\bfrom\s*|\bimport\s*)[\'"]([^\'"]+)', text)
        for ref in refs:
            target = resolve(ref, path)
            if target:
                pending.append(target)
                fragment = urlsplit(urljoin(base + path, ref)).fragment
                if fragment and not ref.startswith('url('):
                    fragments.append((path, target, unquote(fragment)))

    for source, target, fragment in fragments:
        if target in pages:
            check(fragment in pages[target].ids, '{} links to missing {}#{}'.format(source, target, fragment))

    public_files = sorted({str(path.relative_to(ROOT)) for pattern in PUBLIC_GLOBS for path in ROOT.glob(pattern) if path.is_file()})
    for name in public_files:
        result = get('/' + name)
        check(result['data'] == (ROOT / name).read_bytes(), 'Container is stale or differs from the checkout: ' + name)
        check_image(name, result['data'])
        if name.endswith(('.js', '.css', '.html')):
            check(result['encoding'] == 'gzip', 'Expected gzip delivery: ' + name)
            check(result['cache'] == 'no-cache', 'Unversioned text must revalidate: ' + name)
        check(result['etag'], 'ETag missing: ' + name)

    for path in PRIVATE_PATHS + ['/work/does-not-exist.html', '/missing.js']:
        check(fetch(base + path)['status'] in (403, 404), 'Unexpectedly served private or nonexistent path: ' + path)
    if args.container:
        output = subprocess.check_output(['docker', 'exec', args.container, 'find', '/usr/share/nginx/html', '-type', 'f'], text=True)
        actual = sorted(line.removeprefix('/usr/share/nginx/html/') for line in output.splitlines())
        check(actual == public_files, 'Container document-root inventory differs from allowlist: ' + repr(sorted(set(actual) ^ set(public_files))))

    js_paths = [path for path in public_files if path.endswith('.js')]
    js_bytes = sum(get('/' + path)['wire_bytes'] for path in js_paths)
    check(js_bytes <= 40000, 'First-party compressed JavaScript exceeds the 40 KB budget.')

    # Count all homepage image variants, including lazy images, plus all public JS.
    # This is an upper bound for first-party mobile requests, independent of DPR.
    homepage_resources = {'/'} | {'/' + path for path in js_paths}
    homepage_resources.update(filter(None, (resolve(ref) for ref in pages['/'].resources)))
    css_pending = [path for path in homepage_resources if path.endswith('.css')]
    while css_pending:
        source = css_pending.pop()
        for ref in css_refs(get(source)['data'].decode('utf-8')):
            target = resolve(ref, source)
            if target and target not in homepage_resources:
                homepage_resources.add(target)
                if target.endswith('.css'):
                    css_pending.append(target)
    first_party_bytes = sum(get(path)['wire_bytes'] for path in homepage_resources)
    font_resources = set(pages['/'].font_css) if args.include_fonts else set()
    if args.include_fonts:
        for url in list(font_resources):
            response = fetch(url)
            check(response['status'] == 200, 'Font stylesheet unavailable: ' + url)
            font_resources.update(ref for ref in css_refs(response['data'].decode('utf-8')) if ref.startswith('https://'))
        for url in font_resources:
            check(fetch(url)['status'] == 200, 'Font resource unavailable: ' + url)
    font_bytes = sum(fetch(url)['wire_bytes'] for url in font_resources)
    if args.include_fonts:
        check(first_party_bytes + font_bytes <= 1000000, 'Conservative homepage transfer exceeds the 1 MB budget; inspect browser requests before claiming a mobile pass.')

    print(json.dumps({
        'result': 'pass', 'base_url': base, 'container': args.container,
        'canonical_routes': canonical_paths, 'public_file_count': len(public_files),
        'public_files_uncompressed_bytes': sum((ROOT / path).stat().st_size for path in public_files),
        'checked_local_routes_and_resources': len(checked), 'checked_fragment_links': len(fragments),
        'private_or_missing_routes_rejected': len(PRIVATE_PATHS) + 2,
        'gzip_javascript_bytes': js_bytes, 'javascript_budget_bytes': 40000,
        'homepage_first_party_upper_bound_bytes': first_party_bytes,
        'homepage_first_party_resources': {path: get(path)['wire_bytes'] for path in sorted(homepage_resources)},
        'external_font_css_and_all_font_files_bytes': font_bytes if args.include_fonts else None,
        'external_font_resource_count': len(font_resources) if args.include_fonts else None,
        'homepage_transfer_upper_bound_bytes': first_party_bytes + font_bytes if args.include_fonts else None,
        'mobile_transfer_budget_bytes': 1000000,
        'limitation': 'HTTP payload accounting, not browser performance. Upper bound includes both hero variants, lazy images, and every returned font subset/weight. Headers, TLS overhead, LCP, INP and CLS are not measured.',
    }, indent=2))


if __name__ == '__main__':
    try:
        main()
    except (AssertionError, OSError, ValueError) as error:
        print('FAIL: ' + str(error), file=sys.stderr)
        sys.exit(1)
