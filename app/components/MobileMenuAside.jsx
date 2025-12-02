import {Link} from 'react-router';
import {Aside} from '~/components/Aside';
import {HeaderMenu} from '~/components/Header';

export function MobileMenuAside({header, publicStoreDomain}) {
  if (!header?.menu || !header?.shop?.primaryDomain?.url) return null;

  return (
    <Aside type="mobile" heading="Menu">
      <div className="flex flex-col gap-6 text-lg">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <Link
          to="/account"
          className="text-brand-primary underline-offset-4 hover:text-brand-accent"
        >
          Account
        </Link>
        <Link
          to="/cart"
          className="text-brand-primary underline-offset-4 hover:text-brand-accent"
        >
          Cart
        </Link>
      </div>
    </Aside>
  );
}
