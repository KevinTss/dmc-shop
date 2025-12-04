import {CartForm} from '@shopify/hydrogen';
import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';

type QuantityAdjusterProps = {
  lineId: string;
  quantity: number;
  isOptimistic?: boolean;
  className?: string;
};

export function QuantityAdjuster({
  lineId,
  quantity,
  isOptimistic,
  className = '',
}: QuantityAdjusterProps) {
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));
  const willRemove = quantity <= 1;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-brand-accent/15 bg-brand-bg px-3 py-1 text-sm ${className}`}
    >
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={!!isOptimistic}
          name="decrease-quantity"
          value={prevQuantity}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-center text-base font-semibold text-brand-text shadow-subtle/40 transition hover:-translate-y-[1px]"
          type="submit"
        >
          {willRemove ? <TrashIcon /> : <span>−</span>}
        </button>
      </CartLineUpdateButton>
      <span className="w-6 text-center font-semibold">{quantity}</span>
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
          disabled={!!isOptimistic}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-center text-base font-semibold text-brand-text shadow-subtle/40 transition hover:-translate-y-[1px]"
          type="submit"
        >
          <span>+</span>
        </button>
      </CartLineUpdateButton>
    </div>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

export function TrashIcon() {
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
