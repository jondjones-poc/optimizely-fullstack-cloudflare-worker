# Optimizely FullStack Edge SDK Demo - By Jon D Jones 💥

Uses Optimizely FullStack with the [Optimizely Edge SDK](https://docs.developers.optimizely.com/full-stack/v4.0/docs/edge-sdks) to do basic experimentation and bucketing within a Cloudflare worker.

## Live Demo 👻

 - [Website](https://opti-fullstack-sdk.jonjones.workers.dev/)
 - [Github](https://github.com/jondjones-poc/optimizely-fullstack-cloudflare-worker)

## Useful Links ⚡️ 

- [Redirects](https://docs.developers.optimizely.com/full-stack/v4.0/docs/edge-sdksts)

- [Cloudflare Documentation](https://developers.cloudflare.com/workers/)

## Steps To Create your Own Worker

- Install [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler).

- Create a project

```bash
wrangler generate projectname https://github.com/optimizely/cloudflare-worker-template
```

- Add `account_id` in `wrangler.toml`. This is found within the Workers page in Cloudflare

- Install packages

```bash
npm install
```

- Within `src/index.js`, update the Optimizely `sdkKey`, `flagKey` and `userId`

- Run the worker locally using

```bash
wrangler dev
```
