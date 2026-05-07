"use client";

import Link from "next/link";
import { useState } from "react";

import { portalContent } from "@/content/platform-content";

export function PortalPreview({ defaultLocale = "ar" }) {
  const [locale, setLocale] = useState(defaultLocale === "en" ? "en" : "ar");
  const content = portalContent[locale];
  const labels = {
    preview: locale === "ar" ? "معاينة التشغيل" : "Operator preview",
    workflow: locale === "ar" ? "سير العمل" : "Workflow",
  };

  return (
    <div className="page-shell portal-shell" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="topbar">
        <div>
          <p className="brand-kicker">{labels.preview}</p>
          <h1 className="brand-title">{content.title}</h1>
        </div>
        <div className="locale-switcher" aria-label="Language switcher">
          <button
            type="button"
            className={locale === "ar" ? "active" : ""}
            onClick={() => setLocale("ar")}
          >
            AR
          </button>
          <button
            type="button"
            className={locale === "en" ? "active" : ""}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </div>
      </header>

      <main className="portal-main">
        <section className="portal-intro">
          <p>{content.subtitle}</p>
        </section>

        <section className="portal-grid">
          {content.panels.map((panel) => (
            <article key={panel.title} className="portal-card">
              <h2>{panel.title}</h2>
              <div className="portal-metrics">
                {panel.metrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="section-block compact">
          <div className="section-heading">
            <span className="section-kicker">{labels.workflow}</span>
            <h3>{locale === "ar" ? "تدفق التشغيل" : "Operations flow"}</h3>
          </div>
          <div className="timeline-list">
            {content.streams.map((item) => (
              <article key={item} className="timeline-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <Link className="button secondary back-link" href="/">
          {content.back}
        </Link>
      </main>
    </div>
  );
}
