// "use client";

// import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
// import { Camera, Eye, Grip, ShieldCheck } from "lucide-react";
// import Webcam from "react-webcam";
// import { sendVisionFrame, type VisionCheckResponse } from "../_actions/vision-action";

// const FRAME_INTERVAL_MS = 100000;
// const MOBILE_BREAKPOINT = 640;
// const MOBILE_TOP_OFFSET = 92;
// const SCREEN_PADDING = 16;

// type Position = {
//   x: number;
//   y: number;
// };

// type DragState = {
//   pointerId: number;
//   offsetX: number;
//   offsetY: number;
// };

// interface CameraMonitorProps {
//   examId: number;
//   currentStrikes: number;
//   maxStrikes: number;
//   onPauseVisionMonitor: () => void;
//   onVisionStrike: (
//     message: string,
//     options?: {
//       invalidated?: boolean;
//       strikes?: number;
//     },
//   ) => void;
// }

// export default function CameraMonitor({
//   examId,
//   currentStrikes,
//   maxStrikes,
//   onPauseVisionMonitor,
//   onVisionStrike,
// }: CameraMonitorProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const webcamRef = useRef<Webcam>(null);
//   const dragStateRef = useRef<DragState | null>(null);
//   const currentStrikesRef = useRef(currentStrikes);
//   const requestInFlightRef = useRef(false);
//   const hasConsumedVisionStrikeRef = useRef(false);
//   const onVisionStrikeRef = useRef(onVisionStrike);
//   const onPauseVisionMonitorRef = useRef(onPauseVisionMonitor);
//   const [position, setPosition] = useState<Position | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const clampToViewport = useCallback((x: number, y: number) => {
//     const container = containerRef.current;

//     if (!container || typeof window === "undefined") {
//       return { x, y };
//     }

//     const rect = container.getBoundingClientRect();
//     const maxX = Math.max(SCREEN_PADDING, window.innerWidth - rect.width - SCREEN_PADDING);
//     const maxY = Math.max(SCREEN_PADDING, window.innerHeight - rect.height - SCREEN_PADDING);

//     return {
//       x: Math.min(Math.max(SCREEN_PADDING, x), maxX),
//       y: Math.min(Math.max(SCREEN_PADDING, y), maxY),
//     };
//   }, []);

//   const setDefaultPosition = useCallback(() => {
//     const container = containerRef.current;

//     if (!container || typeof window === "undefined") {
//       return;
//     }

//     const rect = container.getBoundingClientRect();
//     const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;
//     const nextX = window.innerWidth - rect.width - SCREEN_PADDING;
//     const nextY = isMobileViewport
//       ? MOBILE_TOP_OFFSET
//       : window.innerHeight - rect.height - SCREEN_PADDING;

//     setPosition(clampToViewport(nextX, nextY));
//   }, [clampToViewport]);

//   const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
//     if (event.button !== 0 && event.pointerType !== "touch") {
//       return;
//     }

//     const container = containerRef.current;

//     if (!container) {
//       return;
//     }

//     const rect = container.getBoundingClientRect();

//     dragStateRef.current = {
//       pointerId: event.pointerId,
//       offsetX: event.clientX - rect.left,
//       offsetY: event.clientY - rect.top,
//     };

//     setIsDragging(true);
//     setPosition((prev) => prev ?? clampToViewport(rect.left, rect.top));
//   };

//   useEffect(() => {
//     onVisionStrikeRef.current = onVisionStrike;
//   }, [onVisionStrike]);

//   useEffect(() => {
//     onPauseVisionMonitorRef.current = onPauseVisionMonitor;
//   }, [onPauseVisionMonitor]);

//   useEffect(() => {
//     currentStrikesRef.current = currentStrikes;
//   }, [currentStrikes]);

//   useEffect(() => {
//     hasConsumedVisionStrikeRef.current = false;
//     requestInFlightRef.current = false;
//   }, [examId]);

//   const pauseVisionMonitor = useCallback(() => {
//     hasConsumedVisionStrikeRef.current = true;
//     requestInFlightRef.current = false;

//     if (typeof onPauseVisionMonitorRef.current === "function") {
//       onPauseVisionMonitorRef.current();
//     }
//   }, []);

//   useEffect(() => {
//     if (currentStrikes < maxStrikes) {
//       return;
//     }

//     pauseVisionMonitor();
//   }, [currentStrikes, maxStrikes, pauseVisionMonitor]);

//   useEffect(() => {
//     if (typeof window === "undefined") {
//       return;
//     }

//     const rafId = window.requestAnimationFrame(setDefaultPosition);

//     const handleResize = () => {
//       setPosition((prev) => {
//         if (!prev) {
//           setDefaultPosition();
//           return prev;
//         }

//         return clampToViewport(prev.x, prev.y);
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.cancelAnimationFrame(rafId);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [clampToViewport, setDefaultPosition]);

//   useEffect(() => {
//     const handlePointerMove = (event: PointerEvent) => {
//       const dragState = dragStateRef.current;

//       if (!dragState) {
//         return;
//       }

//       event.preventDefault();

//       const nextX = event.clientX - dragState.offsetX;
//       const nextY = event.clientY - dragState.offsetY;
//       setPosition(clampToViewport(nextX, nextY));
//     };

//     const handlePointerUp = (event: PointerEvent) => {
//       if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
//         return;
//       }

//       dragStateRef.current = null;
//       setIsDragging(false);
//     };

//     window.addEventListener("pointermove", handlePointerMove, { passive: false });
//     window.addEventListener("pointerup", handlePointerUp);
//     window.addEventListener("pointercancel", handlePointerUp);

//     return () => {
//       window.removeEventListener("pointermove", handlePointerMove);
//       window.removeEventListener("pointerup", handlePointerUp);
//       window.removeEventListener("pointercancel", handlePointerUp);
//     };
//   }, [clampToViewport]);

//   useEffect(() => {
//     const handleVisionResponse = (response: VisionCheckResponse | null) => {
//       requestInFlightRef.current = false;

//       if (!response) {
//         return;
//       }

//       const hasVisionStrike =
//         typeof response.strikes === "number" && response.strikes > 0;
//       const isInactive =
//         response.inactive === true || response.error?.toLowerCase().includes("inactive") === true;

//       if (hasVisionStrike) {
//         if (typeof onVisionStrikeRef.current === "function") {
//           onVisionStrikeRef.current("Keep your eyes on the screen.", {
//             invalidated: response.invalidated,
//             strikes: response.strikes,
//           });
//         }

//         pauseVisionMonitor();
//         return;
//       }

//       if (response.invalidated || isInactive) {
//         if (typeof onVisionStrikeRef.current === "function") {
//           onVisionStrikeRef.current(
//             isInactive
//               ? "This exam session is no longer active."
//               : "Vision monitoring invalidated this exam session.",
//             {
//               invalidated: response.invalidated || isInactive,
//               strikes: response.strikes,
//             },
//           );
//         }

//         pauseVisionMonitor();
//         return;
//       }

//       if (!response.ok) {
//         return;
//       }

//       if (currentStrikesRef.current >= maxStrikes) {
//         pauseVisionMonitor();
//         return;
//       }
//     };

//     const interval = setInterval(async () => {
//       if (
//         typeof document !== "undefined" &&
//         (document.hidden ||
//           hasConsumedVisionStrikeRef.current ||
//           requestInFlightRef.current)
//         ) {
//         return;
//       }

//       if (currentStrikesRef.current >= maxStrikes) {
//         pauseVisionMonitor();
//         return;
//       }

//       const image = webcamRef.current?.getScreenshot();

//       if (!image) {
//         return;
//       }

//       requestInFlightRef.current = true;

//       const response = await sendVisionFrame({
//         exam_id: examId,
//         image,
//       });

//       if (typeof response?.strikes === "number") {
//         console.log("[vision] backend strikes:", response.strikes);
//       }

//       handleVisionResponse(response);
//     }, FRAME_INTERVAL_MS);

//     return () => {
//       clearInterval(interval);
//       requestInFlightRef.current = false;
//     };
//   }, [examId, maxStrikes, pauseVisionMonitor]);

//   return (
//     <div
//       ref={containerRef}
//       style={
//         position
//           ? { left: position.x, top: position.y }
//           : { left: SCREEN_PADDING, top: MOBILE_TOP_OFFSET }
//       }
//       className={`fixed z-40 w-[180px] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md transition-[box-shadow,opacity] sm:w-[280px] sm:rounded-[28px] sm:p-3 ${
//         position ? "opacity-100" : "opacity-0"
//       } ${isDragging ? "shadow-blue-200/80" : ""}`}
//     >
//       <div
//         onPointerDown={handlePointerDown}
//         className={`mb-2 flex touch-none items-start justify-between gap-2 rounded-2xl bg-slate-50/90 px-2 py-2 sm:mb-3 sm:gap-3 sm:px-3 ${
//           isDragging ? "cursor-grabbing" : "cursor-grab"
//         }`}
//       >
//         <div className="flex items-center gap-2.5">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 sm:h-11 sm:w-11 sm:rounded-2xl">
//             <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
//           </div>

//           <div>
//             <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">
//               Live Proctoring
//             </p>
//             <h3 className="text-xs font-semibold text-slate-900 sm:text-sm">Camera Monitor</h3>
//           </div>
//         </div>

//         <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 shadow-sm sm:text-[11px]">
//           <Grip className="h-3.5 w-3.5" />
//           <span className="hidden sm:inline">Drag</span>
//         </div>
//       </div>

//       <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
//         <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
//           <Eye className="h-3.5 w-3.5 text-blue-600" />
//           Eye contact tracking
//         </div>

//         <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600 sm:gap-2 sm:px-2.5 sm:text-[11px]">
//           <span className="h-2 w-2 rounded-full bg-emerald-500" />
//           <span>Live</span>
//         </div>
//       </div>

//       <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-inner sm:rounded-[22px]">
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           mirrored
//           screenshotFormat="image/png"
//           className="aspect-video w-full object-cover"
//         />

//         <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 sm:rounded-[22px]" />
//       </div>

//       <div className="mt-2 hidden items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 sm:flex">
//         <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
//           <ShieldCheck className="h-4.5 w-4.5" />
//         </div>

//         <div>
//           <p className="text-xs font-semibold text-slate-700">Auto monitoring enabled</p>
//           <p className="text-[11px] text-slate-500">
//             Drag the card anywhere while frames keep scanning every 15 seconds.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { Camera, Eye, Grip, ShieldCheck } from "lucide-react";
import Webcam from "react-webcam";
import { sendVisionFrame, type VisionCheckResponse } from "../_actions/vision-action";

const FRAME_INTERVAL_MS = 120000;
const MOBILE_BREAKPOINT = 640;
const MOBILE_TOP_OFFSET = 92;
const SCREEN_PADDING = 16;

type Position = {
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  offsetX: number;
  offsetY: number;
};

interface CameraMonitorProps {
  examId: number;
  currentStrikes: number;
  maxStrikes: number;
  onPauseVisionMonitor: () => void;
  onVisionStrike: (
    message: string,
    options?: {
      invalidated?: boolean;
      strikes?: number;
    },
  ) => void;
}

export default function CameraMonitor({
  examId,
  currentStrikes,
  maxStrikes,
  onPauseVisionMonitor,
  onVisionStrike,
}: CameraMonitorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const currentStrikesRef = useRef(currentStrikes);
  const requestInFlightRef = useRef(false);
  const onVisionStrikeRef = useRef(onVisionStrike);
  const onPauseVisionMonitorRef = useRef(onPauseVisionMonitor);
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const clampToViewport = useCallback((x: number, y: number) => {
    const container = containerRef.current;

    if (!container || typeof window === "undefined") {
      return { x, y };
    }

    const rect = container.getBoundingClientRect();
    const maxX = Math.max(SCREEN_PADDING, window.innerWidth - rect.width - SCREEN_PADDING);
    const maxY = Math.max(SCREEN_PADDING, window.innerHeight - rect.height - SCREEN_PADDING);

    return {
      x: Math.min(Math.max(SCREEN_PADDING, x), maxX),
      y: Math.min(Math.max(SCREEN_PADDING, y), maxY),
    };
  }, []);

  const setDefaultPosition = useCallback(() => {
    const container = containerRef.current;

    if (!container || typeof window === "undefined") {
      return;
    }

    const rect = container.getBoundingClientRect();
    const isMobileViewport = window.innerWidth < MOBILE_BREAKPOINT;
    const nextX = window.innerWidth - rect.width - SCREEN_PADDING;
    const nextY = isMobileViewport
      ? MOBILE_TOP_OFFSET
      : window.innerHeight - rect.height - SCREEN_PADDING;

    setPosition(clampToViewport(nextX, nextY));
  }, [clampToViewport]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType !== "touch") {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const rect = container.getBoundingClientRect();

    dragStateRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };

    setIsDragging(true);
    setPosition((prev) => prev ?? clampToViewport(rect.left, rect.top));
  };

  useEffect(() => {
    onVisionStrikeRef.current = onVisionStrike;
  }, [onVisionStrike]);

  useEffect(() => {
    onPauseVisionMonitorRef.current = onPauseVisionMonitor;
  }, [onPauseVisionMonitor]);

  useEffect(() => {
    currentStrikesRef.current = currentStrikes;
  }, [currentStrikes]);

  useEffect(() => {
    requestInFlightRef.current = false;
  }, [examId]);

  const pauseVisionMonitor = useCallback(() => {
    requestInFlightRef.current = false;

    if (typeof onPauseVisionMonitorRef.current === "function") {
      onPauseVisionMonitorRef.current();
    }
  }, []);

  useEffect(() => {
    if (currentStrikes < maxStrikes) {
      return;
    }

    pauseVisionMonitor();
  }, [currentStrikes, maxStrikes, pauseVisionMonitor]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const rafId = window.requestAnimationFrame(setDefaultPosition);

    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) {
          setDefaultPosition();
          return prev;
        }

        return clampToViewport(prev.x, prev.y);
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, [clampToViewport, setDefaultPosition]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;

      if (!dragState) {
        return;
      }

      event.preventDefault();

      const nextX = event.clientX - dragState.offsetX;
      const nextY = event.clientY - dragState.offsetY;
      setPosition(clampToViewport(nextX, nextY));
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (!dragStateRef.current || dragStateRef.current.pointerId !== event.pointerId) {
        return;
      }

      dragStateRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [clampToViewport]);

  useEffect(() => {
    const handleVisionResponse = (response: VisionCheckResponse | null) => {
      requestInFlightRef.current = false;

      if (!response) {
        return;
      }

      const isInactive =
        response.inactive === true ||
        response.error?.toLowerCase().includes("inactive") === true;

      const eyeAway = response.result?.eye_contact === false;

      if (eyeAway) {
        if (typeof onVisionStrikeRef.current === "function") {
          onVisionStrikeRef.current("Keep your eyes on the screen.", {
            invalidated: response.invalidated,
            strikes: response.strikes,
          });
        }

        return;
      }

      if (response.invalidated || isInactive) {
        if (typeof onVisionStrikeRef.current === "function") {
          onVisionStrikeRef.current(
            isInactive
              ? "This exam session is no longer active."
              : "Vision monitoring invalidated this exam session.",
            {
              invalidated: response.invalidated || isInactive,
              strikes: response.strikes,
            },
          );
        }

        pauseVisionMonitor();
        return;
      }

      if (!response.ok) {
        return;
      }

      if (currentStrikesRef.current >= maxStrikes) {
        pauseVisionMonitor();
      }
    };

    const interval = setInterval(async () => {
      if (
        typeof document !== "undefined" &&
        (document.hidden || requestInFlightRef.current)
      ) {
        return;
      }

      if (currentStrikesRef.current >= maxStrikes) {
        pauseVisionMonitor();
        return;
      }

      const image = webcamRef.current?.getScreenshot();

      if (!image) {
        return;
      }

      requestInFlightRef.current = true;

      const response = await sendVisionFrame({
        exam_id: examId,
        image,
      });

      if (typeof response?.strikes === "number") {
        console.log("[vision] backend strikes:", response.strikes);
      }

      handleVisionResponse(response);
    }, FRAME_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      requestInFlightRef.current = false;
    };
  }, [examId, maxStrikes, pauseVisionMonitor]);

  return (
    <div
      ref={containerRef}
      style={
        position
          ? { left: position.x, top: position.y }
          : { left: SCREEN_PADDING, top: MOBILE_TOP_OFFSET }
      }
      className={`fixed z-40 w-[180px] overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md transition-[box-shadow,opacity] sm:w-[280px] sm:rounded-[28px] sm:p-3 ${
        position ? "opacity-100" : "opacity-0"
      } ${isDragging ? "shadow-blue-200/80" : ""}`}
    >
      <div
        onPointerDown={handlePointerDown}
        className={`mb-2 flex touch-none items-start justify-between gap-2 rounded-2xl bg-slate-50/90 px-2 py-2 sm:mb-3 sm:gap-3 sm:px-3 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 sm:h-11 sm:w-11 sm:rounded-2xl">
            <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-[11px]">
              Live Proctoring
            </p>
            <h3 className="text-xs font-semibold text-slate-900 sm:text-sm">Camera Monitor</h3>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 shadow-sm sm:text-[11px]">
          <Grip className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Drag</span>
        </div>
      </div>

      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 sm:text-xs">
          <Eye className="h-3.5 w-3.5 text-blue-600" />
          Eye contact tracking
        </div>

        <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600 sm:gap-2 sm:px-2.5 sm:text-[11px]">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Live</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-inner sm:rounded-[22px]">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored
          screenshotFormat="image/png"
          className="aspect-video w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 sm:rounded-[22px]" />
      </div>

      <div className="mt-2 hidden items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2.5 sm:flex">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <ShieldCheck className="h-4.5 w-4.5" />
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-700">Auto monitoring enabled</p>
          <p className="text-[11px] text-slate-500">
            Drag the card anywhere while frames keep scanning every 15 seconds.
          </p>
        </div>
      </div>
    </div>
  );
}