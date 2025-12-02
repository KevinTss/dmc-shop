import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';
import { FeaturedCollectionFragment } from 'storefrontapi.generated';

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
export function FeaturedCollectionSection(
  { collection }: { collection: FeaturedCollectionFragment }
) {
  if (!collection) return null;
  const image = collection?.image;

  return (
    <section className="bg-brand-bg text-brand-text">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 lg:py-20">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-accent/70">
            Our trending products
          </p>
          <h2 className="text-h2 font-semibold">{collection.title}</h2>
        </div>
        <Link
          className="featured-collection"
          to={`/collections/${collection.handle}`}
        >
          {image && (
            <div className="featured-collection-image">
              <Image data={image} sizes="100vw" />
            </div>
          )}
        </Link>
      </div>
    </section>
  );
}

/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
