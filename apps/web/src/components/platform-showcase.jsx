"use client";

import Link from "next/link";
import { useState } from "react";

import { platformContent } from "@/content/platform-content";

const locales = ["ar", "en"];

export function PlatformShowcase({
  defaultLocale = "ar",
  session = null,
  featuredPrograms = [],
}) {
  const [locale, setLocale] = useState(
    locales.includes(defaultLocale) ? defaultLocale : "ar",
  );
  const content = platformContent[locale];
  const labels = {
    coreValue: locale === "ar" ? "القيمة الأساسية" : "Core value",
    platformFoundation: locale === "ar" ? "أساس المنصة" : "Platform foundation",
    modules: locale === "ar" ? "الموديولات" : "Modules",
    pricingEngine: locale === "ar" ? "محرك التسعير" : "Pricing engine",
    accessControl: locale === "ar" ? "الصلاحيات" : "Access control",
    connectivity: locale === "ar" ? "الربط" : "Connectivity",
    deliveryPath: locale === "ar" ? "مسار التنفيذ" : "Delivery path",
    preview: locale === "ar" ? "معاينة" : "Preview",
    login: locale === "ar" ? "تسجيل الدخول" : "Sign in",
    dashboard: locale === "ar" ? "لوحة التحكم" : "Dashboard",
    browse: locale === "ar" ? "تصفح البرامج" : "Browse programs",
    register: locale === "ar" ? "سجّل شركتك" : "Register company",
  };

  return (
    <div className="page-shell" dir={content.dir}>
      <header className="topbar">
        <div>
          <p className="brand-kicker">Luxor Balloon Hub</p>
          <h1 className="brand-title">{content.siteTitle}</h1>
        </div>
        <div className="topbar-actions">
          <nav className="nav-links" aria-label="Primary">
            {content.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <Link className="button secondary topbar-cta" href="/programs">
            {labels.browse}
          </Link>
          <Link className="button secondary topbar-cta" href={session ? "/dashboard" : "/login"}>
            {session ? labels.dashboard : labels.login}
          </Link>
          {!session ? (
            <Link className="button primary topbar-cta" href="/register/company">
              {labels.register}
            </Link>
          ) : null}
          <div className="locale-switcher" aria-label="Language switcher">
            {locales.map((item) => (
              <button
                key={item}
                type="button"
                className={item === locale ? "active" : ""}
                onClick={() => setLocale(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className="hero-grid" id="platform">
          <div className="hero-copy">
            <span className="eyebrow">{content.hero.eyebrow}</span>
            <h2>{content.hero.title}</h2>
            <p className="hero-description">{content.hero.description}</p>

            <div className="hero-actions">
              <Link className="button primary" href="/programs">
                {labels.browse}
              </Link>
              <Link className="button secondary" href={session ? "/dashboard/operator" : "/register/company"}>
                {session ? labels.dashboard : labels.register}
              </Link>
            </div>

            <ul className="highlight-list">
              {content.hero.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="control-panel">
            <div className="panel-header">
              <span className="live-dot" />
              <p>{content.controlPanel.title}</p>
            </div>
            <div className="metric-grid">
              {content.controlPanel.items.map((item) => (
                <article key={item.label} className="metric-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="stats-grid" aria-label="Platform stats">
          {content.stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="section-block" id="programs">
          <div className="section-heading">
            <span className="section-kicker">
              {locale === "ar" ? "برامج منشورة" : "Published programs"}
            </span>
            <h3>
              {locale === "ar"
                ? "البرامج التي يراها العميل على الموقع"
                : "What customers see on the marketplace"}
            </h3>
          </div>
          <div className="featured-program-grid">
            {featuredPrograms.map((program) => (
              <article key={program.id} className="list-card featured-program-card">
                <div className="featured-program-top">
                  <span>{program.company?.name}</span>
                  <strong>${program.priceAdult}</strong>
                </div>
                <h4>{program.title}</h4>
                <p>{program.shortDescription}</p>
                <div className="featured-program-meta">
                  <span>{program.flightWindow}</span>
                  <span>{program.duration}</span>
                </div>
                <Link className="inline-link" href={`/programs/${program.slug}`}>
                  {locale === "ar" ? "فتح صفحة البرنامج" : "Open program page"}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <span className="section-kicker">{labels.coreValue}</span>
            <h3>{labels.platformFoundation}</h3>
          </div>
          <div className="pillar-grid">
            {content.pillars.map((pillar) => (
              <article key={pillar.title} className="feature-card">
                <h4>{pillar.title}</h4>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="modules">
          <div className="section-heading">
            <span className="section-kicker">{labels.modules}</span>
            <h3>{locale === "ar" ? "مكونات النسخة الأولى" : "MVP modules"}</h3>
          </div>
          <div className="module-grid">
            {content.modules.map((item) => (
              <article key={item} className="list-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block dual-grid" id="pricing">
          <div className="pricing-box">
            <div className="section-heading">
              <span className="section-kicker">{labels.pricingEngine}</span>
              <h3>{content.pricing.title}</h3>
            </div>
            <div className="pricing-grid">
              {content.pricing.cards.map((item) => (
                <article key={item.name} className="pricing-card">
                  <span>{item.name}</span>
                  <strong>{item.amount}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="roles-box">
            <div className="section-heading">
              <span className="section-kicker">{labels.accessControl}</span>
              <h3>{content.roles.title}</h3>
            </div>
            <div className="role-list">
              {content.roles.items.map((role) => (
                <article key={role.title} className="role-card">
                  <h4>{role.title}</h4>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block dual-grid" id="integrations">
          <div className="integration-box">
            <div className="section-heading">
              <span className="section-kicker">{labels.connectivity}</span>
              <h3>{content.integrations.title}</h3>
            </div>
            <div className="bullet-list">
              {content.integrations.items.map((item) => (
                <article key={item} className="list-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="roadmap-box">
            <div className="section-heading">
              <span className="section-kicker">{labels.deliveryPath}</span>
              <h3>{content.roadmap.title}</h3>
            </div>
            <div className="timeline-list">
              {content.roadmap.items.map((item) => (
                <article key={item} className="timeline-card">
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="portal-cta">
          <div>
            <span className="section-kicker">{labels.preview}</span>
            <h3>{content.portalPreview.title}</h3>
            <p>{content.portalPreview.description}</p>
          </div>
          <Link className="button primary" href="/portal">
            {content.portalPreview.cta}
          </Link>
        </section>
      </main>

      <footer className="footer-note">
        <p>{content.footer}</p>
      </footer>
    </div>
  );
}
