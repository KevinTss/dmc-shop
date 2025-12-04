import { CartForm, Image } from '@shopify/hydrogen';
import { Link } from 'react-router';
import type { CartApiQueryFragment } from 'storefrontapi.generated';
import type { OptimisticCartLine } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { ProductPrice } from './ProductPrice';
import { useAside } from './Aside';
import type { CartLayout } from './CartMain';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity.
 */
export function CartLineItem({ layout, line }: { layout: CartLayout; line: CartLine }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside() as { close: () => void };

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
          <CartLineQuantity line={line} />
        </div>
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * Decrease removes when quantity would reach 0.
 */
function CartLineQuantity({ line }: { line: CartLine }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  const willRemove = quantity <= 1;

  return (
    <div className="cart-line-quantity inline-flex items-center gap-2 text-sm">
      <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
        <button
          aria-label="Decrease quantity"
          disabled={!!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-center text-base font-semibold text-brand-text shadow-subtle/40 transition hover:-translate-y-[1px]"
        >
          {willRemove ? <TrashIcon /> : <span>−</span>}
        </button>
      </CartLineUpdateButton>
      <span className="w-6 text-center font-semibold">{quantity}</span>
      <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          className="h-7 w-7 rounded-full bg-white text-center text-base font-semibold text-brand-text shadow-subtle/40 transition hover:-translate-y-[1px]"
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton>
    </div>
  );
}

/**
 * A button that updates line quantities.
 */
function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: { id: string; quantity: number }[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other.
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 text-brand-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 6.5 18.2 19a2 2 0 0 1-2 1.8H7.8A2 2 0 0 1 5.8 19L5 6.5m3.5 0V5.4A1.4 1.4 0 0 1 9.9 4h4.2a1.4 1.4 0 0 1 1.4 1.4v1.1M4 6.5h16m-10 3v7m4-7v7"
      />
    </svg>
  );
}
