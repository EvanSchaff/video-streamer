import { ChatCollapseContext } from '../../contexts/ChatCollapseContext';
import { ArrowLeftToLine } from 'lucide-react';
import { useEffect, useRef, useContext } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const { isCollapsed, toggleCollapse } = useContext(ChatCollapseContext);

  useEffect(() => {
    if (playerRef.current || !videoRef.current) return;

    const initPlayer = () => {
      videojs.addLanguage('en', {
        'The media could not be loaded, either because the server or network failed or because the format is not supported.':
          'Stream is currently offline',
      });

      playerRef.current = videojs(videoRef.current, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: 'http://localhost:8080/hls/test.m3u8',
            type: 'application/x-mpegURL',
          },
        ],
        notSupportedMessage: 'This video format is not supported by your browser',
        errorDisplay: true,
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
      {isCollapsed && (
        <button
          className="absolute top-1 right-1 z-50 rounded-md bg-orange-800 p-1 text-white hover:bg-gray-700"
          onClick={() => toggleCollapse()}
        >
          <ArrowLeftToLine className="h-6 w-6 text-zinc-400" />
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
