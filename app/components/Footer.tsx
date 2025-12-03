import {Link} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

type FooterProps = {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
};

export function Footer({footer: _footerPromise, header}: FooterProps) {
  // NOTE: The footer menu query is temporarily disabled in favor of static content.
  // When ready to re-enable, restore the Suspense + Await block that consumes `footer`.

  const logoUrl = header.shop.brand?.logo?.image?.url;

  return (
    <footer className="bg-brand-primary text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-start">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={header.shop.name}
              className="h-14 w-auto"
              loading="lazy"
            />
          ) : (
            <span className="text-xl font-semibold">{header.shop.name}</span>
          )}
        </div>

        <FooterColumn
          title="Address"
          lines={['Rue Vanderkindere 446', '1180 Uccle', 'Belgium']}
        />
        <FooterColumn
          title="Opening hours"
          lines={['Monday - Friday: 9:00 - 19:00', 'Saturday: Booking only', 'Sunday: Closed']}
        />
        <FooterColumn
          title="Online shop"
          links={[
            {label: 'Home', to: '/'},
            {label: 'Shop', to: '/collections/all'},
            {label: 'Contact', to: '/contact'},
          ]}
        />
      </div>
    </footer>
  );
}

type FooterColumnProps =
  | {title: string; lines: string[]; links?: never}
  | {
      title: string;
      lines?: never;
      links: {label: string; to: string}[];
    };

function FooterColumn({title, lines, links}: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
        {title}
      </h3>
      {lines ? (
        <div className="space-y-1 text-white/90 text-sm">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      {links ? (
        <div className="space-y-2 text-sm">
          {links.map((link) => (
            <Link
              key={link.to}
              prefetch="intent"
              to={link.to}
              className="text-white transition hover:text-white/80"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
