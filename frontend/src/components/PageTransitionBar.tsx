"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PageTransitionBarProps {
  isLoading: boolean;
}

export default function PageTransitionBar({ isLoading }: PageTransitionBarProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85, opacity: 1 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FA6400] via-[#FF5500] to-[#E60038] z-[100] origin-left pointer-events-none shadow-[0_0_10px_rgba(250,100,0,0.8)]"
        />
      )}
    </AnimatePresence>
  );
}
