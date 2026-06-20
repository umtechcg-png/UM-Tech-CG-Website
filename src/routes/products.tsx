import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Cpu } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, productGroups, statusStyles } from "@/components/site/site-data";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — UM Tech CG" },
      { name: "description", content: "Explore the Ubuntu Mzansi Tech ecosystem — TrackSuite, ServiceLayer, DevFlow and BizActivate." },
      { property: "og:title", content: "Products — UM Tech CG" },
      { property: "og:description", content: "Live, in-development and concept platforms engineered to solve real African business problems." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="products">
        <SectionHeading
          eyebrow="Products & Innovations"
          title="The Ubuntu Mzansi Tech Ecosystem."
          subtitle="Live, in-development and concept platforms — each engineered to solve real African business problems."
        />
        <div className="space-y-16">
          {productGroups.map((group) => {
            const s = statusStyles[group.status];
            return (
              <div key={group.groupTitle}>
                <div className="flex items-center gap-3 mb-6">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${s.badge}`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${s.dot}`} />
                    {group.statusLabel}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-[Space_Grotesk]">{group.groupTitle}</h3>
                </div>
                <div className={`grid gap-6 ${group.items.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}>
                  {group.items.map((p) => (
                    <article key={p.name} className="group relative overflow-hidden rounded-3xl glass-card p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
                      <div className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${s.ring} transition-opacity duration-500 group-hover:opacity-70`} />
                      <div className="relative flex flex-col gap-6">
                        <div className="flex items-start gap-5">
                          <div className="relative shrink-0">
                            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 bg-gradient-to-br ${s.ring}`} />
                            <img src={p.logo} alt={`${p.name} logo`} loading="lazy" className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs uppercase tracking-widest text-accent">{p.tagline}</div>
                            <h4 className="mt-1 text-2xl md:text-[26px] font-bold leading-tight">{p.name}</h4>
                            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5 pt-2">
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">{p.sectionA.title}</div>
                            <ul className="space-y-2">
                              {p.sectionA.items.map((it) => (
                                <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" /> {it}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-3">{p.sectionB.title}</div>
                            {p.sectionB.title === "Technology Stack" ? (
                              <div className="flex flex-wrap gap-2">
                                {p.sectionB.items.map((it) => (
                                  <span key={it} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-foreground/90">{it}</span>
                                ))}
                              </div>
                            ) : (
                              <ul className="space-y-2">
                                {p.sectionB.items.map((it) => (
                                  <li key={it} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <Check className="w-4 h-4 mt-0.5 text-accent shrink-0" /> {it}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        {p.link && (
                          <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition self-start">
                            {p.link.label} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="glass-card rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="w-5 h-5 text-accent" />
              <h3 className="text-xl md:text-2xl font-bold font-[Space_Grotesk]">Ecosystem Architecture</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              UM Tech ServiceLayer acts as the central intelligence and business logic layer powering every product across the ecosystem.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="px-5 py-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/5 border border-amber-400/30 text-sm font-semibold">
                UM Tech ServiceLayer <span className="text-muted-foreground font-normal">(Core)</span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="grid sm:grid-cols-3 gap-3 w-full max-w-3xl">
                {[
                  { name: "TrackSuite", note: "Asset Monitoring", color: "from-emerald-400/20 to-emerald-600/5 border-emerald-400/30" },
                  { name: "DevFlow", note: "Project Execution", color: "from-violet-400/20 to-violet-600/5 border-violet-400/30" },
                  { name: "BizActivate", note: "Business Growth", color: "from-sky-400/20 to-sky-600/5 border-sky-400/30" },
                ].map((n) => (
                  <div key={n.name} className={`text-center px-4 py-3 rounded-xl bg-gradient-to-br border ${n.color}`}>
                    <div className="text-sm font-semibold">{n.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}