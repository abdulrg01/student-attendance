import React from "react";

export default function Card({ icon, title, value }) {
  return (
    <div className="flex items-center gap-5 p-7 bg-sky-100 text-black rounded-lg shadow-md">
      <div className="p-2 h-10 w-10 rounded-full bg-black text-primary">{icon}</div>
      <div>
        <h2 className="font-bold">{title}</h2>
        <h2 className="text-lg">{value}</h2>
      </div>
    </div>
  );
}
