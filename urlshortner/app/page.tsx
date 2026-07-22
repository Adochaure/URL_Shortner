"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "./components/Hero";
import Inputs from "./components/Inputs";
import Boxs from "./components/Boxs";
import Toggle from "./components/Toggle";
import { createUrl, deleteUrl, type UrlRecord } from "@/lib/api";

export default function Home() {
  const [view, setView] = useState<"link" | "qr">("link");
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiresIn, setExpiresIn] = useState<"1d" | "1w" | "1m">("1d");
  const [shortUrl, setShortUrl] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<UrlRecord | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const publicBase = useMemo(() => process.env.NEXT_PUBLIC_SHORT_URL_BASE?.replace(/\/api\/URL\/?$/, "") ?? "", []);

  async function handleCreate() {
    if (!originalUrl.trim()) {
      setMessage("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const expiresAt = new Date();
      if (expiresIn === "1d") expiresAt.setDate(expiresAt.getDate() + 1);
      if (expiresIn === "1w") expiresAt.setDate(expiresAt.getDate() + 7);
      if (expiresIn === "1m") expiresAt.setMonth(expiresAt.getMonth() + 1);

      const response = await createUrl(
        originalUrl.trim(),
        expiresAt.toISOString()
      );
      const created = response.data;
      const nextShortUrl = `${publicBase}/${created.shortCode}`;
      setShortUrl(nextShortUrl);
      setSelectedUrl(created);
      setOriginalUrl("");
      setExpiresIn("1d");
      setMessage("URL created successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setMessage("Short URL copied to clipboard.");
  }

  async function handleShare() {
    if (!shortUrl) return;
    if (navigator.share) {
      await navigator.share({ title: "Short URL", url: shortUrl });
      return;
    }
    await handleCopy();
  }

  async function handleDownload() {
    if (!shortUrl) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(shortUrl)}`;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = "qr-code.png";
    link.click();
  }

  async function handleDelete(id: string) {
    try {
      await deleteUrl(id);
      if (selectedUrl?._id === id) {
        setSelectedUrl(null);
        setShortUrl("");
      }
      setMessage("URL deleted successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not delete URL");
    }
  }

  useEffect(() => {
    if (selectedUrl) {
      setShortUrl(`${publicBase}/${selectedUrl.shortCode}`);
    }
  }, [selectedUrl, publicBase]);

  const displayUrl = selectedUrl ? `${publicBase}/${selectedUrl.shortCode}` : shortUrl;

  return (
    <div className="relative doto-id flex min-h-screen flex-col items-center justify-center border border-white border-dashed px-3 py-4 font-sans bg-transparent sm:px-4 sm:py-6">
      <main
        className="
          hide-scrollbar
          relative
          w-full
          max-w-5xl
          max-h-[calc(100vh-2rem)]
          flex
          flex-col
          items-center
          justify-start
          gap-5
          py-8
          px-3
          text-2xl
          bg-transparent
          border-l
          border-r
          border-white
          border-dashed
          overflow-y-auto
          overflow-x-hidden
          sm:px-6
          sm:py-12
          md:px-10
          md:py-14
          md:text-3xl
          lg:px-14
          lg:py-16
        "
      >
        <Hero />
        <Toggle value={view} onChange={setView} />
        <Inputs
          value={originalUrl}
          expiresIn={expiresIn}
          onValueChange={setOriginalUrl}
          onExpiresInChange={setExpiresIn}
          onSubmit={handleCreate}
          loading={loading}
        />

        {message ? <p className="mt-2 w-full break-words text-sm text-zinc-900 bg-white px-3 py-2 border border-dashed border-zinc-800 sm:px-4">{message}</p> : null}

        <Boxs
          type={view}
          value={displayUrl}
          originalUrl={selectedUrl?.originalUrl}
          expiresAt={selectedUrl?.expiresAt ?? undefined}
          onCopy={handleCopy}
          onShare={handleShare}
          onDownload={handleDownload}
          onDelete={selectedUrl ? () => handleDelete(selectedUrl._id) : undefined}
        />
      </main>
    </div>
  );
}
