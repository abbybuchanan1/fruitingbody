"use client";

import { useEffect, type RefObject } from "react";

// Keyboard care for the image viewers: when a viewer opens, focus moves into
// it; Tab and Shift+Tab stay inside it while it is open; when it closes,
// focus returns to whatever opened it, so a keyboard visitor keeps their place.
export function useDialogFocus(ref: RefObject<HTMLElement | null>, open: boolean) {
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    const focusable = (): HTMLElement[] => {
      if (!dialog) return [];
      const found: HTMLElement[] = Array.from(
        dialog.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex='-1'])"),
      );
      return found.filter((el) => !el.hasAttribute("disabled"));
    };
    focusable()[0]?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [ref, open]);
}
