import React, { useEffect, useMemo, useState } from "react";
import Lightning from "../ui/Lighting";
import TextType from "../ui/TextType";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import {
  Copy,
  ExternalLink,
  BarChart3,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";

function AnimatedCounter({ value = 0, duration = 0.8 }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]); // eslint-disable-line

  return <span>{display.toLocaleString()}</span>;
}

function AnalyticsCard({ item, i }) {
  const clicks =
    item?.TotalClicks ?? item?.totalClicks ?? item?.clicks ?? 0;
  const shortId = item?.shortId ?? item?.id ?? `item-${i}`;
  const redirect = item?.redirectedUrl ?? item?.destination ?? "#";

  const shortUrl = useMemo(
    () => `http://localhost:8000/${shortId}`,
    [shortId]
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
    } catch {
      // no-op (avoid crashing on insecure context)
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
      className="group relative"
    >
      {/* gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/70 via-fuchsia-500/70 to-amber-400/70 opacity-80 blur-[2px]" />
      {/* card body */}
      <div className="relative rounded-2xl bg-neutral-900/70 backdrop-blur-xl p-5 ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* subtle shine */}
        <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -top-1/2 left-0 h-[200%] w-1/3 rotate-12 bg-white/10 blur-2xl" />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="grid place-items-center w-10 h-10 rounded-xl bg-white/10">
            <BarChart3 className="w-5 h-5 text-white/90" />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-white/60">Short URL</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate text-white font-semibold hover:underline"
              title={shortUrl}
            >
              {shortUrl}
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-white/60">Destination</p>
            <a
              href={redirect}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 text-sm truncate max-w-[60%]"
              title={redirect}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="truncate">{redirect}</span>
            </a>
          </div>

          <div className="flex items-end justify-between pt-2">
            <div>
              <p className="text-sm text-white/60">Total Clicks</p>
              <p className="text-3xl font-extrabold text-white tracking-tight">
                <AnimatedCounter value={Number(clicks) || 0} />
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-sm transition"
                title="Copy short URL"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 bg-white/10 hover:bg-white/15 text-white text-sm transition"
                title="Open short URL"
              >
                <LinkIcon className="w-4 h-4" />
                Open
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard({ i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.05 }}
      className="rounded-2xl bg-white/10 h-40 animate-pulse"
    />
  );
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchAnalytics = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/analytics", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch analytics");
      const data = await res.json();
      setAnalytics(data?.urls || []); // make sure backend returns { urls: [...] }
    } catch (e) {
      console.error(e);
      setErr(e?.message || "Something went wrong");
      setAnalytics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <ParallaxProvider>
      <div className="relative w-full min-h-screen overflow-clip">
        {/* animated bg layer */}
        <div className="absolute inset-0">
          <Lightning hue={220} xOffset={0} speed={1} intensity={1} size={1} />
        </div>

        {/* parallax glow blobs */}
        <Parallax speed={-20}>
          <div className="pointer-events-none absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-fuchsia-500/25 blur-3xl" />
        </Parallax>
        <Parallax speed={15}>
          <div className="pointer-events-none absolute top-40 right-[-8rem] w-[28rem] h-[28rem] rounded-full bg-cyan-400/25 blur-3xl" />
        </Parallax>
        <Parallax speed={8}>
          <div className="pointer-events-none absolute bottom-[-10rem] left-1/4 w-[24rem] h-[24rem] rounded-full bg-amber-400/20 blur-3xl" />
        </Parallax>

        {/* content container */}
        <div className="relative z-10 max-w-6xl mx-auto px-5 py-12 md:py-16 text-white">
          {/* header */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <TextType
                text={["Analytics!"]}
                typingSpeed={75}
                pauseDuration={1200}
                showCursor={true}
                cursorCharacter="|"
              />
            </h2>
            <button
              onClick={fetchAnalytics}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 backdrop-blur-md transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* sub header / summary */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 ring-1 ring-white/10">
              <p className="text-sm text-white/70">Total Short Links</p>
              <p className="mt-1 text-2xl font-extrabold">
                <AnimatedCounter value={analytics.length} />
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 ring-1 ring-white/10">
              <p className="text-sm text-white/70">Total Clicks (Visible)</p>
              <p className="mt-1 text-2xl font-extrabold">
                <AnimatedCounter
                  value={analytics.reduce(
                    (sum, a) =>
                      sum +
                      (a?.TotalClicks ?? a?.totalClicks ?? a?.clicks ?? 0),
                    0
                  )}
                />
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-md p-4 ring-1 ring-white/10">
              <p className="text-sm text-white/70">Active Domains</p>
              <p className="mt-1 text-2xl font-extrabold">
                <AnimatedCounter
                  value={
                    new Set(
                      analytics
                        .map((a) => {
                          try {
                            return new URL(
                              a?.redirectedUrl ?? a?.destination ?? ""
                            ).hostname;
                          } catch {
                            return "";
                          }
                        })
                        .filter(Boolean)
                    ).size
                  }
                />
              </p>
            </div>
          </div>

          {/* error state */}
          {err && (
            <div className="mb-6 rounded-xl bg-red-500/15 border border-red-500/30 p-4 text-red-100">
              <p className="font-medium">Couldn’t load analytics</p>
              <p className="text-sm opacity-80">{err}</p>
            </div>
          )}

          {/* content grid */}
          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} i={i} />
                ))}
              </div>
            ) : analytics.length === 0 ? (
              <div className="grid place-items-center h-[40vh] text-center">
                <div className="max-w-md">
                  <p className="text-lg md:text-xl text-white/80">
                    No analytics yet.
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    Create a short link to see real-time clicks, destinations,
                    and more.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {analytics.map((item, i) => (
                  <AnalyticsCard item={item} key={item?.shortId || i} i={i} />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ParallaxProvider>
  );
}
