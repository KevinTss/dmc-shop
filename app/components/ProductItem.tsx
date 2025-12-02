import { Link } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';

type ProductItemProps = {
  product:
  | import('storefrontapi.generated').CollectionItemFragment
  | import('storefrontapi.generated').ProductItemFragment
  | import('storefrontapi.generated').RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
};

export function ProductItem({ product, loading }: ProductItemProps) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const category =
    'productType' in product && product.productType
      ? product.productType
      : 'Product';

  return (
    <article className="w-full">
      <Link
        className="group flex w-full flex-col text-brand-text no-underline"
        key={product.id}
        prefetch="intent"
        to={variantUrl}
      >
        <div className="relative flex h-80 items-center justify-center overflow-hidden rounded-lg">
          {image ? (
            <Image
              alt={image.altText || product.title}
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 320px, 100vw"
              className="h-full w-full object-contain transition duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center text-4xl text-brand-primary/40">
              <span aria-hidden>📷</span>
              <span className="sr-only">No product image available</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 px-4 py-5">
          <p className="text-lg font-semibold leading-tight line-clamp-2">
            {product.title}
          </p>
          <div className="flex items-center justify-between text-sm text-brand-text/80">
            <Money data={product.priceRange.minVariantPrice} />
            <span className="rounded-full bg-brand-accent/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-accent/80">
              {category}
            </span>
          </div>
          <div className="pt-2">
            <span className="inline-flex w-full items-center justify-center rounded-md bg-brand-primary px-3 py-2 text-sm font-semibold text-white shadow-subtle transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
              Add to cart
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
