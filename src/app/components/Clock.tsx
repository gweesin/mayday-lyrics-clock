"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SongCard from "./SongCard";

// Song data: 12 songs for 60 seconds
const songs = [
  { title: "仓颉", artist: "Mayday", src: "/songs/五月天 - 仓颉_[cut_5sec].mp3" },
  { title: "如烟", artist: "Mayday", src: "/songs/五月天 - 如烟_[cut_5sec].mp3" },
  { title: "孙悟空", artist: "Mayday", src: "/songs/五月天 - 孙悟空_[cut_5sec].mp3" },
  { title: "任性", artist: "Mayday", src: "/songs/五月天 - 任性_[cut_5sec].mp3" },
  { title: "洗衣机", artist: "Mayday", src: "/songs/五月天 - 洗衣机_[cut_5sec].mp3" },
  { title: "一半人生", artist: "Mayday", src: "/songs/五月天 - 一半人生_[cut_5sec].mp3" },
  { title: "时光机", artist: "Mayday", src: "/songs/五月天 - 时光机_[cut_5sec].mp3" },
  { title: "笑忘歌", artist: "Mayday", src: "/songs/五月天 - 笑忘歌_[cut_5sec].mp3" },
  { title: "疯狂世界", artist: "Mayday", src: "/songs/五月天 - 疯狂世界_[cut_5sec].mp3" },
  { title: "OAOA", artist: "Mayday", src: "/songs/五月天 - OAOA_[cut_5sec].mp3" },
  { title: "知足", artist: "Mayday", src: "/songs/五月天 - 知足_[cut_5sec].mp3" },
  { title: "溫柔", artist: "Mayday", src: "/songs/五月天 - 温柔_[cut_5sec].mp3" },
];

const CLOCK_SIZE = 340; // px, 可用min(90vw, 420px)响应式
const RADIUS = CLOCK_SIZE / 2; // 卡片中心到表盘中心的距离

const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [currentSong, setCurrentSong] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const musicIndex = Math.round(now.getSeconds() / 5) % 12;
    console.log(musicIndex, now.getSeconds(), songs[musicIndex]);
    if (currentSong !== musicIndex) {
      setCurrentSong(musicIndex);
    }
  }, [now]);

  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.pause();
    }

    if (currentSong !== null) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play().catch(() => {});
    }
  }, [currentSong]);

  if(!hasMounted) {
    return <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-spin"></div>
    </div>;
  }

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours() % 12;
  const secondAngle = second * 6;
  const minuteAngle = minute * 6 + second * 0.1;
  const hourAngle = hour * 30 + minute * 0.5;

  return (
    <section
      className="relative"
      style={{
        width: "min(90vw,420px)",
        height: "min(90vw,420px)",
        maxWidth: 420,
        maxHeight: 420,
        minWidth: 240,
        minHeight: 240,
      }}
      aria-label="Mayday Song Clock"
    >
      {/* 表盘背景 */}
      <div className="absolute left-1/2 top-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-full shadow" />

      {/* 刻度点 */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const r = CLOCK_SIZE / 2 - 20;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          />
        );
      })}

      {/* 歌曲卡片 */}
      {songs.map((song, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = Math.round(Math.cos(angle) * RADIUS);
        const y = Math.round(Math.sin(angle) * RADIUS);
        return (
          <SongCard
            key={song.title}
            title={song.title}
            artist={song.artist}
            index={i}
            active={currentSong === i}
            onClick={() => setCurrentSong(i)}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: currentSong === i ? 20 : 10,
            }}
          />
        );
      })}

      {/* 指针 */}
      <motion.div
        className="absolute left-1/2 top-1/2 origin-bottom h-16 w-2 bg-gray-700 dark:bg-gray-200/50 rounded"
        style={{ translateX: "-50%", translateY: "-100%" }}
        animate={{ rotate: hourAngle }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        aria-label="Hour hand"
      />
      <motion.div
        className="absolute left-1/2 top-1/2 origin-bottom h-24 w-1.5 bg-gray-500 dark:bg-gray-300 rounded"
        style={{ translateX: "-50%", translateY: "-100%" }}
        animate={{ rotate: minuteAngle }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        aria-label="Minute hand"
      />
      <motion.div
        className="absolute left-1/2 top-1/2 origin-bottom h-32 w-1 bg-red-500 rounded"
        style={{ translateX: "-50%", translateY: "-100%" }}
        animate={{ rotate: secondAngle }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        aria-label="Second hand"
      />

      {/* 中心圆点 */}
      <div className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 z-20 bg-black dark:bg-white rounded-full border-4 border-white dark:border-black" />

      {/* 隐藏的音频播放器 */}
      <audio ref={audioRef} src={currentSong !== null && currentSong !== undefined ? songs[currentSong].src : undefined} aria-hidden="true" />
    </section>
  );
};

export default Clock; 