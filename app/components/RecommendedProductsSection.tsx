import {Await} from 'react-router';
import {Suspense} from 'react';
import {ProductItem} from '~/components/ProductItem';

type RecommendedProductsProps = {
  products: Promise<import('storefrontapi.generated').RecommendedProductsQuery | null>;
};

export function RecommendedProductsSection({products}: RecommendedProductsProps) {
  return (
    <section className="bg-brand-bg text-brand-text">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 lg:py-20">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-accent/70">
            Recommended Products
          </p>
          <h2 className="text-h2 font-semibold text-brand-text">Handpicked for you</h2>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={products}>
            {(response) => (
              <div className="recommended-products-grid">
                {response
                  ? response.products.nodes.map((product) => (
                      <ProductItem key={product.id} product={product} />
                    ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}
