import {Suspense} from 'react';
import {Await} from 'react-router';
import {Aside} from '~/components/Aside';
import {CartMain} from '~/components/CartMain';

export function CartAside({cart}) {
  return (
    <Aside type="cart" heading="Cart">
      <div className="flex h-full flex-col">
        <Suspense fallback={<p className="p-4">Loading cart ...</p>}>
          <Await resolve={cart}>
            {(resolvedCart) => <CartMain cart={resolvedCart} layout="aside" />}
          </Await>
        </Suspense>
      </div>
    </Aside>
  );
}

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
