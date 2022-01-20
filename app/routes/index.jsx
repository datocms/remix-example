import { Link } from 'remix';
import { useLoaderData } from 'remix';
import styles from '~/styles/index.css';
import { datoQuerySubscription } from '~/lib/datocms';
import { Image, useQuerySubscription } from 'react-datocms';
import { responsiveImageFragment } from '~/lib/fragments';
import { Avatar, links as avatarLinks } from '~/components/Avatar';
import { Date, links as dateLinks } from '~/components/Date';

export function links() {
  return [
    ...avatarLinks(),
    ...dateLinks(),
    { rel: 'stylesheet', href: styles },
  ];
}

export const loader = ({ request }) => {
  return datoQuerySubscription({
    request,
    query: `
      {
        posts: allPosts(orderBy: date_DESC, first: 20) {
          title
          slug
          excerpt
          date
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
          author {
            name
            picture {
              url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
            }
          }
        }
      }
      ${responsiveImageFragment}
    `,
  });
};

export default function Index() {
  const { datoQuerySubscription } = useLoaderData();

  const {
    data: { posts: [firstPost, ...otherPosts] },
  } = useQuerySubscription(datoQuerySubscription);

  return (
    <div className="container">
      <section className="section">
        <div className="flex">
          <h1 className="title">Remix Blog</h1>
          <h4 className="subtitle">A blog example using Remix and DatoCMS.</h4>
        </div>
      </section>
      <section className="section">
        <Image
          className="grid__image"
          data={firstPost.coverImage.responsiveImage}
        />
        <Link to={`/posts/${firstPost.slug}`}>
          <h5 className="grid__title">{firstPost.title}</h5>
        </Link>

        <Date dateString={firstPost.date} />
        <Avatar
          name={firstPost.author.name}
          picture={firstPost.author.picture}
        />
      </section>
      <section className="section">
        <ul className="grid">
          {otherPosts.map((post) => (
            <li key={post.slug} className="grid__item">
              <Link to={`/posts/${post.slug}`} className="grid__link">
                <div>
                  <Image
                    className="grid__image"
                    data={post.coverImage.responsiveImage}
                  />
                  <p className="grid__title">{post.title}</p>
                  <Date dateString={post.date} />
                  <p className="date">{post.excerpt}</p>
                  <Avatar
                    name={post.author.name}
                    picture={post.author.picture}
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
