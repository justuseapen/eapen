# Eapen Workshop production packaging

Validated September 8, 2026, at approximately 19:01 UTC against the final local nginx preview. The integrity check passed with external font accounting enabled. These measurements describe this build; subsequent UI edits require rebuilding and rerunning the command below. No production service was changed. The exact final integrity output is saved in `eapen-workshop/packaging-final.json`.

## Preview and build identity

- Preview: <http://127.0.0.1:8003>
- Image: `eapen-workshop:preview`
- Image ID: `sha256:4a6b7839ea16726eb79a98c424f7d1520e28517939e5c21b3d0456e0053a78e6`
- Container: `eapen-workshop-preview`
- Container ID: `4f25b27d07e355dd1e577f9b4a59b4f313f50a16f898481788539855d1b20429`
- Runtime: nginx `1.31.5`; `nginx -t` passed.

The preview binds only to localhost. The existing container on port 8001 and other local services were left running.

## Production contents and HTTP behavior

`Dockerfile` and `.dockerignore` both restrict production inputs. The document root contains 23 public files, totaling 1,326,283 uncompressed bytes. The test compared every file in the running container with the public allowlist and the current checkout bytes. The final social card is a genuine 1200 × 630 PNG, totaling 588,550 bytes; it contributes to the document-root total but is not an initial homepage resource.

The image includes the homepage, original portrait, finished root branding images, crawler files, three essays, three case pages, three stylesheets, two workshop images, and four explicitly named JavaScript modules. Operational `scripts/autopost.py` is excluded. Source art, the source headshot PNG, internal documentation, `.claude`, `.git`, tests, essay drafts, and `podcast.html` are excluded from the build context and document root. nginx's stock welcome/error HTML files are also removed.

All seven sitemap routes returned complete HTML:

- `/`
- `/work/1t-home.html`
- `/work/tradecraft.html`
- `/work/pavlok.html`
- `/essays/moderation-without-the-lean.html`
- `/essays/platform-risk-is-political-risk.html`
- `/essays/why-the-bay-cant-help.html`

The homepage and case canonical tags match their sitemap URLs. The existing essays have no canonical tags; this pass preserves their content and routes.

The recursive HTTP check followed 21 local routes/resources and checked 26 fragment links. It inspected HTML asset references, responsive image alternatives, CSS URLs, JavaScript module imports, PNG/WebP/JPEG signatures, and social-card dimensions. All shipping image elements have declared width and height. Seventeen private or nonexistent URL probes returned 403/404. Missing routes have no homepage fallback.

HTML, CSS, and JavaScript are served with gzip, ETags, and `Cache-Control: no-cache` so stable filenames revalidate. Images have ETags and a one-hour cache lifetime. No immutable caching is used for unversioned assets. Responses include `X-Content-Type-Options: nosniff`.

## Transfer accounting

These are response-body byte counts from real HTTP requests with `Accept-Encoding: gzip`. The script measures Google Fonts with a Chrome mobile user agent and normal certificate verification.

| Measurement | Bytes | Budget |
| --- | ---: | ---: |
| All first-party JavaScript, compressed | 11,303 | 40,000 |
| Homepage first-party resources, conservative upper bound | 203,743 | — |
| External font CSS and every returned font file (20 resources) | 370,024 | — |
| Combined conservative homepage upper bound | 573,767 | 1,000,000 |

| Homepage first-party resource | Transferred bytes |
| --- | ---: |
| HTML | 7,831 |
| Favicon | 234 |
| Headshot, 400px | 14,130 |
| Headshot, 800px | 53,814 |
| Small studio surface | 14,888 |
| Desktop studio surface | 82,780 |
| `site.js` | 815 |
| `workshop-demo.js` | 6,574 |
| `workshop-navigation.js` | 2,781 |
| `workshop-policy.js` | 1,133 |
| `cases.css` | 2,411 |
| `site.css` | 10,937 |
| `workshop-demo.css` | 5,415 |

The upper bound deliberately counts both responsive hero variants, all homepage image variants including lazy images, all four modules, and every subset/weight returned by the external font stylesheet. A mobile browser normally requests a smaller selection. Case-page HTML and unused root images are not part of the initial homepage inventory. No detailed case photographs or optional media currently load on the homepage.

This is not a browser waterfall or a Core Web Vitals measurement. It excludes HTTP headers and TLS overhead; it establishes no LCP, INP, CLS, rendering speed, animation smoothness, mobile device, Safari, or Firefox result. Browser interaction and performance validation belong to the separate release audit.

## Reproduce the final preview

Run from the repository root. Remove only the task's preview container when replacing it:

```sh
docker build -t eapen-workshop:preview .
docker rm -f eapen-workshop-preview
docker run --detach --name eapen-workshop-preview --publish 127.0.0.1:8003:80 eapen-workshop:preview
docker exec eapen-workshop-preview nginx -t
/usr/bin/python3 tests/site-integrity.py --base-url http://127.0.0.1:8003 --container eapen-workshop-preview --include-fonts
```

The tested macOS Python executable uses working system CA certificates. The script otherwise needs only Python 3.9+ and its standard library; `--include-fonts` needs internet access. Omit that flag for a first-party-only check, which intentionally reports the combined mobile estimate as unmeasured.

The integrity test fails when served public bytes differ from the checkout, including when another task changes the UI after the image was built. Rebuild to refresh that snapshot. It also fails for missing packaged assets, broken internal fragments, unexpected document-root files, incorrect canonical case URLs, image-format mismatches, incorrect social-card dimensions, lost compression, and exceeded transfer budgets. No browser is launched by this test.
