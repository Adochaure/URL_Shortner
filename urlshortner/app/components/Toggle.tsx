"use client";

import { useState } from "react";
import { Link2, QrCode } from "lucide-react";
import clsx from "clsx";

export default function Toggle() {
  const [active, setActive] = useState<"link" | "qr">("link");

  return (
    <div className="relative inline-flex border border-dashed border-zinc-500 p-1 mt-2">
      {/* Sliding Background */}
      <div
        className={clsx(
          "absolute top-1 bottom-1 left-1 w-14 border border-dashed border-zinc-500 bg-zinc-100",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active === "link"
            ? "translate-x-0"
            : "translate-x-[56px]"
        )}
      />

      {/* Link */}
      <button
        onClick={() => setActive("link")}
        className={clsx(
          "relative z-10 flex h-14 w-14 items-center justify-center transition-colors duration-300",
          active === "link" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <Link2 size={20} strokeWidth={2} />
      </button>

      {/* QR */}
      <button
        onClick={() => setActive("qr")}
        className={clsx(
          "relative z-10 flex h-14 w-14 items-center justify-center transition-colors duration-300",
          active === "qr" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <QrCode size={20} strokeWidth={2} />
      </button>
    </div>
  );
}