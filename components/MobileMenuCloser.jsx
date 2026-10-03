"use client";

import { useEffect } from "react";

// Closes the phone <details> menu on a link choice or Escape.
export default function MobileMenuCloser({ menuId }) {
  useEffect(() => {
    const menu = document.getElementById(menuId);

    const onClick = (event) => {
      if (event.target.closest("a")) menu.open = false;
    };
    const onKeyDown = (event) => {
      if (event.key !== "Escape" || !menu.open) return;
      const focusWasInMenu = menu.contains(document.activeElement);
      menu.open = false;
      // The links just hid, so keep keyboard focus on the toggle.
      if (focusWasInMenu) menu.querySelector("summary").focus();
    };

    menu.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      menu.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuId]);

  return null;
}
