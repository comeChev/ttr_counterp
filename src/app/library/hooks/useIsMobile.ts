"use client";
import { useState, useLayoutEffect } from "react";
import debounce from "lodash/debounce.js";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(true);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", debounce(updateSize, 100));

    return (): void => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
}
