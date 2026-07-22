"use client";

import { Link2, QrCode } from "lucide-react";
import clsx from "clsx";

interface ToggleProps {
  value: "link" | "qr";
  onChange: (value: "link" | "qr") => void;
}

export default function Toggle({ value, onChange }: ToggleProps) {

  return (
    <div className="relative inline-flex border border-dashed border-zinc-500 p-1 mt-2">
      {/* Sliding Background */}
      <div
        className={clsx(
          "absolute top-1 bottom-1 left-1 w-14 border border-dashed border-zinc-500 bg-zinc-100",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          value === "link"
            ? "translate-x-0"
            : "translate-x-[56px]"
        )}
      />

      {/* Link */}
      <button
        onClick={() => onChange("link")}
        className={clsx(
          "relative z-10 flex h-14 w-14 items-center justify-center transition-colors duration-300",
          value === "link" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <Link2 size={20} strokeWidth={2} />
      </button>

      {/* QR */}
      <button
        onClick={() => onChange("qr")}
        className={clsx(
          "relative z-10 flex h-14 w-14 items-center justify-center transition-colors duration-300",
          value === "qr" ? "text-black" : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <QrCode size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
