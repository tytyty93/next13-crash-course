"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },

    {
      label: "FAQ",
      href: "/about/faq",
    },
    {
      label: "Posts",
      href: "/posts",
    },
    {
      label: "CRUD",
      href: "/crud",
    },
  ];
  return (
    <div>
      <ul className="flex gap-5 py-10">
        {navItems.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className={
                pathname === `${link.href}` ? "text-blue-500 font-bold" : null
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
