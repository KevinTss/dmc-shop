type ProductsHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  backgroundImage?: string;
};

export function ProductsHero({
  title,
  eyebrow = 'Catalog',
  description,
  backgroundImage,
}: ProductsHeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-brand-bg text-brand-text">
      {backgroundImage ? (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-accent/5 to-transparent blur-3xl" />
      )}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16 text-white lg:py-20">
        {eyebrow ? (
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-white">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-white/80">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
