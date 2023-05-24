"use client";
import { useState, useLayoutEffect } from "react";
import debounce from "lodash/debounce";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", debounce(updateSize, 100));

    return (): void => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
}
