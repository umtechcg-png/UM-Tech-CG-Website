import { useEffect, useRef, useState } from "react";
import {
  Briefcase, Code2, Smartphone, Settings2, Workflow, Palette, Cloud,
  Sparkles, MessageCircle, MapPin, Rocket, TrendingUp, Check,
  Compass, Lightbulb, PenTool, LifeBuoy,
  BarChart3, Lock, Cpu, ClipboardList, Search, Building2, Handshake, Target, CalendarCheck,
} from "lucide-react";
import tracksuiteAsset from "@/assets/tracksuite.png.asset.json";
import servicelayerAsset from "@/assets/servicelayer.png.asset.json";
import devflowAsset from "@/assets/devflow.png.asset.json";
import bizactivateAsset from "@/assets/bizactivate.png.asset.json";

export const services = [
  { icon: Briefcase, title: "Technology Consulting", desc: "Digital transformation strategy, IT assessments and technology roadmaps tailored to your business.", items: ["Transformation strategy", "IT assessments", "Technology roadmaps"] },
  { icon: Code2, title: "Web Development", desc: "Business websites, e-commerce platforms and corporate portals built for performance.", items: ["Business websites", "E-commerce", "Corporate portals"] },
  { icon: Smartphone, title: "Mobile App Development", desc: "Android, iOS and cross-platform apps designed for African and global users.", items: ["Android", "iOS", "Cross-platform"] },
  { icon: Settings2, title: "Custom Software", desc: "Business systems, internal platforms and process automation built around your team.", items: ["Business systems", "Internal platforms", "Process automation"] },
  { icon: Workflow, title: "Business Automation", desc: "Workflow automation, CRM integration and productivity tooling that scales.", items: ["Workflow automation", "CRM integration", "Productivity tooling"] },
  { icon: Palette, title: "UI / UX Design", desc: "User research, wireframes and modern interfaces customers love to use.", items: ["User research", "Wireframes", "Modern UX"] },
  { icon: Cloud, title: "Cloud Solutions", desc: "Cloud migration, infrastructure setup and managed services on AWS, Azure & GCP.", items: ["Cloud migration", "Infrastructure", "Managed services"] },
];

export type ProductStatus = "live" | "dev" | "concept";
export const productGroups: {
  status: ProductStatus;
  statusLabel: string;
  groupTitle: string;
  items: {
    logo: string; name: string; tagline: string; desc: string;
    sectionA: { title: string; items: string[] };
    sectionB: { title: string; items: string[] };
    link?: { label: string; href: string };
  }[];
}[] = [
  {
    status: "live", statusLabel: "Live & Deployed", groupTitle: "Live Solutions",
    items: [{
      logo: tracksuiteAsset.url, name: "UM Tech TrackSuite", tagline: "IT Asset Monitoring Platform",
      desc: "Full-stack IT asset management platform helping organisations manage, track and monitor technology assets through a centralised dashboard.",
      sectionA: { title: "Key Features", items: ["Asset registration & management", "Asset status tracking", "Centralised dashboard", "Backend API integration", "PostgreSQL database management"] },
      sectionB: { title: "Technology Stack", items: ["React", "Node.js", "PostgreSQL", "Railway", "Vercel"] },
      link: { label: "Visit Live Platform", href: "https://tracksuite-asset-manager.vercel.app/" },
    }],
  },
  {
    status: "dev", statusLabel: "In Development", groupTitle: "Platforms In Development",
    items: [
      { logo: servicelayerAsset.url, name: "UM Tech ServiceLayer", tagline: "Central Business Logic API",
        desc: "A modular backend platform serving as the central business logic layer for current and future Ubuntu Mzansi Tech Consulting Group applications.",
        sectionA: { title: "Purpose", items: ["Central API layer", "Authentication services", "Assessment engine", "Business rules engine", "Future AI integration", "Shared ecosystem services"] },
        sectionB: { title: "Technology Stack", items: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Prisma", "Python"] } },
      { logo: devflowAsset.url, name: "UM Tech DevFlow", tagline: "AI-First Developer Workflow SaaS",
        desc: "A workflow and project execution platform designed to support project delivery, task management and operational workflows within the Ubuntu Mzansi Tech ecosystem.",
        sectionA: { title: "Purpose", items: ["Project management", "Task management", "Delivery tracking", "Workflow automation", "Team collaboration"] },
        sectionB: { title: "Planned Integrations", items: ["UM Tech ServiceLayer", "Future client portals", "Internal consulting operations"] } },
    ],
  },
  {
    status: "concept", statusLabel: "Concept / Product Development", groupTitle: "Concept / Product Development Initiatives",
    items: [{
      logo: bizactivateAsset.url, name: "UM TCG BizActivate", tagline: "Activate Your Business",
      desc: "A business activation and digital enablement platform designed to help entrepreneurs, startups and SMEs establish, structure and grow their businesses through guided processes, digital tools and consulting support.",
      sectionA: { title: "Planned Features", items: ["Business readiness assessments", "Digital maturity assessments", "Business registration guidance", "Compliance checklists", "Technology recommendations", "Project planning tools", "Resource & template library", "AI-assisted business guidance"] },
      sectionB: { title: "Target Audience", items: ["Entrepreneurs", "Startups", "SMEs", "Emerging business owners", "Organisations undergoing digital transformation"] },
    }],
  },
];

export const statusStyles: Record<ProductStatus, { dot: string; badge: string; ring: string }> = {
  live:    { dot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]", badge: "bg-emerald-500/10 text-emerald-300 border-emerald-400/30", ring: "from-emerald-400/30 to-emerald-600/10" },
  dev:     { dot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]",   badge: "bg-amber-500/10 text-amber-300 border-amber-400/30",       ring: "from-amber-400/30 to-amber-600/10" },
  concept: { dot: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]",     badge: "bg-sky-500/10 text-sky-300 border-sky-400/30",             ring: "from-sky-400/30 to-sky-600/10" },
};

export const whyUs = [
  { icon: Sparkles, title: "Tailored Solutions, Not Templates", desc: "Every engagement is custom-built around your unique goals." },
  { icon: MapPin, title: "South African Business Expertise", desc: "Deep understanding of the local market, regulations and culture." },
  { icon: Rocket, title: "Practical Technology Implementation", desc: "We ship working systems — not slideware or theory." },
  { icon: Building2, title: "Enterprise-Level Thinking", desc: "Architecture and governance designed to scale safely." },
  { icon: MessageCircle, title: "Transparent Communication", desc: "Clear timelines, honest progress, no hidden surprises." },
  { icon: Handshake, title: "Long-Term Partnership Approach", desc: "We stay invested long after launch and delivery." },
  { icon: Target, title: "Focus on Business Outcomes", desc: "Technology that moves the metrics that matter to you." },
  { icon: TrendingUp, title: "Scalable Growth Strategies", desc: "From MVP to enterprise — built to grow with you." },
];

export const processSteps = [
  { icon: Compass, title: "Discovery", desc: "We listen, audit and map your current landscape and goals." },
  { icon: Lightbulb, title: "Strategy", desc: "A clear roadmap, scoped milestones and measurable outcomes." },
  { icon: PenTool, title: "Design", desc: "UX, architecture and prototypes validated with your users." },
  { icon: Rocket, title: "Development", desc: "Agile delivery with weekly demos and continuous quality." },
  { icon: LifeBuoy, title: "Support & Growth", desc: "Ongoing optimisation, monitoring and scaling support." },
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "+", label: "Clients Supported" },
  { value: 35, suffix: "+", label: "Solutions Built" },
  { value: 12000, suffix: "+", label: "Consulting Hours" },
];

export const testimonials = [
  { quote: "UM Tech CG transformed how we operate. Their team feels like an extension of ours.", name: "Future Client", role: "CEO, Retail Group" },
  { quote: "Pragmatic, fast, and deeply technical. The roadmap they delivered paid for itself.", name: "Future Client", role: "CTO, FinTech Startup" },
  { quote: "From discovery to launch, everything was transparent. Truly partner-grade work.", name: "Future Client", role: "Director, NGO" },
];

export type PricingTier = {
  name: string; idealFor: string; price: string; priceSuffix?: string;
  priceLabel: string; badge?: string; icon: typeof Rocket;
};

export const pricingTiers: PricingTier[] = [
  { name: "Starter Package", idealFor: "Ideal for startups and small businesses", price: "R2,500", priceLabel: "Starting From", icon: Rocket },
  { name: "Growth Package", idealFor: "Ideal for growing SMEs and business optimisation", price: "R10,000", priceLabel: "Starting From", badge: "Most popular", icon: TrendingUp },
  { name: "Enterprise Package", idealFor: "Ideal for corporate and large-scale solutions", price: "Custom Quote", priceLabel: "Tailored Engagement", icon: Building2 },
  { name: "Technical Assessment", idealFor: "Business technology and systems assessment", price: "R1,500", priceLabel: "Starting From", icon: ClipboardList },
  { name: "Project Management", idealFor: "Professional project planning and delivery oversight", price: "R3,500", priceSuffix: "/month", priceLabel: "Starting From", icon: CalendarCheck },
  { name: "BizActivate", idealFor: "Business activation and growth support for entrepreneurs and SMEs", price: "R999", priceLabel: "Starting From", icon: Sparkles },
];

export type PackageDef = {
  name: string; icon: typeof Rocket; idealFor: string; features: string[];
  bestFor: string[]; bestForLabel?: string; pricing: string; cta: string; highlighted: boolean;
};

export const packages: PackageDef[] = [
  { name: "Starter Package", icon: Rocket, idealFor: "Startups, entrepreneurs and small businesses beginning their digital journey.",
    features: ["Initial consultation and business needs assessment", "Basic website or digital presence setup", "Technology recommendations", "Basic IT support guidance", "Email and collaboration setup assistance", "Project planning and roadmap"],
    bestFor: ["New businesses", "Small teams", "Manual-to-digital transitions"], pricing: "Custom quote based on requirements", cta: "Get Started", highlighted: false },
  { name: "Growth Package", icon: TrendingUp, idealFor: "Growing businesses looking to improve efficiency and scale operations.",
    features: ["Business and technology assessment", "Custom website or business application development", "IT support and systems optimisation", "Cybersecurity review and recommendations", "Data reporting and dashboard setup", "Project management and delivery oversight", "Ongoing consulting support"],
    bestFor: ["Growing SMEs", "Organisations modernising operations", "Teams needing custom systems"], pricing: "Custom quote based on project scope", cta: "Book a Consultation", highlighted: true },
  { name: "Enterprise Package", icon: Building2, idealFor: "Corporate organisations and large-scale projects.",
    features: ["Enterprise technology consulting", "Custom software and systems development", "Advanced cybersecurity assessments", "Data and AI strategy consulting", "Digital transformation planning", "Dedicated project management", "Integration with existing systems", "Long-term support and optimisation"],
    bestFor: ["Corporates", "Multi-department organisations", "Large transformation initiatives"], pricing: "Tailored enterprise engagement", cta: "Speak to an Expert", highlighted: false },
  { name: "Technical Assessment Package", icon: Search, idealFor: "Businesses wanting an independent review of their current technology environment.",
    features: ["Infrastructure assessment", "Website and application review", "Cybersecurity assessment", "Process and workflow analysis", "Technology maturity evaluation", "Risk identification", "Improvement recommendations"],
    bestFor: ["Comprehensive assessment report", "Executive findings summary", "Recommended action plan"], bestForLabel: "Deliverables", pricing: "Custom assessment engagement", cta: "Request an Assessment", highlighted: false },
  { name: "Project Management Package", icon: ClipboardList, idealFor: "Businesses needing professional oversight of technology projects.",
    features: ["Project planning", "Scope management", "Timeline management", "Stakeholder coordination", "Risk management", "Progress reporting", "Delivery governance"],
    bestFor: ["Software projects", "IT implementations", "Digital transformation initiatives"], pricing: "Based on project duration and complexity", cta: "Discuss Your Project", highlighted: false },
];

export const specialistAreas = [
  { icon: Code2, title: "Custom Software Development", items: ["Business applications", "Internal systems", "Workflow automation", "Web platforms", "Mobile applications"] },
  { icon: Cpu, title: "IT Support & Technology Consulting", items: ["Technology strategy", "Infrastructure planning", "System optimisation", "Digital transformation guidance"] },
  { icon: Lock, title: "Cybersecurity Services", items: ["Security assessments", "Risk identification", "Security improvement roadmaps", "Security awareness guidance"] },
  { icon: BarChart3, title: "Data & AI Solutions", items: ["Business intelligence", "Dashboard development", "Data analytics", "AI opportunity assessments", "Automation strategy", "AI implementation planning"] },
];

export function useCountUp(target: number, start: boolean, duration = 1800) {
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

export function StatCounter({ value, suffix, label, visible }: { value: number; suffix: string; label: string; visible: boolean }) {
  const v = useCountUp(value, visible);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient tabular-nums">{v.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

export function useInView<T extends HTMLElement>() {
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

export function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
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

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</div>
      {children}
    </label>
  );
}

export function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-accent">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (<li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>))}
      </ul>
    </div>
  );
}

export const navLinks = [
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Process", to: "/process" },
  { label: "Packages", to: "/packages" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
] as const;