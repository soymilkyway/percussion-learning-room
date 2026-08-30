const youtubeIdPattern = /^[A-Za-z0-9_-]{6,}$/;

function validVideoId(value: string | null | undefined) {
  return value && youtubeIdPattern.test(value) ? value : null;
}

function parseStartSeconds(value: string | null) {
  if (!value) return 0;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return 0;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

export function getYouTubeVideoId(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase().replace(/^(?:www\.|m\.)/, "");
    if (host === "youtu.be") return validVideoId(url.pathname.split("/").filter(Boolean)[0]);
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (url.pathname === "/watch") return validVideoId(url.searchParams.get("v"));
      const [type, id] = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(type)) return validVideoId(id);
    }
  } catch {
    return null;
  }
  return null;
}

export function toYouTubeEmbedUrl(rawUrl: string) {
  const videoId = getYouTubeVideoId(rawUrl);
  if (!videoId) return null;
  const url = new URL(rawUrl);
  const start = parseStartSeconds(url.searchParams.get("t") ?? url.searchParams.get("start"));
  const params = new URLSearchParams({ autoplay: "1" });
  if (start > 0) params.set("start", String(start));
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
