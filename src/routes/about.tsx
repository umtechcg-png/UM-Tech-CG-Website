import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading } from "@/components/site/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — UM Tech CG" },
      { name: "description", content: "Ubuntu Mzansi Tech Consulting Group — a South African technology consulting group blending Ubuntu with enterprise-grade engineering." },
      { property: "og:title", content: "About — UM Tech CG" },
      { property: "og:description", content: "Mission, vision, values and the team behind Ubuntu Mzansi Tech Consulting Group." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="about">
        <div className="max-w-4xl">
            <SectionHeading
              eyebrow="About Us"
              title="Rooted in Mzansi. Built for the world."
              subtitle="We are a South African technology consulting group blending Ubuntu — humanity, community and shared progress — with enterprise-grade engineering. We help African organisations compete globally through practical, scalable technology."
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Mission", "Empower African businesses through innovative technology and strategic consulting."],
                ["Vision", "Become one of Africa's leading tech consulting firms unlocking growth through technology."],
                ["Values", "Ubuntu, Innovation, Integrity, Excellence, Collaboration, Impact."],
                ["Focus", "Practical solutions that move metrics — not slideware."],
              ].map(([t, d]) => (
                <div key={t} className="glass-card rounded-2xl p-5">
                  <div className="text-xs uppercase tracking-widest text-accent">{t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
        </div>
      </Section>
    </SiteLayout>
  );
}