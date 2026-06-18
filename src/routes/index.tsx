import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Smartphone,
  Settings2,
  Workflow,
  Palette,
  Cloud,
  Sparkles,
  ShieldCheck,
  Users,
  TrendingUp,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Facebook,
  Check,
  Quote,
  Compass,
  Lightbulb,
  PenTool,
  Rocket,
  LifeBuoy,
  Menu,
  X,
} from "lucide-react";
import {
  Zap,
  BarChart3,
  Lock,
  Cpu,
  ClipboardList,
  Search,
  Building2,
  Handshake,
  Target,
  CalendarCheck,
  FileText,
} from "lucide-react";
import logoAsset from "@/assets/logo.asset.json";
import heroBg from "@/assets/hero-bg.jpg";
import founderImg from "@/assets/founder.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UM Tech CG — Technology Solutions Designed for Growth" },
      {
        name: "description",
        content:
          "Ubuntu Mzansi Tech Consulting Group helps South African startups, SMEs and enterprises accelerate digital transformation through software, automation and consulting.",
      },
      { property: "og:title", content: "UM Tech CG — Technology Solutions Designed for Growth" },
      {
        property: "og:description",
        content:
          "South African technology consulting, custom software, mobile apps, cloud and automation — designed for growth.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const services = [
  { icon: Briefcase, title: "Technology Consulting", desc: "Digital transformation strategy, IT assessments and technology roadmaps tailored to your business.", items: ["Transformation strategy", "IT assessments", "Technology roadmaps"] },
  { icon: Code2, title: "Web Development", desc: "Business websites, e-commerce platforms and corporate portals built for performance.", items: ["Business websites", "E-commerce", "Corporate portals"] },
  { icon: Smartphone, title: "Mobile App Development", desc: "Android, iOS and cross-platform apps designed for African and global users.", items: ["Android", "iOS", "Cross-platform"] },
  { icon: Settings2, title: "Custom Software", desc: "Business systems, internal platforms and process automation built around your team.", items: ["Business systems", "Internal platforms", "Process automation"] },
  { icon: Workflow, title: "Business Automation", desc: "Workflow automation, CRM integration and productivity tooling that scales.", items: ["Workflow automation", "CRM integration", "Productivity tooling"] },
  { icon: Palette, title: "UI / UX Design", desc: "User research, wireframes and modern interfaces customers love to use.", items: ["User research", "Wireframes", "Modern UX"] },
  { icon: Cloud, title: "Cloud Solutions", desc: "Cloud migration, infrastructure setup and managed services on AWS, Azure & GCP.", items: ["Cloud migration", "Infrastructure", "Managed services"] },
];

const products = [
  { name: "TrackSuite", tag: "Operations Platform", desc: "A project and operations management platform built to improve productivity, visibility and accountability across teams.", features: ["Project tracking", "Team workflows", "Real-time dashboards"] },
  { name: "Watt Wallet Buddy", tag: "Utility & Expense", desc: "A smart utility and expense management solution helping households and SMEs track and reduce running costs.", features: ["Utility tracking", "Budgeting tools", "Smart alerts"] },
];

const whyUs = [
  { icon: Sparkles, title: "Tailored Solutions, Not Templates", desc: "Every engagement is custom-built around your unique goals." },
  { icon: MapPin, title: "South African Business Expertise", desc: "Deep understanding of the local market, regulations and culture." },
  { icon: Rocket, title: "Practical Technology Implementation", desc: "We ship working systems — not slideware or theory." },
  { icon: Building2, title: "Enterprise-Level Thinking", desc: "Architecture and governance designed to scale safely." },
  { icon: MessageCircle, title: "Transparent Communication", desc: "Clear timelines, honest progress, no hidden surprises." },
  { icon: Handshake, title: "Long-Term Partnership Approach", desc: "We stay invested long after launch and delivery." },
  { icon: Target, title: "Focus on Business Outcomes", desc: "Technology that moves the metrics that matter to you." },
  { icon: TrendingUp, title: "Scalable Growth Strategies", desc: "From MVP to enterprise — built to grow with you." },
];

const processSteps = [
  { icon: Compass, title: "Discovery", desc: "We listen, audit and map your current landscape and goals." },
  { icon: Lightbulb, title: "Strategy", desc: "A clear roadmap, scoped milestones and measurable outcomes." },
  { icon: PenTool, title: "Design", desc: "UX, architecture and prototypes validated with your users." },
  { icon: Rocket, title: "Development", desc: "Agile delivery with weekly demos and continuous quality." },
  { icon: LifeBuoy, title: "Support & Growth", desc: "Ongoing optimisation, monitoring and scaling support." },
];

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "+", label: "Clients Supported" },
  { value: 35, suffix: "+", label: "Solutions Built" },
  { value: 12000, suffix: "+", label: "Consulting Hours" },
];

const testimonials = [
  { quote: "UM Tech CG transformed how we operate. Their team feels like an extension of ours.", name: "Future Client", role: "CEO, Retail Group" },
  { quote: "Pragmatic, fast, and deeply technical. The roadmap they delivered paid for itself.", name: "Future Client", role: "CTO, FinTech Startup" },
  { quote: "From discovery to launch, everything was transparent. Truly partner-grade work.", name: "Future Client", role: "Director, NGO" },
];

const packages = [
  {
    name: "Starter Package",
    icon: Rocket,
    idealFor: "Startups, entrepreneurs and small businesses beginning their digital journey.",
    features: [
      "Initial consultation and business needs assessment",
      "Basic website or digital presence setup",
      "Technology recommendations",
      "Basic IT support guidance",
      "Email and collaboration setup assistance",
      "Project planning and roadmap",
    ],
    bestFor: ["New businesses", "Small teams", "Manual-to-digital transitions"],
    pricing: "Custom quote based on requirements",
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth Package",
    icon: TrendingUp,
    idealFor: "Growing businesses looking to improve efficiency and scale operations.",
    features: [
      "Business and technology assessment",
      "Custom website or business application development",
      "IT support and systems optimisation",
      "Cybersecurity review and recommendations",
      "Data reporting and dashboard setup",
      "Project management and delivery oversight",
      "Ongoing consulting support",
    ],
    bestFor: ["Growing SMEs", "Organisations modernising operations", "Teams needing custom systems"],
    pricing: "Custom quote based on project scope",
    cta: "Book a Consultation",
    highlighted: true,
  },
  {
    name: "Enterprise Package",
    icon: Building2,
    idealFor: "Corporate organisations and large-scale projects.",
    features: [
      "Enterprise technology consulting",
      "Custom software and systems development",
      "Advanced cybersecurity assessments",
      "Data and AI strategy consulting",
      "Digital transformation planning",
      "Dedicated project management",
      "Integration with existing systems",
      "Long-term support and optimisation",
    ],
    bestFor: ["Corporates", "Multi-department organisations", "Large transformation initiatives"],
    pricing: "Tailored enterprise engagement",
    cta: "Speak to an Expert",
    highlighted: false,
  },
  {
    name: "Technical Assessment Package",
    icon: Search,
    idealFor: "Businesses wanting an independent review of their current technology environment.",
    features: [
      "Infrastructure assessment",
      "Website and application review",
      "Cybersecurity assessment",
      "Process and workflow analysis",
      "Technology maturity evaluation",
      "Risk identification",
      "Improvement recommendations",
    ],
    bestFor: ["Comprehensive assessment report", "Executive findings summary", "Recommended action plan"],
    bestForLabel: "Deliverables",
    pricing: "Custom assessment engagement",
    cta: "Request an Assessment",
    highlighted: false,
  },
  {
    name: "Project Management Package",
    icon: ClipboardList,
    idealFor: "Businesses needing professional oversight of technology projects.",
    features: [
      "Project planning",
      "Scope management",
      "Timeline management",
      "Stakeholder coordination",
      "Risk management",
      "Progress reporting",
      "Delivery governance",
    ],
    bestFor: ["Software projects", "IT implementations", "Digital transformation initiatives"],
    pricing: "Based on project duration and complexity",
    cta: "Discuss Your Project",
    highlighted: false,
  },
];

const specialistAreas = [
  {
    icon: Code2,
    title: "Custom Software Development",
    items: ["Business applications", "Internal systems", "Workflow automation", "Web platforms", "Mobile applications"],
  },
  {
    icon: Cpu,
    title: "IT Support & Technology Consulting",
    items: ["Technology strategy", "Infrastructure planning", "System optimisation", "Digital transformation guidance"],
  },
  {
    icon: Lock,
    title: "Cybersecurity Services",
    items: ["Security assessments", "Risk identification", "Security improvement roadmaps", "Security awareness guidance"],
  },
  {
    icon: BarChart3,
    title: "Data & AI Solutions",
    items: ["Business intelligence", "Dashboard development", "Data analytics", "AI opportunity assessments", "Automation strategy", "AI implementation planning"],
  },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

function StatCounter({ value, suffix, label, visible }: { value: number; suffix: string; label: string; visible: boolean }) {
  const v = useCountUp(value, visible);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient tabular-nums">
        {v.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-3xl mb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs uppercase tracking-widest text-accent">
        <Sparkles className="w-3.5 h-3.5" /> {eyebrow}
      </div>
      <h2 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const statRef = useInView<HTMLDivElement>();
  const [testimonial, setTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonial((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  const navLinks = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Products", "#products"],
    ["Process", "#process"],
    ["Packages", "#packages"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <main className="min-h-dvh bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="UM Tech CG logo" className="w-10 h-10 rounded-lg object-cover" />
            <div className="leading-tight">
              <div className="font-bold text-sm">UM TECH CG</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Ubuntu Mzansi</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {navLinks.map(([l, h]) => (
              <a key={h} href={h} className="text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-brand text-white text-sm font-medium shadow-glow hover:opacity-90 transition">
            Book Consultation <ArrowRight className="w-4 h-4" />
          </a>
          <button className="md:hidden p-2" onClick={() => setNavOpen((o) => !o)} aria-label="Menu">
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 flex flex-col gap-3">
            {navLinks.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setNavOpen(false)} className="text-sm py-1 text-muted-foreground">{l}</a>
            ))}
            <a href="#contact" onClick={() => setNavOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-brand text-white text-sm font-medium">Book Consultation</a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
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
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.02] transition">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card text-foreground font-medium hover:bg-white/5 transition">
                Explore Services
              </a>
            </div>
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

      {/* ABOUT */}
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
              <img src={founderImg} alt="Rezaan Achmat, Founder" loading="lazy" width={160} height={160} className="w-32 h-32 rounded-2xl object-cover ring-2 ring-white/10" />
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

      {/* SERVICES */}
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

      {/* PRODUCTS */}
      <Section id="products">
        <SectionHeading eyebrow="Products & Innovations" title="Tools we're building in-house." subtitle="Our own products solving real African business problems." />
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.name} className="relative overflow-hidden rounded-3xl p-8 md:p-10 glass-card hover:shadow-glow transition">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-brand)" }} />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-accent">{p.tag}</div>
                <h3 className="mt-2 text-3xl font-bold">{p.name}</h3>
                <p className="mt-3 text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 grid grid-cols-1 gap-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition">
                  Request a demo <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

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

      {/* PROCESS */}
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

      {/* STATS */}
      <section ref={statRef.ref} className="relative py-24 px-6 border-y border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} visible={statRef.inView} />
          ))}
        </div>
      </section>

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
              <button
                key={i}
                onClick={() => setTestimonial(i)}
                aria-label={`Testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === testimonial ? "w-8 bg-gradient-brand" : "w-4 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* PACKAGES */}
      <Section id="packages" className="bg-secondary/30">
        <SectionHeading eyebrow="Packages" title="Engagements that scale with you." subtitle="Transparent starting points. Every engagement is tailored to your goals." />
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((p) => (
            <div key={p.name} className={`relative rounded-3xl p-8 transition hover:-translate-y-1 ${p.highlighted ? "bg-gradient-brand text-white shadow-glow" : "glass-card"}`}>
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background border border-border text-xs uppercase tracking-widest text-accent">Most popular</div>
              )}
              <h3 className={`text-xl font-semibold ${p.highlighted ? "text-white" : ""}`}>{p.name}</h3>
              <p className={`text-sm mt-1 ${p.highlighted ? "text-white/80" : "text-muted-foreground"}`}>{p.tagline}</p>
              <div className="mt-6">
                <div className="text-4xl font-bold tracking-tight">{p.price}</div>
                <div className={`text-xs uppercase tracking-widest mt-1 ${p.highlighted ? "text-white/70" : "text-muted-foreground"}`}>{p.cadence}</div>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className={`w-4 h-4 ${p.highlighted ? "text-white" : "text-accent"}`} /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full font-medium transition ${
                  p.highlighted ? "bg-background text-foreground hover:opacity-90" : "bg-gradient-brand text-white shadow-glow hover:scale-[1.01]"
                }`}
              >
                Get started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center glass-card">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Ready to Transform Your Business <br /> <span className="text-gradient">with Technology?</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with Ubuntu Mzansi Tech Consulting Group and unlock new opportunities through innovation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.02] transition">
                Schedule Consultation <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card font-medium hover:bg-white/5">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="Contact" title="Let's build something meaningful." subtitle="Tell us about your project. We respond within one business day." />
            <div className="space-y-4">
              <a href="mailto:hello@umtechcg.co.za" className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:bg-white/5">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-sm">hello@umtechcg.co.za</div>
                </div>
              </a>
              <a href="tel:+27000000000" className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:bg-white/5">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                  <div className="text-sm">+27 (0) 00 000 0000</div>
                </div>
              </a>
              <div className="flex items-center gap-4 glass-card rounded-2xl p-4">
                <MapPin className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Address</div>
                  <div className="text-sm">Cape Town, South Africa</div>
                </div>
              </div>
              <div className="aspect-video rounded-2xl glass-card grid place-items-center text-xs uppercase tracking-widest text-muted-foreground">
                Google Maps placeholder
              </div>
              <div className="flex gap-3 pt-2">
                <a href="#" aria-label="LinkedIn" className="p-3 rounded-full glass-card hover:bg-white/10"><Linkedin className="w-4 h-4" /></a>
                <a href="#" aria-label="Facebook" className="p-3 rounded-full glass-card hover:bg-white/10"><Facebook className="w-4 h-4" /></a>
                <a href="https://wa.me/27000000000" aria-label="WhatsApp" className="p-3 rounded-full glass-card hover:bg-white/10"><MessageCircle className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch shortly."); }}
            className="glass-card rounded-3xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full name"><input required maxLength={100} className="input" placeholder="Your name" /></Field>
              <Field label="Email"><input required type="email" maxLength={255} className="input" placeholder="you@company.com" /></Field>
            </div>
            <Field label="Company"><input maxLength={120} className="input" placeholder="Optional" /></Field>
            <Field label="What can we help with?">
              <select className="input">
                <option>Technology Consulting</option>
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>Custom Software</option>
                <option>Cloud Solutions</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Message"><textarea required maxLength={2000} rows={5} className="input resize-none" placeholder="Tell us about your project..." /></Field>
            <button type="submit" className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.01] transition">
              Send message <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-muted-foreground text-center">Or join our newsletter for insights — coming soon.</p>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 py-14">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="UM Tech CG" className="w-10 h-10 rounded-lg" />
              <div className="font-bold">UM TECH CG</div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Ubuntu Mzansi Tech Consulting Group — building practical, scalable technology for South African businesses.
            </p>
          </div>
          <FooterCol title="Services" links={["Consulting", "Web Development", "Mobile Apps", "Custom Software", "Cloud"]} />
          <FooterCol title="Products" links={["TrackSuite", "Watt Wallet Buddy"]} />
          <FooterCol title="Company" links={["About", "Process", "Packages", "Contact"]} />
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-border flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <div>© 2026 Ubuntu Mzansi Tech Consulting Group. All Rights Reserved.</div>
          <div className="flex gap-4"><a href="#" className="hover:text-foreground">Privacy</a><a href="#" className="hover:text-foreground">Terms</a></div>
        </div>
      </footer>

      <a
        href="https://wa.me/27000000000"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-105 transition"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>

      <style>{`
        .input {
          width: 100%;
          background: oklch(1 0 0 / 0.04);
          border: 1px solid oklch(1 0 0 / 0.10);
          border-radius: 0.875rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input:focus { border-color: oklch(0.65 0.22 295); background: oklch(1 0 0 / 0.06); }
        .input::placeholder { color: oklch(0.72 0.02 280); }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      {children}
    </label>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-accent">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}