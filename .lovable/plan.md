
# Ubuntu Mzansi Admin Portal — Build Plan

I'll enable Lovable Cloud and build the admin portal in clear, dependent stages. Each stage produces working, testable functionality before moving on.

## Stage 1 — Foundation: Auth, Roles, Shell

- Enable Lovable Cloud (Postgres + Auth + Storage).
- DB schema:
  - `profiles` (id → auth.users, full_name, avatar_url, phone, created_at)
  - `app_role` enum: `super_admin`, `admin`, `editor`, `sales_manager`
  - `user_roles` (user_id, role) — separate table, security-definer `has_role()` function (RLS-safe)
  - `activity_logs` (user_id, action, entity_type, entity_id, metadata, ip, created_at)
  - `login_history` (user_id, ip, user_agent, success, created_at)
  - `user_2fa` (user_id, totp_secret encrypted, enabled, backup_codes)
- Public `/auth` page: email+password sign-in + Google OAuth, password reset, `/reset-password` page.
- 2FA: TOTP enrollment (QR code via `otpauth` + `qrcode`), verification on login, backup codes.
- `_authenticated` gate (integration-managed) + `/admin/*` subtree.
- Admin shell: collapsible sidebar (shadcn) + topbar with user menu, role badge, dark theme matching site.
- First registered user auto-promoted to `super_admin` (seed via trigger only if no admins exist).
- Activity log middleware on all admin mutations.

## Stage 2 — Dashboard & CRM

- `/admin` dashboard: metric cards (leads this month, consultation requests, proposal requests, contact submissions, blog views, conversion rate), recent enquiries table, Recharts line/bar for trends.
- DB tables:
  - `leads` (name, company, email, phone, service_interest, package_id, budget_range, notes, status enum, assigned_to, source, created_at)
  - `lead_notes` (lead_id, author_id, body, created_at) — history
  - `contact_submissions` (type: general/consultation/proposal/partnership, name, email, phone, company, message, status, internal_notes, created_at)
- `/admin/leads`: table with search, status filter, assignee filter, row drawer for edit + notes timeline, CSV export.
- `/admin/enquiries`: tabbed view by submission type, reply (mailto), mark complete, internal notes, CSV export.
- Wire the public `/` contact form + consultation/proposal CTAs to insert into `contact_submissions` (no auth needed; narrow `TO anon` INSERT-only policy).

## Stage 3 — Content CMS

DB tables (each with `is_published`, `sort_order`, `updated_at`, `updated_by`):
- `site_services`, `site_packages` (with JSONB features/idealFor), `site_products`, `site_testimonials`, `site_stats`, `site_hero` (single-row), `site_settings` (singleton: company info, contact, socials, WhatsApp, hours).
- Admin pages under `/admin/content/*`: CRUD tables with drag-reorder (dnd-kit), image picker from media library.
- Public site (`src/routes/index.tsx`) refactored to load content via public server fn using publishable client + `TO anon` SELECT policies on published rows only.

## Stage 4 — Blog, Media Library, SEO

- `blog_posts` (slug, title, excerpt, body markdown, featured_image, category, tags[], status, scheduled_at, author_id, views, published_at).
- `/admin/blog`: list, create/edit with rich-text editor (Tiptap), schedule, categories, tag input.
- Public `/blog` + `/blog/$slug` routes with SSR head() metadata.
- Storage bucket `media` (public): `/admin/media` grid, folder paths, upload (jpg/png/svg/mp4/pdf/docx), replace, delete, copy URL.
- `seo_settings` table per route key (title, description, og_image, keywords, robots) — admin editor at `/admin/seo`.
- Sitemap + robots.txt generated from `seo_settings` via `/api/public/sitemap.xml` and `/api/public/robots.txt`.

## Role Matrix

| Section | super_admin | admin | editor | sales |
|---|---|---|---|---|
| Users/roles | ✓ | — | — | — |
| Site settings/SEO | ✓ | — | — | — |
| Content CMS | ✓ | ✓ | — | — |
| Blog/media | ✓ | ✓ | ✓ | — |
| Leads/enquiries | ✓ | ✓ | — | ✓ |
| Dashboard | ✓ | ✓ | ✓ | ✓ |

Enforced via `has_role()` in RLS policies + UI route guards.

## Security

- All tables: RLS on, explicit GRANTs (`authenticated` for admin tables; `anon` SELECT only on published public content + `anon` INSERT only on `contact_submissions`).
- 2FA enforced for `super_admin` and `admin` after enrollment.
- Activity log written via trigger on key tables + explicit calls from server fns.
- Session list + revoke (via Supabase Auth Admin API in a privileged server fn).

## Tech Notes

- Server fns in `src/lib/admin/*.functions.ts` with `requireSupabaseAuth` + role check.
- Sidebar: shadcn `Sidebar` with `collapsible="icon"`.
- Charts: Recharts (already common). Rich text: Tiptap. CSV: simple in-browser blob.
- No new framework — TanStack Start + Cloud only.

## Future Scalability (not built now, but schema-ready)

Roles enum and `activity_logs` are extensible; tables namespaced with `site_` / `blog_` / future `project_`, `invoice_`, `ticket_` can be added without migrations to existing tables.

---

**This is a 4-stage build.** I'll deliver Stage 1 (auth + roles + 2FA + shell + activity logs) first so you can log in and see the foundation, then proceed through Stages 2–4. Approve to start.
