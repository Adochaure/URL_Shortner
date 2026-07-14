import { Copy, Download, Share2 } from "lucide-react";

interface OutputBoxProps {
  type?: "link" | "qr";
  value?: string;
}

export default function Boxs({
  type = "link",
  value = "https://ado.link/X7nK2L",
}: OutputBoxProps) {
  return (
    <div className="mt-6 flex min-h-[170px] w-full items-center justify-center border border-dashed border-zinc-800 p-4">
      {type === "link" ? (
        <div className="flex w-full max-w-md flex-col items-center gap-3">
          <div className="w-full border border-dashed border-zinc-800 px-4 py-2 text-center text-lg bg-zinc-900 text-white truncate">
            {value}
          </div>

          <div className="flex gap-8">
            <button className="flex h-9 w-9 bg-zinc-200 items-center justify-center border border-dashed border-zinc-500 transition-all duration-300 hover:bg-white hover:text-black">
              <Copy size={16} />
            </button>

            <button className="flex h-9 w-9 bg-zinc-200 items-center justify-center border border-dashed border-zinc-500 transition-all duration-300 hover:bg-white hover:text-black">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-28 w-28 items-center justify-center border border-dashed border-zinc-500">
            {/* Replace with QRCodeSVG */}
            <span className="text-xs text-zinc-500">QR</span>
          </div>

          <div className="flex gap-2">
            <button className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 transition-all duration-300 hover:bg-white hover:text-black">
              <Download size={16} />
            </button>

            <button className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 transition-all duration-300 hover:bg-white hover:text-black">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}