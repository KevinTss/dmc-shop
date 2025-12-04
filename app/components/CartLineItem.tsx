import {Image} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import type {CartLayout} from './CartMain';
import {QuantityAdjuster} from './QuantityAdjuster';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity.
 */
export function CartLineItem({layout, line}: {layout: CartLayout; line: CartLine}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside() as {close: () => void};

  return (
    <li
      key={id}
      className="cart-line flex items-start gap-4 border-b border-brand-accent/10 pb-4 last:border-none"
    >
      {image && (
        <div className="flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            alt={title}
            aspectRatio="4/5"
            data={image}
            height={110}
            loading="lazy"
            width={90}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="">
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  close();
                }
              }}
              className="text-sm font-semibold text-brand-text"
            >
              {product.title}
            </Link>
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>
        </div>

        <div className="mt-3">
          <QuantityAdjuster
            lineId={line.id}
            quantity={line.quantity ?? 0}
            isOptimistic={line.isOptimistic}
          />
        </div>
      </div>
    </li>
  );
}
