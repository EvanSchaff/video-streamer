import path from 'path';
export const config = {
  logType: 3,
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*',
    mediaroot: path.join(__dirname, 'media'), 
  },
  trans: {
    ffmpeg: 'ffmpeg',
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]', 
        hlsKeep: true, 
        hlsSegmentFilename: 'media/live/%s/index_%d.ts', 
        hlsPlaylistSize: 5, 
        hlsSegmentSize: 2, 
      }
    ]
  }
};