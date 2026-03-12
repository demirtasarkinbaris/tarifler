import React from 'react';
import { getYoutubeEmbedUrl } from '../utils/youtube';

export default function YouTubeEmbed({ youtubeUrl }) {
  const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

  if (!embedUrl) {
    return (
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 flex items-center justify-center rounded-2xl shadow-lg">
        <p className="text-gray-600 text-lg font-semibold">📹 Video bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title="Tarifler - Yemek Videosu"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
