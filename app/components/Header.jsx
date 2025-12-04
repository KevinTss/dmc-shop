import {Suspense, useEffect, useMemo, useState} from 'react';
import {Await, NavLink, useAsyncValue, useLocation} from 'react-router';
import {useAnalytics, useOptimisticCart} from '@shopify/hydrogen';
import {useAside} from '~/components/Aside';

/**
 * @param {HeaderProps}
 */
export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  const [isOverlay, setIsOverlay] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const hero =
      document.getElementById('hero') || document.getElementById('hero');
    if (!hero) {
      setIsOverlay(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverlay(entry.isIntersecting);
      },
      {threshold: 0.2},
    );
    observer.observe(hero);
    // Set initial state in case the observer callback hasn't fired yet
    setIsOverlay(hero.getBoundingClientRect().top < window.innerHeight * 0.8);
    return () => observer.disconnect();
  }, [location.pathname]);

  const variant = useMemo(() => (isOverlay ? 'overlay' : 'solid'), [isOverlay]);

  const baseClasses =
    'fixed inset-x-0 top-0 z-30 flex h-[85px] justify-between items-center border-b transition-colors duration-200 px-4 sm:px-6 lg:px-12';
  const variantClasses =
    variant === 'overlay'
      ? 'bg-transparent text-white border-white/20'
      : 'bg-brand-bg text-brand-text border-brand-primary/20';

  return (
    <header className={`${baseClasses} ${variantClasses}`}>
      <div className="flex items-center">
        <NavLink
          prefetch="intent"
          to="/"
          style={activeLinkStyle}
          end
          className="flex items-center gap-3"
        >
          <img
            src="/logo.svg"
            alt={shop.name}
            className={`h-10 w-auto drop-shadow ${
              variant === 'overlay' ? 'brightness-0 invert' : ''
            }`}
          />
          <span className="sr-only">{shop.name}</span>
        </NavLink>
      </div>

      <div className="hidden items-center justify-center gap-12 lg:flex">
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
          isOverlay={variant === 'overlay'}
        />
      </div>

      <HeaderCtas
        isLoggedIn={isLoggedIn}
        cart={cart}
        isOverlay={variant === 'overlay'}
      />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
  isOverlay = false,
}) {
  const className =
    viewport === 'desktop'
      ? `flex items-center gap-4 text-sm font-medium uppercase tracking-[0.14em] ${
          isOverlay ? 'text-white' : 'text-brand-text'
        }`
      : 'flex flex-col gap-6 text-brand-text';
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item transition duration-200 hover:text-brand-primary hover:bg-brand-primary/10 px-5 py-2 rounded-full"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({cart, isOverlay}) {
  return (
    <nav className="flex items-center justify-end gap-4" role="navigation">
      <div className="flex items-center lg:hidden">
        <HeaderMenuMobileToggle />
      </div>
      {/* <NavLink
        prefetch="intent"
        to="/account"
        style={activeLinkStyle}
        className="hidden text-sm font-semibold uppercase tracking-[0.14em] lg:inline-flex"
      >
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
            {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
          </Await>
        </Suspense>
      </NavLink> */}
      {/* <SearchToggle isOverlay={isOverlay} /> */}
      <CartToggle cart={cart} isOverlay={isOverlay} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset text-current"
      onClick={() => open('mobile')}
    >
      <h3>☰</h3>
    </button>
  );
}

// function SearchToggle() {
//   const {open} = useAside();
//   return (
//     <button
//       className="hidden h-[51px] w-[200px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 text-sm text-white backdrop-blur md:flex"
//       onClick={() => open('search')}
//     >
//       <span role="img" aria-hidden>
//         🔍
//       </span>
//       <span className="text-white/90">Search</span>
//     </button>
//   );
// }

/**
 * @param {{count: number | null}}
 */
function CartBadge({count, isOverlay}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-md transition hover:bg-white/10"
      aria-label="Cart"
    >
      <span className="text-2xl grayscale">{isOverlay ? '🛒' : '🛍️'}</span>
      <Badge count={count} />
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({cart, isOverlay}) {
  return (
    <Suspense fallback={<CartBadge count={null} isOverlay={isOverlay} />}>
      <Await resolve={cart}>
        <CartBanner isOverlay={isOverlay} />
      </Await>
    </Suspense>
  );
}

function CartBanner({isOverlay}) {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} isOverlay={isOverlay} />;
}

function Badge({count}) {
  if (count === null) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
      {count}
    </span>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({isActive, isPending}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'inherit',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
