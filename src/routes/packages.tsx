import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, packages } from "@/components/site/site-data";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — UM Tech CG" },
      { name: "description", content: "Tailored technology packages for startups, growing SMEs, enterprises, technical assessments and project management." },
      { property: "og:title", content: "Packages — UM Tech CG" },
      { property: "og:description", content: "Strategic technology partnership — not commodity services. Tailored to your goals." },
    ],
  }),
  component: PackagesPage,
});

function PackagesPage() {
  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="packages" className="bg-secondary/30">
        <SectionHeading
          eyebrow="Packages & Services"
          title="Strategic technology partnership — not commodity services."
          subtitle="Every business is unique. We tailor our solutions based on your goals, technology environment and project requirements."
        />

        <div className="mb-12 glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-brand)" }} />
          <div className="relative flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-widest text-accent">Our Approach</div>
              <p className="mt-3 text-lg md:text-xl leading-relaxed">
                Every business is unique. We tailor our solutions based on your goals, technology environment, and project requirements. <span className="text-foreground/90">Contact us for a customised proposal and consultation.</span>
              </p>
            </div>
            <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.02] transition">
              Request a Proposal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p) => (
            <div key={p.name} className={`group relative rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-glow ${p.highlighted ? "bg-gradient-brand text-white shadow-glow" : "glass-card"}`}>
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background border border-border text-xs uppercase tracking-widest text-accent">
                  Most popular
                </div>
              )}
              <div className={`w-12 h-12 rounded-xl grid place-items-center ${p.highlighted ? "bg-white/15 text-white" : "bg-gradient-brand text-white shadow-glow"}`}>
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className={`mt-5 text-xl font-semibold ${p.highlighted ? "text-white" : ""}`}>{p.name}</h3>
              <p className={`mt-2 text-sm ${p.highlighted ? "text-white/85" : "text-muted-foreground"}`}>{p.idealFor}</p>

              <div className={`mt-6 text-xs uppercase tracking-widest ${p.highlighted ? "text-white/70" : "text-accent"}`}>Includes</div>
              <ul className="mt-3 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${p.highlighted ? "text-white" : "text-accent"}`} />
                    <span className={p.highlighted ? "text-white/95" : ""}>{f}</span>
                  </li>
                ))}
              </ul>

              <div className={`mt-6 text-xs uppercase tracking-widest ${p.highlighted ? "text-white/70" : "text-accent"}`}>
                {p.bestForLabel ?? "Best For"}
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {p.bestFor.map((b) => (
                  <li key={b} className={`flex items-start gap-2 ${p.highlighted ? "text-white/90" : "text-muted-foreground"}`}>
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${p.highlighted ? "bg-white/80" : "bg-accent"}`} />
                    {b}
                  </li>
                ))}
              </ul>

              <div className={`mt-6 pt-5 border-t ${p.highlighted ? "border-white/20" : "border-border"}`}>
                <div className={`text-xs uppercase tracking-widest ${p.highlighted ? "text-white/70" : "text-muted-foreground"}`}>Pricing</div>
                <div className={`mt-1 text-sm font-medium ${p.highlighted ? "text-white" : ""}`}>{p.pricing}</div>
              </div>

              <Link to="/contact" className={`mt-6 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full font-medium transition ${p.highlighted ? "bg-background text-foreground hover:opacity-90" : "bg-gradient-brand text-white shadow-glow hover:scale-[1.01]"}`}>
                {p.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}