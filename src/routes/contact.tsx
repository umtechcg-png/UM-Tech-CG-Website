import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Facebook, Instagram, MessageCircle, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/site-layout";
import { Section, SectionHeading, Field, socialLinks } from "@/components/site/site-data";
import { submitContactEnquiry } from "@/lib/contact.functions";

const contactSocialIconMap = { linkedin: Linkedin, facebook: Facebook, instagram: Instagram } as const;

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
  const submitEnquiry = useServerFn(submitContactEnquiry);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setSendError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const result = await submitEnquiry({
      data: {
        fullName: String(fd.get("fullName") ?? ""),
        email: String(fd.get("email") ?? ""),
        company: String(fd.get("company") ?? ""),
        serviceType: String(fd.get("serviceType") ?? ""),
        message: String(fd.get("message") ?? ""),
      },
    });
    setSending(false);
    if (!result.ok) {
      setSendError(result.error);
      return;
    }
    setSent(true);
    form.reset();
  }

  return (
    <SiteLayout>
      <div className="pt-24" />
      <Section id="contact">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading eyebrow="Contact" title="Let's build something meaningful." subtitle="Tell us about your project. We respond within one business day." />
            <div className="space-y-4">
              <a href="mailto:umtechcg@gmail.com" className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:bg-white/5">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-sm">umtechcg@gmail.com</div>
                </div>
              </a>
              <a href="mailto:nexus@umtechcg.co.za" className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:bg-white/5">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-sm">nexus@umtechcg.co.za</div>
                </div>
              </a>
              <a href="tel:+27603918734" className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:bg-white/5">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                  <div className="text-sm">060 391 8734</div>
                </div>
              </a>
              <a href="https://wa.me/27603918734" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass-card rounded-2xl p-4 hover:bg-white/5">
                <MessageCircle className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <div className="text-sm">060 391 8734</div>
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
              <div className="pt-2">
                <div className="text-xs uppercase tracking-widest text-accent mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {socialLinks.map((s) => {
                    const Icon = contactSocialIconMap[s.icon];
                    return (
                      <a
                        key={s.icon}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="p-3 rounded-full glass-card hover:bg-white/10 hover:scale-110 hover:shadow-glow transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                  <a href="https://wa.me/27603918734" aria-label="WhatsApp" className="p-3 rounded-full glass-card hover:bg-white/10 hover:scale-110 hover:shadow-glow transition-all duration-300"><MessageCircle className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-5">
            {sent ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-accent mx-auto" />
                <h3 className="text-xl font-bold">Thank you — message received.</h3>
                <p className="text-sm text-muted-foreground">We've captured your enquiry and will be in touch within one business day.</p>
                <button type="button" onClick={() => setSent(false)} className="text-sm text-accent hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full name"><input name="fullName" required maxLength={100} className="input" placeholder="Your name" /></Field>
                  <Field label="Email"><input name="email" required type="email" maxLength={255} className="input" placeholder="you@company.com" /></Field>
                </div>
                <Field label="Company"><input name="company" maxLength={120} className="input" placeholder="Optional" /></Field>
                <Field label="What can we help with?">
                  <select name="serviceType" className="input">
                    <option>Technology Consulting</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>Custom Software</option>
                    <option>Cloud Solutions</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Message"><textarea name="message" required maxLength={2000} rows={5} className="input resize-none" placeholder="Tell us about your project..." /></Field>
                {sendError && <p className="text-sm text-destructive">{sendError}</p>}
                <button type="submit" disabled={sending} className="w-full inline-flex justify-center items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-brand text-white font-medium shadow-glow hover:scale-[1.01] transition disabled:opacity-60">
                  {sending ? "Sending…" : <>Send message <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-xs text-muted-foreground text-center">Or join our newsletter for insights — coming soon.</p>
              </>
            )}
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}
