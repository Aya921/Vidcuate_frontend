import { useRef } from "react";
import { USE_MOCK_API } from "../../../../core/mock/config";

const MAX_MOCK_VIDEO_DURATION_SECONDS = 2 * 60 * 60;

export function useVideoPlayer() {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const seek = (time: number) => {
    
    if (playerRef.current){
    
     
      playerRef.current.currentTime = time;}
     
       
  };
  const play = () => playerRef.current?.play();
  const pause = () => playerRef.current?.pause();

  const getCurrentTime = () => playerRef.current?.currentTime ?? 0;
  const getDuration = () => {
    const duration = playerRef.current?.duration ?? 0;
    return USE_MOCK_API
      ? Math.min(duration, MAX_MOCK_VIDEO_DURATION_SECONDS)
      : duration;
  };

  const setSpeed = (rate: number) => {
    if (playerRef.current) playerRef.current.playbackRate = rate;
  };

  return {
    play,
    pause,
    playerRef,
    seek,
    getCurrentTime,
    getDuration,
    setSpeed,
  };
}
