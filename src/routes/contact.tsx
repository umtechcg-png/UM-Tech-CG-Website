import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Facebook, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, Field } from "@/components/site/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UM Tech CG" },
      { name: "description", content: "Book a consultation with Ubuntu Mzansi Tech Consulting Group. We respond within one business day." },
      { property: "og:title", content: "Contact — UM Tech CG" },
      { property: "og:description", content: "Tell us about your project. We respond within one business day." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="pt-24" />
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
    </SiteLayout>
  );
}