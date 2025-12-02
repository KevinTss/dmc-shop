import {Link} from 'react-router';

export function HomeHero() {
  return (
    <section className="relative overflow-hidden text-brand-bg">
      <div className="absolute inset-0">
        <img
          src="/background-advertisement.png"
          alt="Exclusive spirits background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-brand-accent/40 via-brand-accent/65 to-brand-primary/70" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:py-24 lg:py-28">
        <p className="uppercase tracking-[0.2em] text-sm text-brand-bg/80">
          Brussels Spirits House
        </p>
        <h1 className="text-h1 font-semibold leading-none text-brand-bg md:text-[72px] md:leading-tight lg:text-h1">
          Rare spirits. Modern tableside.
        </h1>
        <p className="max-w-2xl text-body text-brand-bg/85">
          Discover curated bottles and intimate tastings for young professionals
          seeking singular, exclusive pours in the heart of Brussels.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/collections"
            className="btn-primary bg-brand-bg text-brand-accent hover:bg-brand-bg/90"
          >
            Explore the cellar
          </Link>
        </div>
      </div>
    </section>
  );
}
