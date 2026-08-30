"use client";

/* eslint-disable @next/next/no-img-element -- YouTube thumbnails are remote and derived from the supplied video URL. */
import { useState } from "react";
import { getYouTubeVideoId, toYouTubeEmbedUrl } from "../lib/youtube";

export function LazyYouTubeEmbed({ youtubeUrl, title }: { youtubeUrl: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYouTubeVideoId(youtubeUrl);
  const embedUrl = toYouTubeEmbedUrl(youtubeUrl);

  return (
    <div className="music-video">
      {videoId && embedUrl ? (
        isPlaying ? (
          <iframe
            className="music-embed"
            src={embedUrl}
            title={`${title} YouTube 影片`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button className="music-thumbnail music-play-button" type="button" onClick={() => setIsPlaying(true)} aria-label={`在網頁播放${title}`}>
            <img src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" loading="lazy" />
            <span>在網頁播放 <b aria-hidden="true">▶</b></span>
          </button>
        )
      ) : (
        <div className="music-video-unavailable">此影片無法建立內嵌播放器</div>
      )}
      <a className="music-youtube-link" href={youtubeUrl} target="_blank" rel="noreferrer">前往 YouTube 觀看 <span aria-hidden="true">↗</span></a>
    </div>
  );
}
