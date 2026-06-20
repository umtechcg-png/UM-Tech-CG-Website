import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, pricingTiers } from "@/components/site/site-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — UM Tech CG" },
      { name: "description", content: "Indicative pricing for Starter, Growth, Enterprise, Technical Assessment, Project Management and BizActivate packages." },
      { property: "og:title", content: "Pricing — UM Tech CG" },
      { property: "og:description", content: "Transparent starting points for every stage of growth — confirmed after an initial consultation." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="pricing">
        <SectionHeading
          eyebrow="Indicative Pricing"
          title="Transparent starting points for every stage of growth."
          subtitle="Choose a package aligned to your goals. Every engagement is scoped, quoted, and confirmed after an initial consultation."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingTiers.map((t) => (
            <div key={t.name} className="group relative glass-card rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow overflow-hidden">
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ background: "var(--gradient-brand)" }} />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-glow shrink-0">
                    <t.icon className="w-6 h-6" />
                  </div>
                  {t.badge && (
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-accent/40 text-accent">
                      {t.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{t.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.idealFor}</p>

                <div className="mt-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.priceLabel}</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-gradient">{t.price}</span>
                    {t.priceSuffix && (<span className="text-sm text-muted-foreground">{t.priceSuffix}</span>)}
                  </div>
                </div>

                <Link to="/contact" className="mt-7 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full font-medium bg-gradient-brand text-white shadow-glow hover:scale-[1.02] transition">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 mx-auto max-w-3xl text-center text-sm text-muted-foreground leading-relaxed glass-card rounded-2xl px-6 py-5">
          All pricing is indicative and may vary based on project scope, complexity, timelines, and client requirements. A detailed proposal will be provided following an initial consultation.
        </p>
      </Section>
    </SiteLayout>
  );
}