import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import { renderMetaTags } from "react-datocms";
import styles from "~/styles/global.css";
import { metaTagsFragment } from "~/lib/fragments";
import { request } from "~/lib/datocms";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const graphqlRequest = {
  query: `
      {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        blog {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
        }
      }
      ${metaTagsFragment}
    `,
};

export const loader = () => {
  return request(graphqlRequest);
};

export default function App() {
  const { blog, site } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {renderMetaTags(blog.seo.concat(site.favicon))}
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
