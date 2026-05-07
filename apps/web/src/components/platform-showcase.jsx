"use client";

import Link from "next/link";
import { useState } from "react";

import { platformContent } from "@/content/platform-content";

const locales = ["ar", "en"];

export function PlatformShowcase({
  defaultLocale = "ar",
  featuredPrograms = [],
}) {
  const [locale, setLocale] = useState(
    locales.includes(defaultLocale) ? defaultLocale : "ar",
  );
  const content = platformContent[locale];
  const labels = {
    browse: locale === "ar" ? "تصفح الرحلات" : "Browse flights",
    bookNow: locale === "ar" ? "احجز الآن" : "Book now",
    viewAll: locale === "ar" ? "عرض كل الرحلات" : "View all flights",
    featuredFlights: locale === "ar" ? "رحلات مميزة" : "Featured flights",
    whyUs: locale === "ar" ? "لماذا نحن" : "Why us",
    howToBook: locale === "ar" ? "كيف تحجز" : "How to book",
    testimonials: locale === "ar" ? "آراء العملاء" : "Customer reviews",
    contactUs: locale === "ar" ? "تواصل معنا" : "Contact us",
    callUs: locale === "ar" ? "اتصل بنا" : "Call us",
    emailUs: locale === "ar" ? "راسلنا" : "Email us",
    whatsapp: locale === "ar" ? "واتساب" : "WhatsApp",
    openProgram: locale === "ar" ? "فتح صفحة الرحلة" : "Open flight page",
    step: locale === "ar" ? "خطوة" : "Step",
  };

  return (
    <div className="page-shell" dir={content.dir}>
      <header className="topbar">
        <div>
          <p className="brand-kicker">Luxor Balloon</p>
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
          <Link className="button primary topbar-cta" href="/programs">
            {labels.bookNow}
          </Link>
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
                {labels.bookNow}
              </Link>
              <a className="button secondary" href="#programs">
                {labels.browse}
              </a>
            </div>

            <ul className="highlight-list">
              {content.hero.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside className="hero-visual">
            <div className="hero-image-placeholder">
              <span className="balloon-icon">🎈</span>
              <p>{locale === "ar" ? "شروق الأقصر" : "Luxor Sunrise"}</p>
            </div>
          </aside>
        </section>

        <section className="stats-grid" aria-label="Stats">
          {content.stats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="section-block" id="programs">
          <div className="section-heading">
            <span className="section-kicker">{labels.featuredFlights}</span>
            <h3>
              {locale === "ar"
                ? "اختر رحلتك القادمة"
                : "Choose your next flight"}
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
                  {labels.openProgram}
                </Link>
              </article>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <Link className="button primary" href="/programs">
              {labels.viewAll}
            </Link>
          </div>
        </section>

        <section className="section-block" id="why-us">
          <div className="section-heading">
            <span className="section-kicker">{labels.whyUs}</span>
            <h3>
              {locale === "ar"
                ? "ليه تختار بالون الأقصر؟"
                : "Why choose Luxor Balloon?"}
            </h3>
          </div>
          <div className="pillar-grid">
            {content.whyUs.map((item) => (
              <article key={item.title} className="feature-card">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="how-to-book">
          <div className="section-heading">
            <span className="section-kicker">{labels.howToBook}</span>
            <h3>{content.howToBook.title}</h3>
          </div>
          <div className="steps-grid">
            {content.howToBook.steps.map((step) => (
              <article key={step.number} className="step-card">
                <span className="step-number">{step.number}</span>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="testimonials">
          <div className="section-heading">
            <span className="section-kicker">{labels.testimonials}</span>
            <h3>
              {locale === "ar"
                ? "ماذا قالوا عن تجربتهم"
                : "What they said about their experience"}
            </h3>
          </div>
          <div className="testimonials-grid">
            {content.testimonials.map((t) => (
              <article key={t.name} className="testimonial-card">
                <div className="testimonial-stars">
                  {"★".repeat(Number(t.rating))}{"☆".repeat(5 - Number(t.rating))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <span className="testimonial-name">— {t.name}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="contact">
          <div className="section-heading">
            <span className="section-kicker">{labels.contactUs}</span>
            <h3>{content.contact.title}</h3>
            <p>{content.contact.description}</p>
          </div>
          <div className="contact-grid">
            <a className="contact-card" href={`tel:${content.contact.phone.replace(/\s/g, "")}`}>
              <span className="contact-icon">📞</span>
              <strong>{labels.callUs}</strong>
              <span>{content.contact.phone}</span>
            </a>
            <a className="contact-card" href={`mailto:${content.contact.email}`}>
              <span className="contact-icon">✉️</span>
              <strong>{labels.emailUs}</strong>
              <span>{content.contact.email}</span>
            </a>
            <a
              className="contact-card"
              href={`https://wa.me/${content.contact.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">💬</span>
              <strong>{labels.whatsapp}</strong>
              <span>{content.contact.whatsapp}</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer-note">
        <p>{content.footer}</p>
      </footer>
    </div>
  );
}
