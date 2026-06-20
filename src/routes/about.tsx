import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Mail, MessageCircle } from "lucide-react";
import founderAsset from "@/assets/rezaan-achmat.jpg.asset.json";
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
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
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

          <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40" style={{ background: "var(--gradient-brand)" }} />
            <div className="relative flex flex-col sm:flex-row gap-6 items-start">
              <img src={founderAsset.url} alt="Rezaan Achmat, Founder" loading="lazy" width={160} height={160} className="w-32 h-32 rounded-2xl object-cover ring-2 ring-white/10" />
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">Founder Spotlight</div>
                <h3 className="mt-1 text-2xl font-bold">Rezaan Achmat</h3>
                <p className="text-sm text-muted-foreground">Founder & Technology Consultant</p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Rezaan founded UM Tech CG to bridge the gap between local African businesses and modern technology. With over a decade across software, cloud and digital strategy, he leads engagements that turn ambitious ideas into shipped, scalable products.
                </p>
                <div className="mt-5 flex gap-3">
                  <a href="#" aria-label="LinkedIn" className="p-2 rounded-full glass-card hover:bg-white/10"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" aria-label="Email" className="p-2 rounded-full glass-card hover:bg-white/10"><Mail className="w-4 h-4" /></a>
                  <a href="#" aria-label="WhatsApp" className="p-2 rounded-full glass-card hover:bg-white/10"><MessageCircle className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}