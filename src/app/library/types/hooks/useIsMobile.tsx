"use client";
import { useState, useEffect } from "react";

export default function useIsMobile() {
  const hasWindow = typeof window;

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (hasWindow) {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  const isMobile = () => {
    if (windowDimensions.width) {
      return windowDimensions.width < 768;
    }
    return false;
  };
  return isMobile();
}
