import { Copy, Download, Share2, Trash2, ExternalLink } from "lucide-react";

interface OutputBoxProps {
  type?: "link" | "qr";
  value?: string;
  originalUrl?: string;
  expiresAt?: string;
  onCopy?: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

export default function Boxs({
  type = "link",
  value = "https://ado.link/X7nK2L",
  originalUrl,
  expiresAt,
  onCopy,
  onShare,
  onDownload,
  onDelete,
}: OutputBoxProps) {
  const qrUrl = value
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(value)}`
    : "";

  return (
    <div className="mt-4 flex min-h-[170px] w-full items-center justify-center border border-dashed border-zinc-800 p-3 sm:p-4">
      {type === "link" ? (
        <div className="flex w-full min-w-0 max-w-md flex-col items-center gap-3">
          <div className="w-full break-all border border-dashed border-zinc-800 px-3 py-2 text-center text-sm bg-zinc-900 text-white sm:px-4 sm:text-lg">
            {value}
          </div>
          {originalUrl ? (
            <a
              href={originalUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 break-all text-xs text-zinc-700 underline sm:text-sm"
            >
              Open original
              <ExternalLink size={14} />
            </a>
          ) : null}
          {expiresAt ? (
            <p className="text-center text-[11px] text-zinc-500 sm:text-xs">Expires: {new Date(expiresAt).toLocaleString()}</p>
          ) : null}

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <button onClick={onCopy} className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 bg-zinc-200 transition-all duration-300 hover:bg-white hover:text-black">
              <Copy size={16} />
            </button>

            <button onClick={onShare} className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 bg-zinc-200 transition-all duration-300 hover:bg-white hover:text-black">
              <Share2 size={16} />
            </button>
            <button onClick={onDelete} className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 bg-zinc-200 transition-all duration-300 hover:bg-white hover:text-black">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-28 w-28 items-center justify-center border border-dashed border-zinc-500">
            {qrUrl ? (
              <img src={qrUrl} alt="QR code" className="h-24 w-24" />
            ) : (
              <span className="text-xs text-zinc-500">QR</span>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={onDownload} className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 transition-all duration-300 hover:bg-white hover:text-black">
              <Download size={16} />
            </button>

            <button onClick={onShare} className="flex h-9 w-9 items-center justify-center border border-dashed border-zinc-500 transition-all duration-300 hover:bg-white hover:text-black">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
