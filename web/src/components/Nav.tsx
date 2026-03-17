"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Today" },
  { href: "/tasks", label: "Tasks" },
  { href: "/meetings", label: "Meetings" },
  { href: "/teams", label: "Teams" },
  { href: "/ai", label: "AI" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? "active" : ""}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
