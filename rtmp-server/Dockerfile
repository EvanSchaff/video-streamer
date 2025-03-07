# Use tiangolo/nginx-rtmp as base image
FROM tiangolo/nginx-rtmp

# Create HLS directory with proper permissions
RUN mkdir -p /tmp/hls/public && \
    chmod 777 /tmp/hls/public

# Create the check_stream.sh script
RUN echo '#!/bin/bash\n\n\
# Check if any stream is already running\n\
if [ -f /tmp/stream_active ]; then\n\
    echo "Stream is already active. Only one stream is allowed at a time."\n\
    exit 1\n\
fi\n\n\
# Create a file to indicate that a stream is active\n\
touch /tmp/stream_active\n\n\
# Clean up when the stream ends\n\
trap "rm -f /tmp/stream_active" EXIT\n' > /usr/local/bin/check_stream.sh && \
    chmod +x /usr/local/bin/check_stream.sh

# Copy your custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose RTMP port and HLS port
EXPOSE 1935
EXPOSE 8080

# Keep the container running
CMD ["nginx", "-g", "daemon off;"]