import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { navLinks } from "@/constant";

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0">
      <div class="h-full px-3 pb-2 overflow-y-auto">
        <div className="h-full flex flex-col justify-between">
          <ul class="font-medium">
            {navLinks.slice(0, 6).map((link, i) => {
              const isActive = link.route === pathname;

              return (
                <li
                  className={`flex justify-center items-center w-full whitespace-nowrap rounded-full bg-cover transition-all hover:underline hover:shadow-inner group ${
                    isActive ? "font-bold text-[#FAFAFA]" : "text-[#969697]"
                  }`}
                  key={i}
                >
                  <Link
                    className={`flex size-full gap-4 p-3 text-sm ${
                      isActive && "font-bold"
                    }`}
                    href={link.route}
                  >
                    <div className={`${isActive && "brightness-200"}`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul class="font-medium mt-5">
            {navLinks.slice(6).map((link, i) => {
              const isActive = link.route === pathname;

              return (
                <li
                  className={`flex justify-center items-center w-full whitespace-nowrap rounded-full bg-cover  transition-all hover:underline hover:shadow-inner group ${
                    isActive ? "text-[#FAFAFA]" : "text-[#969697]"
                  }`}
                  key={i}
                >
                  <Link
                    className={`${
                      isActive && "font-bold"
                    } flex size-full gap-2 p-3 text-sm`}
                    href={link.route}
                  >
                    <div className={`${isActive && "brightness-200"}`}>
                      <link.icon className="h-5 w-5" />
                    </div>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link href="/profile" className="px-3 flex items-center gap-3">
            <img
              src="/profile.png"
              alt="profile"
              className="w-7 h-7 rounded-full"
            />
            <div className="flex flex-col gap-1 text-xs font-medium text-[#969697] hover:text-[#FAFAFA] hover:font-medium">
              <p>abusiyam</p>
              <p>abdulrg01@gmail.com</p>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
