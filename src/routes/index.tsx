import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Sparkles, MessageCircle, Check, Quote,
  CalendarCheck, FileText,
} from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import heroBg from "@/assets/hero-bg.jpg";
import { SiteLayout } from "@/components/site/site-layout";
import {
  Section, SectionHeading, whyUs, testimonials, specialistAreas,
} from "@/components/site/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UM Tech CG — Technology Solutions Designed for Growth" },
      { name: "description", content: "Ubuntu Mzansi Tech Consulting Group helps South African startups, SMEs and enterprises accelerate digital transformation through software, automation and consulting." },
      { property: "og:title", content: "UM Tech CG — Technology Solutions Designed for Growth" },
      { property: "og:description", content: "South African technology consulting, custom software, mobile apps, cloud and automation — designed for growth." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [testimonial, setTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTestimonial((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs uppercase tracking-widest text-accent">
              <Sparkles className="w-3.5 h-3.5" /> Technology. People. Impact.
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05]">
              Technology Solutions <br />
              <span className="text-gradient">Designed for Growth.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
              Ubuntu Mzansi Tech Consulting Group helps startups, SMEs and enterprises accelerate digital transformation through innovative software, automation, consulting and cloud solutions.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span>● Strategy</span><span>● Technology</span><span>● Solutions</span><span>● Impact</span>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center animate-float">
            <div className="relative">
              <div className="absolute -inset-10 rounded-full blur-3xl opacity-50" style={{ background: "var(--gradient-brand)" }} />
              <img src={logoAsset.url} alt="Ubuntu Mzansi Tech Consulting Group logo" className="relative w-[360px] md:w-[440px] rounded-3xl shadow-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <Section id="why" className="bg-secondary/30">
        <SectionHeading eyebrow="Why Choose Us" title="A partner, not just a vendor." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyUs.map((w) => (
            <div key={w.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition">
              <w.icon className="w-7 h-7 text-accent" />
              <h3 className="mt-4 font-semibold text-lg">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials">
        <SectionHeading eyebrow="Testimonials" title="Trusted by ambitious teams." />
        <div className="relative glass-card rounded-3xl p-10 md:p-14 max-w-4xl mx-auto overflow-hidden">
          <Quote className="absolute top-6 left-6 w-10 h-10 text-accent/40" />
          <div className="min-h-[140px]">
            <p key={testimonial} className="text-xl md:text-2xl leading-relaxed animate-fade-up">
              “{testimonials[testimonial].quote}”
            </p>
            <div className="mt-6">
              <div className="font-semibold">{testimonials[testimonial].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[testimonial].role}</div>
            </div>
          </div>
          <div className="mt-8 flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTestimonial(i)} aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === testimonial ? "w-8 bg-gradient-brand" : "w-4 bg-white/20"}`} />
            ))}
          </div>
        </div>
      </Section>

      {/* SPECIALIST AREAS */}
      <Section className="bg-secondary/30">
        <SectionHeading
          eyebrow="Specialist Service Areas"
          title="Deep expertise across the technology stack."
          subtitle="Beyond our core packages, we bring focused specialist capability to every engagement."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {specialistAreas.map((s) => (
            <div key={s.title} className="group glass-card rounded-2xl p-7 hover:-translate-y-1 hover:shadow-glow transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-brand grid place-items-center text-white shadow-glow">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
              </div>
              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {s.items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* LEAD WITH STRATEGY CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center glass-card">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs uppercase tracking-widest text-accent">
              <Sparkles className="w-3.5 h-3.5" /> Lead with strategy
            </div>
            <h2 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
              Let's Build the Right Technology <br /> <span className="text-gradient">Strategy for Your Business</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're launching a startup, modernising operations, managing a technology project, or exploring AI opportunities — Ubuntu Mzansi Tech Consulting Group can help.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.02] transition">
                <FileText className="w-4 h-4" /> Request a Proposal
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card font-medium hover:bg-white/5">
                <CalendarCheck className="w-4 h-4" /> Schedule a Consultation
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card font-medium hover:bg-white/5">
                <MessageCircle className="w-4 h-4" /> Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}