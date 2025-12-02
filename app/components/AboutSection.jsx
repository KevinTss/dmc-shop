export function AboutSection() {
  return (
    <section className="bg-brand-bg text-brand-text">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-20">
        <div className="space-y-4 lg:space-y-6">
          {/* <p className="text-sm uppercase tracking-[0.2em] text-brand-accent/70">
            About us
          </p> */}
          <h2 className="text-h2 font-semibold text-brand-text">About us</h2>
          <p className="text-body leading-7 text-brand-text/85">
            Step into the world of refined indulgence with Table, an exquisite
            destination for discerning connoisseurs. Elevate your aperitif
            experience with our meticulously sourced ingredients, carefully
            selected to tantalize your senses. From opulent wines to artisanal
            beers, every offering at Table exudes unparalleled quality and
            craftsmanship. Indulge in the finest olives and cachuete
            meticulously chosen to complement your drink of choice. Embrace a
            life of refined taste and sophistication with Table, where quality
            meets simplicity in every delightful sip and bite.
          </p>
        </div>
        <div className="relative h-full w-full">
          <div className="card overflow-hidden">
            <img
              src="/background-advertisement.png"
              alt="Refined aperitif at Table"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
