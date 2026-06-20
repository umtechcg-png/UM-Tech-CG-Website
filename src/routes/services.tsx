import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, services } from "@/components/site/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — UM Tech CG" },
      { name: "description", content: "End-to-end technology services: consulting, web, mobile, custom software, automation, UX and cloud." },
      { property: "og:title", content: "Services — UM Tech CG" },
      { property: "og:description", content: "End-to-end capability across strategy, design, engineering and operations." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="services" className="bg-secondary/30">
        <SectionHeading eyebrow="Services" title="Everything you need to ship modern technology." subtitle="End-to-end capability across strategy, design, engineering and operations." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group glass-card rounded-2xl p-7 hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-glow">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}