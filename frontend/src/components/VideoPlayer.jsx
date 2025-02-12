import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current || !videoRef.current) return;

    const initPlayer = () => {
      playerRef.current = videojs(videoRef.current, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: "http://localhost:8080/hls/test.m3u8",
          type: "application/x-mpegURL"
        }]
      });
    };
  
    requestAnimationFrame(initPlayer);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-button vjs-fluid" />
    </div>
  );
};

export default VideoPlayer;