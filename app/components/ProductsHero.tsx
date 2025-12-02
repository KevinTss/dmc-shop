type ProductsHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function ProductsHero({
  title,
  eyebrow = 'Catalog',
  description,
}: ProductsHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-bg text-brand-text">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-accent/5 to-transparent blur-3xl" />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16 lg:py-20">
        {eyebrow ? (
          <p className="text-sm uppercase tracking-[0.2em] text-brand-accent/70">
            {eyebrow}
          </p>
        ) : null}
        <h1>{title}</h1>
        {description ? (
          <p className="max-w-2xl text-brand-text/80">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
