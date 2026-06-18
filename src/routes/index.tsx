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
import founderAsset from "@/assets/rezaan-achmat.jpg.asset.json";
const founderImg = founderAsset.url;
import tracksuiteAsset from "@/assets/tracksuite.png.asset.json";
import servicelayerAsset from "@/assets/servicelayer.png.asset.json";
import devflowAsset from "@/assets/devflow.png.asset.json";
import bizactivateAsset from "@/assets/bizactivate.png.asset.json";

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

type ProductStatus = "live" | "dev" | "concept";
const productGroups: {
  status: ProductStatus;
  statusLabel: string;
  groupTitle: string;
  items: {
    logo: string;
    name: string;
    tagline: string;
    desc: string;
    sectionA: { title: string; items: string[] };
    sectionB: { title: string; items: string[] };
    link?: { label: string; href: string };
  }[];
}[] = [
  {
    status: "live",
    statusLabel: "Live & Deployed",
    groupTitle: "Live Solutions",
    items: [
      {
        logo: tracksuiteAsset.url,
        name: "UM Tech TrackSuite",
        tagline: "IT Asset Monitoring Platform",
        desc: "Full-stack IT asset management platform helping organisations manage, track and monitor technology assets through a centralised dashboard.",
        sectionA: { title: "Key Features", items: ["Asset registration & management", "Asset status tracking", "Centralised dashboard", "Backend API integration", "PostgreSQL database management"] },
        sectionB: { title: "Technology Stack", items: ["React", "Node.js", "PostgreSQL", "Railway", "Vercel"] },
        link: { label: "Visit Live Platform", href: "https://tracksuite-asset-manager.vercel.app/" },
      },
    ],
  },
  {
    status: "dev",
    statusLabel: "In Development",
    groupTitle: "Platforms In Development",
    items: [
      {
        logo: servicelayerAsset.url,
        name: "UM Tech ServiceLayer",
        tagline: "Central Business Logic API",
        desc: "A modular backend platform serving as the central business logic layer for current and future Ubuntu Mzansi Tech Consulting Group applications.",
        sectionA: { title: "Purpose", items: ["Central API layer", "Authentication services", "Assessment engine", "Business rules engine", "Future AI integration", "Shared ecosystem services"] },
        sectionB: { title: "Technology Stack", items: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Prisma", "Python"] },
      },
      {
        logo: devflowAsset.url,
        name: "UM Tech DevFlow",
        tagline: "AI-First Developer Workflow SaaS",
        desc: "A workflow and project execution platform designed to support project delivery, task management and operational workflows within the Ubuntu Mzansi Tech ecosystem.",
        sectionA: { title: "Purpose", items: ["Project management", "Task management", "Delivery tracking", "Workflow automation", "Team collaboration"] },
        sectionB: { title: "Planned Integrations", items: ["UM Tech ServiceLayer", "Future client portals", "Internal consulting operations"] },
      },
    ],
  },
  {
    status: "concept",
    statusLabel: "Concept / Product Development",
    groupTitle: "Concept / Product Development Initiatives",
    items: [
      {
        logo: bizactivateAsset.url,
        name: "UM TCG BizActivate",
        tagline: "Activate Your Business",
        desc: "A business activation and digital enablement platform designed to help entrepreneurs, startups and SMEs establish, structure and grow their businesses through guided processes, digital tools and consulting support.",
        sectionA: { title: "Planned Features", items: ["Business readiness assessments", "Digital maturity assessments", "Business registration guidance", "Compliance checklists", "Technology recommendations", "Project planning tools", "Resource & template library", "AI-assisted business guidance"] },
        sectionB: { title: "Target Audience", items: ["Entrepreneurs", "Startups", "SMEs", "Emerging business owners", "Organisations undergoing digital transformation"] },
      },
    ],
  },
];

const statusStyles: Record<ProductStatus, { dot: string; badge: string; ring: string }> = {
  live:    { dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30", ring: "from-emerald-400/30 to-emerald-600/10" },
  dev:     { dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",   badge: "bg-amber-500/10 text-amber-300 border-amber-400/30",       ring: "from-amber-400/30 to-amber-600/10" },
  concept: { dot: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]",     badge: "bg-sky-500/10 text-sky-300 border-sky-400/30",             ring: "from-sky-400/30 to-sky-600/10" },
};

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
          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-brand text-white text-sm font-medium shadow-glow hover:opacity-90 transition">
              Book Consultation <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
                    <article
                      key={p.name}
                      className="group relative overflow-hidden rounded-3xl glass-card p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
                    >
                      <div className={`pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-40 bg-gradient-to-br ${s.ring} transition-opacity duration-500 group-hover:opacity-70`} />
                      <div className="relative flex flex-col gap-6">
                        <div className="flex items-start gap-5">
                          <div className="relative shrink-0">
                            <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 bg-gradient-to-br ${s.ring}`} />
                            <img
                              src={p.logo}
                              alt={`${p.name} logo`}
                              loading="lazy"
                              className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
                            />
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
                                  <span key={it} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-foreground/90">
                                    {it}
                                  </span>
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
                          <a
                            href={p.link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-foreground transition self-start"
                          >
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

          {/* Ecosystem architecture */}
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
            <a href="#contact" className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.02] transition">
              Request a Proposal <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`group relative rounded-3xl p-8 transition hover:-translate-y-1 hover:shadow-glow ${
                p.highlighted ? "bg-gradient-brand text-white shadow-glow" : "glass-card"
              }`}
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background border border-border text-xs uppercase tracking-widest text-accent">
                  Most popular
                </div>
              )}
              <div
                className={`w-12 h-12 rounded-xl grid place-items-center ${
                  p.highlighted ? "bg-white/15 text-white" : "bg-gradient-brand text-white shadow-glow"
                }`}
              >
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

              <a
                href="#contact"
                className={`mt-6 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full font-medium transition ${
                  p.highlighted ? "bg-background text-foreground hover:opacity-90" : "bg-gradient-brand text-white shadow-glow hover:scale-[1.01]"
                }`}
              >
                {p.cta} <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* SPECIALIST AREAS */}
        <div className="mt-24">
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
        </div>
      </Section>

      {/* CTA */}
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
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.02] transition">
                <FileText className="w-4 h-4" /> Request a Proposal
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card font-medium hover:bg-white/5">
                <CalendarCheck className="w-4 h-4" /> Schedule a Consultation
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-card font-medium hover:bg-white/5">
                <MessageCircle className="w-4 h-4" /> Contact Our Team
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
          <FooterCol title="Products" links={["TrackSuite", "ServiceLayer", "DevFlow", "BizActivate"]} />
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