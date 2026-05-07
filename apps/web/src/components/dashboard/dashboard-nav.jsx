"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardNav({ items }) {
  const pathname = usePathname();

  return (
    <nav className="dashboard-nav" aria-label="Dashboard navigation">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            className={`dashboard-link${isActive ? " active" : ""}`}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
