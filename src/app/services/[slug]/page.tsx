import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { site, ServiceItem } from "@/content/site";
import { Nav } from "@/components/hero/Nav";
import { Footer } from "@/components/sections/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return site.services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found — KeySpex" };

  return {
    title: `${service.title} — KeySpex`,
    description: service.blurb,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const serviceIndex = site.services.findIndex((s) => s.slug === slug);

  if (serviceIndex === -1) {
    notFound();
  }

  const service = site.services[serviceIndex];
  const prevService = serviceIndex > 0 ? site.services[serviceIndex - 1] : null;
  const nextService = serviceIndex < site.services.length - 1 ? site.services[serviceIndex + 1] : null;

  const category = site.categories.find((c) => c.id === service.cat);

  return (
    <div className="min-h-screen bg-white text-[var(--ink)] antialiased selection:bg-[var(--brand)] selection:text-white">
      <Nav />

      <main className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
        {/* Breadcrumb back link */}
        <div className="mb-12">
          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--brand)]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            <span>All Services</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="border-b pb-14" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-4 mb-4">
            <span
              className="font-mono text-sm font-bold text-[var(--brand)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {service.n}
            </span>
            <span className="text-[var(--line)]">/</span>
            <span
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Category {service.cat} · {category?.name}
            </span>
          </div>

          <h1
            className="font-extrabold uppercase tracking-tight leading-[0.95] text-[var(--ink)] max-w-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
            }}
          >
            {service.title}
          </h1>

          {/* "For:" audience target callout */}
          <div className="mt-8 inline-flex items-baseline gap-3 rounded-[var(--radius)] border px-4 py-2 bg-[var(--tint)]" style={{ borderColor: "var(--line)" }}>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              For:
            </span>
            <span className="text-sm font-medium text-[var(--ink)]">
              {service.forWho}
            </span>
          </div>
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid gap-16 py-16 lg:grid-cols-[1.8fr_1fr] lg:items-start">
          <div className="space-y-12">
            {/* Overview Blurb */}
            <div>
              <h2
                className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Overview
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--ink)] font-normal">
                {service.blurb}
              </p>
            </div>

            {/* Offline Store Special Callout */}
            {service.slug === "store-management-system" && (
              <div className="border-l-4 p-6 bg-[var(--tint)] rounded-r-[var(--radius)]" style={{ borderColor: "var(--brand)" }}>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--brand)] font-bold mb-2">
                  Operating Model
                </p>
                <p className="text-sm leading-relaxed text-[var(--ink)] font-medium">
                  {service.note}. {service.subnote}
                </p>
              </div>
            )}

            {/* Campaign Flow Strip */}
            {service.flow && (
              <div>
                <h3
                  className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Campaign Process Flow
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {service.flow.map((step, idx) => (
                    <div
                      key={step}
                      className="border p-4 bg-white rounded-[var(--radius)]"
                      style={{ borderColor: "var(--line)" }}
                    >
                      <span className="block font-mono text-xs text-[var(--brand)] font-bold mb-1">
                        0{idx + 1}
                      </span>
                      <span className="font-extrabold text-base tracking-tight text-[var(--ink)]" style={{ fontFamily: "var(--font-display)" }}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Deliverables & Scope Points */}
            <div>
              <h3
                className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Scope & Key Deliverables
              </h3>
              <ul className="divide-y divide-[var(--line)] border-t border-b" style={{ borderColor: "var(--line)" }}>
                {service.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-4 py-5">
                    <span className="font-mono text-xs text-[var(--brand)] font-bold pt-1">
                      0{i + 1}
                    </span>
                    <span className="text-base font-medium text-[var(--ink)]">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefit Highlight */}
            <div className="border p-8 rounded-[var(--radius)] bg-white" style={{ borderColor: "var(--line)" }}>
              <span className="block font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-2">
                Primary Business Benefit
              </span>
              <p
                className="text-2xl md:text-3xl font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--brand)" }}
              >
                {service.benefit}
              </p>
            </div>
          </div>

          {/* Sticky Side Card CTA */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-[var(--radius)] border p-8 bg-[var(--tint)]" style={{ borderColor: "var(--line)" }}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] mb-3">
                Get Started
              </p>
              <h3
                className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--ink)] mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.cta}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] mb-8">
                Consultations are completely free. We scope features, deliverables and cost based precisely on your operational reality.
              </p>
              <Link
                href="/#contact"
                className="flex h-12 w-full items-center justify-center rounded-[var(--radius)] text-sm font-semibold text-white transition-all hover:opacity-95"
                style={{ background: "var(--brand)" }}
              >
                Discuss this service →
              </Link>
            </div>
          </div>
        </div>

        {/* Next / Previous Service Pagination */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t pt-8 gap-4" style={{ borderColor: "var(--line)" }}>
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="group flex flex-col text-left transition-colors hover:text-[var(--brand)]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                ← Previous Service
              </span>
              <span className="text-base font-bold text-[var(--ink)] group-hover:text-[var(--brand)]" style={{ fontFamily: "var(--font-display)" }}>
                {prevService.n} · {prevService.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="group flex flex-col text-right transition-colors hover:text-[var(--brand)]"
            >
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Next Service →
              </span>
              <span className="text-base font-bold text-[var(--ink)] group-hover:text-[var(--brand)]" style={{ fontFamily: "var(--font-display)" }}>
                {nextService.n} · {nextService.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
