"use client";

import { useEffect } from "react";

// Registers plain #hash link history entries with Next's router, so Back works.
export default function HashHistory() {
  useEffect(() => {
    const onHashChange = () => {
      if (window.history.state === null) {
        window.history.replaceState(null, "", window.location.href);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
