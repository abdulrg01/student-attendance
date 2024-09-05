import React from "react";
import SideNav from "./_components/SideNav";
import Nav from "./_components/Nav";

export default function Layout({ children }) {
  return (
    <div>
      <Nav />
      <SideNav />
      <div className="p-4 sm:ml-64 mt-20">{children}</div>
    </div>
  );
}
