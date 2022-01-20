# A Blog example using Remix and DatoCMS

This example showcases a [Remix](https://remix.run/docs) Blog using [DatoCMS](https://www.datocms.com/) as the data source.

The purpose of this repo is to have a quick start reference that can be set up with the "one-click" button below.

## Demo

Have a look at the end result live:

### [https://remix-example-blog.netlify.app/](https://remix-example-blog.netlify.app/)

## How to use

### Quick start

1. [Create an account on DatoCMS](https://datocms.com).

2. Let DatoCMS set everything up for you clicking this button:

[![Deploy with DatoCMS](https://dashboard.datocms.com/deploy/button.svg)](https://dashboard.datocms.com/deploy?repo=datocms/remix-example:main)

## Development

In your DatoCMS' project, go to the **Settings** menu at the top and click **API tokens**.

Then click **Read-only API token** and copy the token.

Next, copy the `.env.example` file in this directory to `.env` (which will be ignored by Git):

```bash
cp .env.example .env
```

Then set each variable on `.env`:

- `DATOCMS_READONLY_TOKEN` should be the API token you just copied.

Your `.env` file should look like this:

```bash
DATOCMS_READONLY_TOKEN=
```

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.
