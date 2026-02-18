# Auto-Deploy Pipeline Design

## Problem
eapentechnology.com had no deployment pipeline. The site was manually deployed via SCP, which broke and resulted in a 404.

## Solution
Dockerfile in repo + Coolify auto-deploy on push to master.

## Components

### Dockerfile
- `FROM nginx:alpine` + `COPY index.html`
- Nginx serves on port 80; Traefik handles SSL termination

### Coolify Application
- Source: GitHub `justuseapen/eapen`, branch `master`
- Build: Dockerfile
- Domain: `eapentechnology.com`
- Auto-deploy via GitHub webhook on push

### Flow
```
git push master -> GitHub webhook -> Coolify pulls repo -> docker build ->
deploys new container -> Traefik routes eapentechnology.com -> live
```

## Cleanup
- Remove manually deployed `eapen-site` container
- Remove `/opt/eapen-site` from server
