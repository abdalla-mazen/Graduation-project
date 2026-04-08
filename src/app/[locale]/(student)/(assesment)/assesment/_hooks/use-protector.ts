// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { reportProctorEvent } from "../_actions/proctor-action";

// export type ProctorType =
//   | "copy"
//   | "paste"
//   | "tab_switch"
//   | "blur"
//   | "devtools"
//   | "eye_away"
//   | "phone_detected";

// const MAX_STRIKES = 3;
// const DEDUPE_WINDOW_MS = 400;
// const DEVTOOLS_INTERVAL_MS = 7000;
// const SHORTCUT_COOLDOWN_MS = 1200;

// interface BackendViolationOptions {
//   invalidated?: boolean;
//   strikes?: number;
// }

// export function useProctor(examId: number, onLimitReach?: () => void) {
//   const [warning, setWarning] = useState<string | null>(null);
//   const [strikes, setStrikes] = useState(0);

//   const strikesRef = useRef(0);
//   const lastBlurAtRef = useRef(0);
//   const lastTabSwitchAtRef = useRef(0);
//   const lastDevtoolsAtRef = useRef(0);
//   const lastShortcutAtRef = useRef<Record<"copy" | "paste" | "devtools", number>>({
//     copy: 0,
//     paste: 0,
//     devtools: 0,
//   });
//   const isPageHiddenRef = useRef(false);

//   const applyWarning = useCallback((message: string) => {
//     setWarning(message);
//     setTimeout(() => setWarning(null), 3000);
//   }, []);

//   useEffect(() => {
//     strikesRef.current = strikes;
//   }, [strikes]);

//   const increaseLocalStrikes = useCallback(() => {
//     const nextStrikes = Math.min(strikesRef.current + 1, MAX_STRIKES);
//     strikesRef.current = nextStrikes;
//     setStrikes(nextStrikes);

//     if (nextStrikes >= MAX_STRIKES) {
//       onLimitReach?.();
//     }
//   }, [onLimitReach]);

//   const syncBackendStrikes = useCallback(
//     (nextStrikes: number, invalidated = false) => {
//       strikesRef.current = nextStrikes;
//       setStrikes(nextStrikes);

//       if (invalidated || nextStrikes >= MAX_STRIKES) {
//         onLimitReach?.();
//       }
//     },
//     [onLimitReach],
//   );

//   const reportViolation = useCallback(
//     async (type: ProctorType, message: string) => {
//       applyWarning(message);

//       if (!examId) {
//         increaseLocalStrikes();
//         return;
//       }

//       const response = await reportProctorEvent({
//         exam_id: examId,
//         type,
//       });

//       if (!response || typeof response.strikes !== "number") {
//         increaseLocalStrikes();
//         return;
//       }

//       syncBackendStrikes(response.strikes, response.invalidated);
//     },
//     [applyWarning, examId, increaseLocalStrikes, syncBackendStrikes],
//   );

//   const reportBackendViolation = useCallback(
//     (
//       _type: ProctorType,
//       message: string,
//       options: BackendViolationOptions = {},
//     ) => {
//       applyWarning(message);

//       if (typeof options.strikes === "number") {
//         syncBackendStrikes(options.strikes, options.invalidated);
//         return;
//       }

//       if (options.invalidated) {
//         onLimitReach?.();
//       }
//     },
//     [applyWarning, onLimitReach, syncBackendStrikes],
//   );

//   useEffect(() => {
//     const shouldHandleShortcut = (type: "copy" | "paste" | "devtools") => {
//       const now = Date.now();

//       if (now - lastShortcutAtRef.current[type] < SHORTCUT_COOLDOWN_MS) {
//         return false;
//       }

//       lastShortcutAtRef.current[type] = now;
//       return true;
//     };

//     const handleVisibility = () => {
//       const now = Date.now();
//       isPageHiddenRef.current = document.hidden;

//       if (document.hidden) {
//         lastTabSwitchAtRef.current = now;
//         void reportViolation("tab_switch", "Do not switch tabs during the exam.");
//       }
//     };

//     const handleBlur = () => {
//       const now = Date.now();
//       const tabSwitchWasJustRecorded =
//         now - lastTabSwitchAtRef.current <= DEDUPE_WINDOW_MS;
//       const blurWasJustRecorded = now - lastBlurAtRef.current <= DEDUPE_WINDOW_MS;

//       if (
//         isPageHiddenRef.current ||
//         document.hidden ||
//         tabSwitchWasJustRecorded ||
//         blurWasJustRecorded
//       ) {
//         return;
//       }

//       lastBlurAtRef.current = now;
//       void reportViolation("blur", "Stay focused on the exam page.");
//     };

//     const handleCopy = (event: ClipboardEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("copy")) {
//         return;
//       }

//       void reportViolation("copy", "Copy is not allowed during the exam.");
//     };

//     const handlePaste = (event: ClipboardEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("paste")) {
//         return;
//       }

//       void reportViolation("paste", "Paste is not allowed during the exam.");
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//       const key = event.key.toLowerCase();
//       const usesPrimaryModifier = event.ctrlKey || event.metaKey;
//       const usesShiftPaste = event.shiftKey && key === "insert";
//       const usesCtrlInsertCopy = event.ctrlKey && key === "insert";
//       const requestsCopy = (usesPrimaryModifier && key === "c") || usesCtrlInsertCopy;
//       const requestsPaste = (usesPrimaryModifier && key === "v") || usesShiftPaste;
//       const requestsDevtools =
//         key === "f12" ||
//         (usesPrimaryModifier && event.shiftKey && ["i", "j", "c"].includes(key));

//       if (requestsCopy) {
//         event.preventDefault();

//         if (shouldHandleShortcut("copy")) {
//           void reportViolation("copy", "Copy is not allowed during the exam.");
//         }

//         return;
//       }

//       if (requestsPaste) {
//         event.preventDefault();

//         if (shouldHandleShortcut("paste")) {
//           void reportViolation("paste", "Paste is not allowed during the exam.");
//         }

//         return;
//       }

//       if (requestsDevtools) {
//         event.preventDefault();

//         if (shouldHandleShortcut("devtools")) {
//           lastDevtoolsAtRef.current = Date.now();
//           void reportViolation("devtools", "DevTools detected.");
//         }
//       }
//     };

//     const handleContextMenu = (event: MouseEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("devtools")) {
//         return;
//       }

//       void reportViolation("devtools", "Inspect is not allowed during the exam.");
//     };

//     const detectDevtools = () => {
//       const now = Date.now();
//       const devtoolsOpen =
//         window.outerWidth - window.innerWidth > 150 ||
//         window.outerHeight - window.innerHeight > 150;

//       if (!devtoolsOpen) {
//         return;
//       }

//       if (now - lastDevtoolsAtRef.current < DEVTOOLS_INTERVAL_MS) {
//         return;
//       }

//       lastDevtoolsAtRef.current = now;
//       void reportViolation("devtools", "DevTools detected.");
//     };

//     isPageHiddenRef.current = document.hidden;

//     const interval = setInterval(detectDevtools, DEVTOOLS_INTERVAL_MS);

//     window.addEventListener("blur", handleBlur);
//     window.addEventListener("keydown", handleKeyDown, true);
//     document.addEventListener("visibilitychange", handleVisibility);
//     document.addEventListener("contextmenu", handleContextMenu, true);
//     document.addEventListener("copy", handleCopy, true);
//     document.addEventListener("paste", handlePaste, true);

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("blur", handleBlur);
//       window.removeEventListener("keydown", handleKeyDown, true);
//       document.removeEventListener("visibilitychange", handleVisibility);
//       document.removeEventListener("contextmenu", handleContextMenu, true);
//       document.removeEventListener("copy", handleCopy, true);
//       document.removeEventListener("paste", handlePaste, true);
//     };
//   }, [reportViolation]);

//   return {
//     warning,
//     strikes,
//     maxStrikes: MAX_STRIKES,
//     reportViolation,
//     reportBackendViolation,
//     syncBackendStrikes,
//   };
// }


// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { reportProctorEvent } from "../_actions/proctor-action";

// export type ProctorType =
//   | "copy"
//   | "paste"
//   | "tab_switch"
//   | "blur"
//   | "devtools"
//   | "eye_away"
//   | "phone_detected";

// const MAX_STRIKES = 3;
// const DEDUPE_WINDOW_MS = 400;
// const DEVTOOLS_INTERVAL_MS = 7000;
// const SHORTCUT_COOLDOWN_MS = 1200;
// // FIX: grace period في أول 5 ثواني من بداية الـ exam
// // عشان نمنع أي violation تتبعت قبل ما الـ backend يعتبر الـ exam started
// const STARTUP_GRACE_MS = 5000;

// interface BackendViolationOptions {
//   invalidated?: boolean;
//   strikes?: number;
// }

// export function useProctor(examId: number, onLimitReach?: () => void) {
//   const [warning, setWarning] = useState<string | null>(null);
//   const [strikes, setStrikes] = useState(0);

//   const strikesRef = useRef(0);
//   const lastBlurAtRef = useRef(0);
//   const lastTabSwitchAtRef = useRef(0);
//   const lastDevtoolsAtRef = useRef(0);
//   const lastShortcutAtRef = useRef<Record<"copy" | "paste" | "devtools", number>>({
//     copy: 0,
//     paste: 0,
//     devtools: 0,
//   });
//   const isPageHiddenRef = useRef(false);
//   // FIX: بنسجل وقت ما الـ monitoring بدأ عشان نحسب الـ grace period
//   const examStartedAtRef = useRef<number>(0);

//   const applyWarning = useCallback((message: string) => {
//     setWarning(message);
//     setTimeout(() => setWarning(null), 3000);
//   }, []);

//   useEffect(() => {
//     strikesRef.current = strikes;
//   }, [strikes]);

//   const increaseLocalStrikes = useCallback(() => {
//     const nextStrikes = Math.min(strikesRef.current + 1, MAX_STRIKES);
//     strikesRef.current = nextStrikes;
//     setStrikes(nextStrikes);

//     if (nextStrikes >= MAX_STRIKES) {
//       onLimitReach?.();
//     }
//   }, [onLimitReach]);

//   const syncBackendStrikes = useCallback(
//     (nextStrikes: number, invalidated = false) => {
//       strikesRef.current = nextStrikes;
//       setStrikes(nextStrikes);

//       if (invalidated || nextStrikes >= MAX_STRIKES) {
//         onLimitReach?.();
//       }
//     },
//     [onLimitReach],
//   );

//   const reportViolation = useCallback(
//     async (type: ProctorType, message: string) => {
//       // FIX: لو examId لسه مش جاهز، ignore الـ violation تماماً
//       if (!examId || examId <= 0) {
//         return;
//       }

//       // FIX: ignore أي violation في أول 5 ثواني من بداية الـ monitoring
//       // ده بيمنع الـ blur/tab_switch اللي بيحصل وقت initialization
//       if (Date.now() - examStartedAtRef.current < STARTUP_GRACE_MS) {
//         console.log("[proctor] grace period, ignoring:", type);
//         return;
//       }

//       applyWarning(message);

//       try {
//         const response = await reportProctorEvent({
//           exam_id: examId,
//           type,
//         });

//         // FIX: handle الـ null response أو الـ error object من الـ backend
//         if (!response) {
//           increaseLocalStrikes();
//           return;
//         }

//         if (typeof (response as Record<string, unknown>).error === "string") {
//           console.warn("[proctor] backend rejected event:", (response as Record<string, unknown>).error);
//           return;
//         }

//         if (typeof response.strikes !== "number") {
//           increaseLocalStrikes();
//           return;
//         }

//         syncBackendStrikes(response.strikes, response.invalidated);
//       } catch (error) {
//         // FIX: catch الـ error بدل ما يكسر الـ component
//         console.error("[proctor] failed to report event:", error);
//         increaseLocalStrikes();
//       }
//     },
//     [applyWarning, examId, increaseLocalStrikes, syncBackendStrikes],
//   );

//   const reportBackendViolation = useCallback(
//     (
//       _type: ProctorType,
//       message: string,
//       options: BackendViolationOptions = {},
//     ) => {
//       applyWarning(message);

//       if (typeof options.strikes === "number") {
//         syncBackendStrikes(options.strikes, options.invalidated);
//         return;
//       }

//       if (options.invalidated) {
//         onLimitReach?.();
//       }
//     },
//     [applyWarning, onLimitReach, syncBackendStrikes],
//   );

//   const reportVisionStrikeLocally = useCallback(
//     (message: string) => {
//       applyWarning(message);
//       increaseLocalStrikes();
//     },
//     [applyWarning, increaseLocalStrikes],
//   );

//   useEffect(() => {
//     // FIX: ما تسجلش الـ event listeners لو examId مش جاهز
//     if (!examId || examId <= 0) {
//       return;
//     }

//     // FIX: سجّل وقت بداية الـ monitoring عشان نحسب الـ grace period
//     examStartedAtRef.current = Date.now();

//     const shouldHandleShortcut = (type: "copy" | "paste" | "devtools") => {
//       const now = Date.now();

//       if (now - lastShortcutAtRef.current[type] < SHORTCUT_COOLDOWN_MS) {
//         return false;
//       }

//       lastShortcutAtRef.current[type] = now;
//       return true;
//     };

//     const handleVisibility = () => {
//       const now = Date.now();
//       isPageHiddenRef.current = document.hidden;

//       if (document.hidden) {
//         lastTabSwitchAtRef.current = now;
//         void reportViolation("tab_switch", "Do not switch tabs during the exam.");
//       }
//     };

//     const handleBlur = () => {
//       const now = Date.now();
//       const tabSwitchWasJustRecorded =
//         now - lastTabSwitchAtRef.current <= DEDUPE_WINDOW_MS;
//       const blurWasJustRecorded = now - lastBlurAtRef.current <= DEDUPE_WINDOW_MS;

//       if (
//         isPageHiddenRef.current ||
//         document.hidden ||
//         tabSwitchWasJustRecorded ||
//         blurWasJustRecorded
//       ) {
//         return;
//       }

//       lastBlurAtRef.current = now;
//       void reportViolation("blur", "Stay focused on the exam page.");
//     };

//     const handleCopy = (event: ClipboardEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("copy")) {
//         return;
//       }

//       void reportViolation("copy", "Copy is not allowed during the exam.");
//     };

//     const handlePaste = (event: ClipboardEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("paste")) {
//         return;
//       }

//       void reportViolation("paste", "Paste is not allowed during the exam.");
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//       const key = event.key.toLowerCase();
//       const usesPrimaryModifier = event.ctrlKey || event.metaKey;
//       const usesShiftPaste = event.shiftKey && key === "insert";
//       const usesCtrlInsertCopy = event.ctrlKey && key === "insert";
//       const requestsCopy = (usesPrimaryModifier && key === "c") || usesCtrlInsertCopy;
//       const requestsPaste = (usesPrimaryModifier && key === "v") || usesShiftPaste;
//       const requestsDevtools =
//         key === "f12" ||
//         (usesPrimaryModifier && event.shiftKey && ["i", "j", "c"].includes(key));

//       if (requestsCopy) {
//         event.preventDefault();

//         if (shouldHandleShortcut("copy")) {
//           void reportViolation("copy", "Copy is not allowed during the exam.");
//         }

//         return;
//       }

//       if (requestsPaste) {
//         event.preventDefault();

//         if (shouldHandleShortcut("paste")) {
//           void reportViolation("paste", "Paste is not allowed during the exam.");
//         }

//         return;
//       }

//       if (requestsDevtools) {
//         event.preventDefault();

//         if (shouldHandleShortcut("devtools")) {
//           lastDevtoolsAtRef.current = Date.now();
//           void reportViolation("devtools", "DevTools detected.");
//         }
//       }
//     };

//     const handleContextMenu = (event: MouseEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("devtools")) {
//         return;
//       }

//       void reportViolation("devtools", "Inspect is not allowed during the exam.");
//     };

//     const detectDevtools = () => {
//       const now = Date.now();
//       const devtoolsOpen =
//         window.outerWidth - window.innerWidth > 150 ||
//         window.outerHeight - window.innerHeight > 150;

//       if (!devtoolsOpen) {
//         return;
//       }

//       if (now - lastDevtoolsAtRef.current < DEVTOOLS_INTERVAL_MS) {
//         return;
//       }

//       lastDevtoolsAtRef.current = now;
//       void reportViolation("devtools", "DevTools detected.");
//     };

//     isPageHiddenRef.current = document.hidden;

//     const interval = setInterval(detectDevtools, DEVTOOLS_INTERVAL_MS);

//     window.addEventListener("blur", handleBlur);
//     window.addEventListener("keydown", handleKeyDown, true);
//     document.addEventListener("visibilitychange", handleVisibility);
//     document.addEventListener("contextmenu", handleContextMenu, true);
//     document.addEventListener("copy", handleCopy, true);
//     document.addEventListener("paste", handlePaste, true);

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("blur", handleBlur);
//       window.removeEventListener("keydown", handleKeyDown, true);
//       document.removeEventListener("visibilitychange", handleVisibility);
//       document.removeEventListener("contextmenu", handleContextMenu, true);
//       document.removeEventListener("copy", handleCopy, true);
//       document.removeEventListener("paste", handlePaste, true);
//     };
//   }, [reportViolation, examId]);

//   return {
//     warning,
//     strikes,
//     maxStrikes: MAX_STRIKES,
//     reportViolation,
//     reportVisionStrikeLocally,
//     reportBackendViolation,
//     syncBackendStrikes,
//   };
// }



// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { reportProctorEvent } from "../_actions/proctor-action";

// export type ProctorType =
//   | "copy"
//   | "paste"
//   | "tab_switch"
//   | "blur"
//   | "devtools"
//   | "eye_away"
//   | "phone_detected";

// const MAX_STRIKES = 3;
// const DEDUPE_WINDOW_MS = 400;
// const DEVTOOLS_INTERVAL_MS = 7000;
// const SHORTCUT_COOLDOWN_MS = 1200;
// // FIX: grace period في أول 5 ثواني من بداية الـ exam
// // عشان نمنع أي violation تتبعت قبل ما الـ backend يعتبر الـ exam started
// const STARTUP_GRACE_MS = 5000;

// interface BackendViolationOptions {
//   invalidated?: boolean;
//   strikes?: number;
// }

// export function useProctor(examId: number, onLimitReach?: () => void) {
//   const [warning, setWarning] = useState<string | null>(null);
//   const [strikes, setStrikes] = useState(0);

//   const strikesRef = useRef(0);
//   const lastBlurAtRef = useRef(0);
//   const lastTabSwitchAtRef = useRef(0);
//   const lastDevtoolsAtRef = useRef(0);
//   const lastShortcutAtRef = useRef<Record<"copy" | "paste" | "devtools", number>>({
//     copy: 0,
//     paste: 0,
//     devtools: 0,
//   });
//   const isPageHiddenRef = useRef(false);
//   // FIX: بنسجل وقت ما الـ monitoring بدأ عشان نحسب الـ grace period
//   const examStartedAtRef = useRef<number>(0);

//   const applyWarning = useCallback((message: string) => {
//     setWarning(message);
//     setTimeout(() => setWarning(null), 3000);
//   }, []);

//   useEffect(() => {
//     strikesRef.current = strikes;
//   }, [strikes]);

//   const increaseLocalStrikes = useCallback(() => {
//     const nextStrikes = Math.min(strikesRef.current + 1, MAX_STRIKES);
//     strikesRef.current = nextStrikes;
//     setStrikes(nextStrikes);

//     if (nextStrikes >= MAX_STRIKES) {
//       onLimitReach?.();
//     }
//   }, [onLimitReach]);

//   const syncBackendStrikes = useCallback(
//     (nextStrikes: number, invalidated = false) => {
//       strikesRef.current = nextStrikes;
//       setStrikes(nextStrikes);

//       if (invalidated || nextStrikes >= MAX_STRIKES) {
//         onLimitReach?.();
//       }
//     },
//     [onLimitReach],
//   );

//   const reportViolation = useCallback(
//     async (type: ProctorType, message: string) => {
//       // FIX: لو examId لسه مش جاهز، ignore الـ violation تماماً
//       if (!examId || examId <= 0) {
//         return;
//       }

//       // FIX: ignore أي violation في أول 5 ثواني من بداية الـ monitoring
//       // ده بيمنع الـ blur/tab_switch اللي بيحصل وقت initialization
//       if (Date.now() - examStartedAtRef.current < STARTUP_GRACE_MS) {
//         console.log("[proctor] grace period, ignoring:", type);
//         return;
//       }

//       applyWarning(message);

//       try {
//         const response = await reportProctorEvent({
//           exam_id: examId,
//           type,
//         });

//         // FIX: handle الـ null response أو الـ error object من الـ backend
//         if (!response) {
//           increaseLocalStrikes();
//           return;
//         }

//         if (typeof (response as Record<string, unknown>).error === "string") {
//           console.warn("[proctor] backend rejected event:", (response as Record<string, unknown>).error);
//           return;
//         }

//         if (typeof response.strikes !== "number") {
//           increaseLocalStrikes();
//           return;
//         }

//         syncBackendStrikes(response.strikes, response.invalidated);
//       } catch (error) {
//         // FIX: catch الـ error بدل ما يكسر الـ component
//         console.error("[proctor] failed to report event:", error);
//         increaseLocalStrikes();
//       }
//     },
//     [applyWarning, examId, increaseLocalStrikes, syncBackendStrikes],
//   );

//   const reportBackendViolation = useCallback(
//     (
//       _type: ProctorType,
//       message: string,
//       options: BackendViolationOptions = {},
//     ) => {
//       applyWarning(message);

//       if (typeof options.strikes === "number") {
//         syncBackendStrikes(options.strikes, options.invalidated);
//         return;
//       }

//       if (options.invalidated) {
//         onLimitReach?.();
//       }
//     },
//     [applyWarning, onLimitReach, syncBackendStrikes],
//   );

//   useEffect(() => {
//     // FIX: ما تسجلش الـ event listeners لو examId مش جاهز
//     if (!examId || examId <= 0) {
//       return;
//     }

//     // FIX: سجّل وقت بداية الـ monitoring عشان نحسب الـ grace period
//     examStartedAtRef.current = Date.now();

//     const shouldHandleShortcut = (type: "copy" | "paste" | "devtools") => {
//       const now = Date.now();

//       if (now - lastShortcutAtRef.current[type] < SHORTCUT_COOLDOWN_MS) {
//         return false;
//       }

//       lastShortcutAtRef.current[type] = now;
//       return true;
//     };

//     const handleVisibility = () => {
//       const now = Date.now();
//       isPageHiddenRef.current = document.hidden;

//       if (document.hidden) {
//         lastTabSwitchAtRef.current = now;
//         void reportViolation("tab_switch", "Do not switch tabs during the exam.");
//       }
//     };

//     const handleBlur = () => {
//       const now = Date.now();
//       const tabSwitchWasJustRecorded =
//         now - lastTabSwitchAtRef.current <= DEDUPE_WINDOW_MS;
//       const blurWasJustRecorded = now - lastBlurAtRef.current <= DEDUPE_WINDOW_MS;

//       if (
//         isPageHiddenRef.current ||
//         document.hidden ||
//         tabSwitchWasJustRecorded ||
//         blurWasJustRecorded
//       ) {
//         return;
//       }

//       lastBlurAtRef.current = now;
//       void reportViolation("blur", "Stay focused on the exam page.");
//     };

//     const handleCopy = (event: ClipboardEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("copy")) {
//         return;
//       }

//       void reportViolation("copy", "Copy is not allowed during the exam.");
//     };

//     const handlePaste = (event: ClipboardEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("paste")) {
//         return;
//       }

//       void reportViolation("paste", "Paste is not allowed during the exam.");
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//       const key = event.key.toLowerCase();
//       const usesPrimaryModifier = event.ctrlKey || event.metaKey;
//       const usesShiftPaste = event.shiftKey && key === "insert";
//       const usesCtrlInsertCopy = event.ctrlKey && key === "insert";
//       const requestsCopy = (usesPrimaryModifier && key === "c") || usesCtrlInsertCopy;
//       const requestsPaste = (usesPrimaryModifier && key === "v") || usesShiftPaste;
//       const requestsDevtools =
//         key === "f12" ||
//         (usesPrimaryModifier && event.shiftKey && ["i", "j", "c"].includes(key));

//       if (requestsCopy) {
//         event.preventDefault();

//         if (shouldHandleShortcut("copy")) {
//           void reportViolation("copy", "Copy is not allowed during the exam.");
//         }

//         return;
//       }

//       if (requestsPaste) {
//         event.preventDefault();

//         if (shouldHandleShortcut("paste")) {
//           void reportViolation("paste", "Paste is not allowed during the exam.");
//         }

//         return;
//       }

//       if (requestsDevtools) {
//         event.preventDefault();

//         if (shouldHandleShortcut("devtools")) {
//           lastDevtoolsAtRef.current = Date.now();
//           void reportViolation("devtools", "DevTools detected.");
//         }
//       }
//     };

//     const handleContextMenu = (event: MouseEvent) => {
//       event.preventDefault();

//       if (!shouldHandleShortcut("devtools")) {
//         return;
//       }

//       void reportViolation("devtools", "Inspect is not allowed during the exam.");
//     };

//     const detectDevtools = () => {
//       const now = Date.now();
//       const devtoolsOpen =
//         window.outerWidth - window.innerWidth > 150 ||
//         window.outerHeight - window.innerHeight > 150;

//       if (!devtoolsOpen) {
//         return;
//       }

//       if (now - lastDevtoolsAtRef.current < DEVTOOLS_INTERVAL_MS) {
//         return;
//       }

//       lastDevtoolsAtRef.current = now;
//       void reportViolation("devtools", "DevTools detected.");
//     };

//     isPageHiddenRef.current = document.hidden;

//     const interval = setInterval(detectDevtools, DEVTOOLS_INTERVAL_MS);

//     window.addEventListener("blur", handleBlur);
//     window.addEventListener("keydown", handleKeyDown, true);
//     document.addEventListener("visibilitychange", handleVisibility);
//     document.addEventListener("contextmenu", handleContextMenu, true);
//     document.addEventListener("copy", handleCopy, true);
//     document.addEventListener("paste", handlePaste, true);

//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("blur", handleBlur);
//       window.removeEventListener("keydown", handleKeyDown, true);
//       document.removeEventListener("visibilitychange", handleVisibility);
//       document.removeEventListener("contextmenu", handleContextMenu, true);
//       document.removeEventListener("copy", handleCopy, true);
//       document.removeEventListener("paste", handlePaste, true);
//     };
//   }, [reportViolation, examId]);

//   return {
//     warning,
//     strikes,
//     maxStrikes: MAX_STRIKES,
//     reportViolation,
//     reportBackendViolation,
//     syncBackendStrikes,
//   };
// }

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reportProctorEvent } from "../_actions/proctor-action";

export type ProctorType =
  | "copy"
  | "paste"
  | "tab_switch"
  | "blur"
  | "devtools"
  | "eye_away"
  | "phone_detected";

const MAX_STRIKES = 3;
const DEDUPE_WINDOW_MS = 400;
const DEVTOOLS_INTERVAL_MS = 7000;
const SHORTCUT_COOLDOWN_MS = 1200;

interface BackendViolationOptions {
  invalidated?: boolean;
  strikes?: number;
}

export function useProctor(examId: number, onLimitReach?: () => void) {
  const [warning, setWarning] = useState<string | null>(null);
  const [strikes, setStrikes] = useState(0);

  const strikesRef = useRef(0);
  const lastBlurAtRef = useRef(0);
  const lastTabSwitchAtRef = useRef(0);
  const lastDevtoolsAtRef = useRef(0);
  const lastShortcutAtRef = useRef<Record<"copy" | "paste" | "devtools", number>>({
    copy: 0,
    paste: 0,
    devtools: 0,
  });
  const isPageHiddenRef = useRef(false);

  const applyWarning = useCallback((message: string) => {
    setWarning(message);
    setTimeout(() => setWarning(null), 3000);
  }, []);

  useEffect(() => {
    strikesRef.current = strikes;
  }, [strikes]);

  const increaseLocalStrikes = useCallback(() => {
    const nextStrikes = Math.min(strikesRef.current + 1, MAX_STRIKES);
    strikesRef.current = nextStrikes;
    setStrikes(nextStrikes);

    if (nextStrikes >= MAX_STRIKES) {
      onLimitReach?.();
    }
  }, [onLimitReach]);

  const syncBackendStrikes = useCallback(
    (nextStrikes: number, invalidated = false) => {
      strikesRef.current = nextStrikes;
      setStrikes(nextStrikes);

      if (invalidated || nextStrikes >= MAX_STRIKES) {
        onLimitReach?.();
      }
    },
    [onLimitReach],
  );

  const reportViolation = useCallback(
    async (type: ProctorType, message: string) => {
      applyWarning(message);

      if (!examId) {
        increaseLocalStrikes();
        return;
      }

      const response = await reportProctorEvent({
        exam_id: examId,
        type,
      });

      if (!response || typeof response.strikes !== "number") {
        increaseLocalStrikes();
        return;
      }

      syncBackendStrikes(response.strikes, response.invalidated);
    },
    [applyWarning, examId, increaseLocalStrikes, syncBackendStrikes],
  );

  const reportBackendViolation = useCallback(
    (
      _type: ProctorType,
      message: string,
      options: BackendViolationOptions = {},
    ) => {
      applyWarning(message);

      if (typeof options.strikes === "number") {
        syncBackendStrikes(options.strikes, options.invalidated);
        return;
      }

      if (options.invalidated) {
        onLimitReach?.();
      }
    },
    [applyWarning, onLimitReach, syncBackendStrikes],
  );

  useEffect(() => {
    const shouldHandleShortcut = (type: "copy" | "paste" | "devtools") => {
      const now = Date.now();

      if (now - lastShortcutAtRef.current[type] < SHORTCUT_COOLDOWN_MS) {
        return false;
      }

      lastShortcutAtRef.current[type] = now;
      return true;
    };

    const handleVisibility = () => {
      const now = Date.now();
      isPageHiddenRef.current = document.hidden;

      if (document.hidden) {
        lastTabSwitchAtRef.current = now;
        void reportViolation("tab_switch", "Do not switch tabs during the exam.");
      }
    };

    const handleBlur = () => {
      const now = Date.now();
      const tabSwitchWasJustRecorded =
        now - lastTabSwitchAtRef.current <= DEDUPE_WINDOW_MS;
      const blurWasJustRecorded = now - lastBlurAtRef.current <= DEDUPE_WINDOW_MS;

      if (
        isPageHiddenRef.current ||
        document.hidden ||
        tabSwitchWasJustRecorded ||
        blurWasJustRecorded
      ) {
        return;
      }

      lastBlurAtRef.current = now;
      void reportViolation("blur", "Stay focused on the exam page.");
    };

    const handleCopy = (event: ClipboardEvent) => {
      event.preventDefault();

      if (!shouldHandleShortcut("copy")) {
        return;
      }

      void reportViolation("copy", "Copy is not allowed during the exam.");
    };

    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();

      if (!shouldHandleShortcut("paste")) {
        return;
      }

      void reportViolation("paste", "Paste is not allowed during the exam.");
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const usesPrimaryModifier = event.ctrlKey || event.metaKey;
      const usesShiftPaste = event.shiftKey && key === "insert";
      const usesCtrlInsertCopy = event.ctrlKey && key === "insert";
      const requestsCopy = (usesPrimaryModifier && key === "c") || usesCtrlInsertCopy;
      const requestsPaste = (usesPrimaryModifier && key === "v") || usesShiftPaste;
      const requestsDevtools =
        key === "f12" ||
        (usesPrimaryModifier && event.shiftKey && ["i", "j", "c"].includes(key));

      if (requestsCopy) {
        event.preventDefault();

        if (shouldHandleShortcut("copy")) {
          void reportViolation("copy", "Copy is not allowed during the exam.");
        }

        return;
      }

      if (requestsPaste) {
        event.preventDefault();

        if (shouldHandleShortcut("paste")) {
          void reportViolation("paste", "Paste is not allowed during the exam.");
        }

        return;
      }

      if (requestsDevtools) {
        event.preventDefault();

        if (shouldHandleShortcut("devtools")) {
          lastDevtoolsAtRef.current = Date.now();
          void reportViolation("devtools", "DevTools detected.");
        }
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();

      if (!shouldHandleShortcut("devtools")) {
        return;
      }

      void reportViolation("devtools", "Inspect is not allowed during the exam.");
    };

    const detectDevtools = () => {
      const now = Date.now();
      const devtoolsOpen =
        window.outerWidth - window.innerWidth > 150 ||
        window.outerHeight - window.innerHeight > 150;

      if (!devtoolsOpen) {
        return;
      }

      if (now - lastDevtoolsAtRef.current < DEVTOOLS_INTERVAL_MS) {
        return;
      }

      lastDevtoolsAtRef.current = now;
      void reportViolation("devtools", "DevTools detected.");
    };

    isPageHiddenRef.current = document.hidden;

    const interval = setInterval(detectDevtools, DEVTOOLS_INTERVAL_MS);

    window.addEventListener("blur", handleBlur);
    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("copy", handleCopy, true);
    document.addEventListener("paste", handlePaste, true);

    return () => {
      clearInterval(interval);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("copy", handleCopy, true);
      document.removeEventListener("paste", handlePaste, true);
    };
  }, [reportViolation]);

  return {
    warning,
    strikes,
    maxStrikes: MAX_STRIKES,
    reportViolation,
    reportBackendViolation,
    syncBackendStrikes,
  };
}