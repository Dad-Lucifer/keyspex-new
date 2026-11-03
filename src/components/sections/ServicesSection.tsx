import Link from "next/link";
import { site, ServiceItem } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

export function ServicesSection() {
  const catA = site.services.filter((s) => s.cat === "A");
  const catB = site.services.filter((s) => s.cat === "B");
  const catC = site.services.filter((s) => s.cat === "C");

  const ServiceRow = ({ s }: { s: ServiceItem }) => (
    <li className="group border-b border-[#e0dbd3] transition-colors">
      <Link
        href={`/services/${s.slug}`}
        className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-7 px-3 md:px-6 transition-all duration-200 md:grid-cols-[4.5rem_1fr_1.4fr_auto] md:py-9 rounded-none group-hover:bg-[#1a1a1f] group-hover:text-[#f5f2ed]"
      >
        {/* Service Index */}
        <span
          className="font-mono text-xs font-semibold text-[var(--brand)] transition-colors group-hover:text-[var(--brand-bright)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {s.n}
        </span>

        {/* Title + Tag */}
        <div>
          <h3
            className="font-headline font-bold tracking-tight text-2xl md:text-3xl lg:text-4xl transition-colors inline-block"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            {s.title}
          </h3>
          {s.note && (
            <span
              className="ml-3 inline-block rounded-none border border-[#e0dbd3] px-2.5 py-0.5 text-xs font-medium align-middle text-[#5a5a65] group-hover:border-white/20 group-hover:text-white/80"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Internal shop tool
            </span>
          )}
        </div>

        {/* For who summary */}
        <p className="hidden max-w-md text-sm leading-relaxed text-[#5a5a65] transition-colors group-hover:text-[#f5f2ed]/70 md:block">
          {s.forWho}
        </p>

        {/* Arrow icon with subtle slide */}
        <span className="text-2xl font-light transition-all duration-200 group-hover:translate-x-2 group-hover:text-[var(--brand-bright)]">
          →
        </span>
      </Link>
    </li>
  );

  const CategoryBlock = ({
    cat,
    services,
    idx,
  }: {
    cat: (typeof site.categories)[0];
    services: ServiceItem[];
    idx: number;
  }) => (
    <Reveal delay={idx * 0.1}>
      <div className="border-t border-[#e0dbd3] pt-12 mb-16">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
          <span
            className="font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {cat.id} ·
          </span>
          <div>
            <h3
              className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a1f]"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {cat.name}
            </h3>
            <p className="mt-1 text-sm text-[#5a5a65]">
              {cat.line}
            </p>
          </div>
        </div>
        <ul className="divide-y divide-[#e0dbd3]">
          {services.map((s) => (
            <ServiceRow key={s.slug} s={s} />
          ))}
        </ul>
      </div>
    </Reveal>
  );

  return (
    <section id="services" className="py-24 md:py-36 bg-[#f5f2ed]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <Reveal>
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5a5a65]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                02 · Services & Solutions
              </p>
              <h2
                className="font-headline font-bold tracking-tight leading-[0.95] text-[#1a1a1f]"
                style={{
                  fontFamily: "var(--font-headline)",
                  fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
                }}
              >
                What we build and manage.
              </h2>
            </div>
            <p className="max-w-md text-base text-[#5a5a65] leading-relaxed">
              Every service is delivered directly to your agreed project scope. Hover over any solution to explore details.
            </p>
          </div>
        </Reveal>

        <CategoryBlock cat={site.categories[0]} services={catA} idx={0} />
        <CategoryBlock cat={site.categories[1]} services={catB} idx={1} />
        <CategoryBlock cat={site.categories[2]} services={catC} idx={2} />
      </div>
    </section>
  );
}
