"use client";
import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/site";
import T from "./T";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="menu-btn" aria-label="मेनू" onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <Link href="/kathayen"><T hi="सभी कथाएँ" hg="Sabhi Kathayein" /></Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/shreni/${c.slug}`}>
              <span className="mm-ic">{c.icon}</span> <T hi={c.hi} hg={c.hg} />
            </Link>
          ))}
          <Link href="/parichay"><T hi="परिचय" hg="Parichay" /></Link>
        </div>
      )}
    </>
  );
}
