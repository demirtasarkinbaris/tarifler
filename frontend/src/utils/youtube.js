// Extract video ID from YouTube URL
export const getYoutubeVideoId = (url) => {
  if (!url) return null;
  
  let videoId = '';
  
  if (url.includes('youtube.com/watch')) {
    const urlObj = new URL(url);
    videoId = urlObj.searchParams.get('v');
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1].split('?')[0];
  } else if (url.includes('youtube.com/embed/')) {
    videoId = url.split('youtube.com/embed/')[1].split('?')[0];
  }
  
  return videoId;
};

// Get YouTube thumbnail URL
export const getYoutubeThumbnail = (youtubeUrl) => {
  const videoId = getYoutubeVideoId(youtubeUrl);
  if (!videoId) return null;
  
  // Use maxresdefault for highest quality, fallback to sddefault
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

// Get YouTube embed URL
export const getYoutubeEmbedUrl = (youtubeUrl) => {
  const videoId = getYoutubeVideoId(youtubeUrl);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
};
