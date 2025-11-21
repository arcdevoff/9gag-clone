"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { AuthUser } from "@/@types/user";
import type React from "react";
import Link from "next/link";

type ProfileWindowProps = {
  data: AuthUser;
  logout: () => void;
};

const ProfileWindow: React.FC<ProfileWindowProps> = ({ data, logout }) => {
  return (
    <AnimatePresence>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(e) => e.preventDefault()}
        className="absolute text-[16.5px] font-semibold flex flex-col right-0 top-12 rounded-xl shadow-xl py-3 z-99 bg-stone-900"
      >
        <div className="flex flex-col items-stretch gap-2 left">
          <Link
            className="text-left px-5 py-1.5 hover:bg-stone-800 transition-colors"
            href={`/u/${data.username}`}
          >
            My Profile
          </Link>
          <button
            onClick={() => logout()}
            className="text-left px-5 py-1.5 hover:text-blue-400 hover:bg-stone-800 transition-colors"
          >
            Log Out
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileWindow;
