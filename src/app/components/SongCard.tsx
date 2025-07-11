import React from "react";
import { motion } from "framer-motion";

interface SongCardProps {
  title: string;
  artist: string;
  index: number;
  active: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

const SongCard: React.FC<SongCardProps> = ({ title, artist, index, active, onClick, style }) => {
  return (
    <motion.button
      className={`absolute rounded-lg shadow-md p-2 w-20 h-24 flex flex-col items-center justify-center text-xs transition outline-none border-2 focus:border-blue-400 bg-white/80 dark:bg-black/70 ${active ? 'ring-2 ring-blue-500' : 'border-transparent'}`}
      aria-label={`Play ${title} by ${artist}`}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      type="button"
      style={style}
    >
      <span className="font-bold truncate w-full text-center">{title}</span>
      <span className="opacity-70 truncate w-full text-center">{artist}</span>
      <span className="mt-1 text-[10px] opacity-60">{index + 1}</span>
    </motion.button>
  );
};

export default SongCard; 