import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import {
  Section, SectionHeading, processSteps, stats, StatCounter, useInView,
} from "@/components/site/site-data";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Our Process — UM Tech CG" },
      { name: "description", content: "A clear, proven path from idea to impact: Discovery, Strategy, Design, Development, Support & Growth." },
      { property: "og:title", content: "Our Process — UM Tech CG" },
      { property: "og:description", content: "Discovery, Strategy, Design, Development, Support & Growth — how we deliver." },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const statRef = useInView<HTMLDivElement>();
  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="process">
        <SectionHeading eyebrow="Our Process" title="A clear, proven path from idea to impact." />
        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-brand opacity-40" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((p, i) => (
              <div key={p.title} className="relative glass-card rounded-2xl p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-glow relative z-10">
                  <p.icon className="w-6 h-6" />
                </div>
                <div className="mt-4 text-xs uppercase tracking-widest text-accent">Step {i + 1}</div>
                <h3 className="mt-1 font-semibold text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section ref={statRef.ref} className="relative py-24 px-6 border-y border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} visible={statRef.inView} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}