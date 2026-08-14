"use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import {
//   Video,
//   VideoOff,
//   Mic,
//   MicOff,
//   Monitor,
//   AlertTriangle,
//   ChevronRight,
// } from "lucide-react";

// export default function ExamCameraSetup() {
//   const [camOn, setCamOn] = useState(false);
//   const [micOn, setMicOn] = useState(false);
//   const [screenOn, setScreenOn] = useState(false);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const allGranted = camOn && micOn;

//   const toggleCam = async () => {
//     if (camOn) {
//       stream?.getTracks().forEach((t) => t.stop());
//       setStream(null);
//       setCamOn(false);
//     } else {
//       try {
//         const s = await navigator.mediaDevices.getUserMedia({ video: true });
//         setStream(s);
//         setCamOn(true);
//       } catch {
//         alert("Could not access camera. Please allow permission.");
//       }
//     }
//   };

//   const toggleMic = async () => {
//     if (micOn) {
//       setMicOn(false);
//     } else {
//       try {
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//         setMicOn(true);
//       } catch {
//         alert("Could not access microphone. Please allow permission.");
//       }
//     }
//   };

//   const toggleScreen = async () => {
//     if (screenOn) {
//       setScreenOn(false);
//     } else {
//       try {
//         await navigator.mediaDevices.getDisplayMedia({ video: true });
//         setScreenOn(true);
//       } catch {
//         alert("Could not access screen. Please allow permission.");
//       }
//     }
//   };

//   useEffect(() => {
//     if (videoRef.current && stream) videoRef.current.srcObject = stream;
//   }, [stream]);

//   useEffect(() => () => stream?.getTracks().forEach((t) => t.stop()), [stream]);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md space-y-3">

//         {/* Main card */}
//         <Card className="rounded-2xl shadow-sm border border-gray-200">
//           <CardHeader className="pb-3 border-b border-gray-100">
//             <CardTitle className="text-xl font-bold text-gray-900">
//               Allow Camera, Mic, Screen Access
//             </CardTitle>
//             <CardDescription className="text-sm text-gray-500 mt-1">
//               To ensure exam security, we need to access camera, microphone and
//               screen please allow permissions when prompted.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="pt-4 space-y-4">
//             {/* Camera preview box */}
//             <div className="relative bg-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
//               {camOn && stream ? (
//                 <video
//                   ref={videoRef}
//                   autoPlay
//                   muted
//                   playsInline
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 /* Silhouette avatar — matches screenshot exactly */
//                 <svg
//                   viewBox="0 0 120 120"
//                   className="w-32 h-32 text-gray-400"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle cx="60" cy="42" r="22" stroke="currentColor" strokeWidth="5" />
//                   <path
//                     d="M16 108 C16 82 104 82 104 108"
//                     stroke="currentColor"
//                     strokeWidth="5"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               )}

//               {/* Bottom control bar */}
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
//                 {/* Screen share button */}
//                 <button
//                   onClick={toggleScreen}
//                   className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
//                     screenOn
//                       ? "bg-white border-gray-300 text-gray-700"
//                       : "bg-white/90 border-gray-300 text-gray-500 hover:bg-white"
//                   }`}
//                 >
//                   <Monitor className="w-5 h-5" />
//                 </button>

//                 {/* Camera toggle — red when off (matches screenshot) */}
//                 <button
//                   onClick={toggleCam}
//                   className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
//                     camOn
//                       ? "bg-white border-gray-300 text-gray-700"
//                       : "bg-red-400 border-red-400 text-white hover:bg-red-500"
//                   }`}
//                 >
//                   {camOn ? (
//                     <Video className="w-5 h-5" />
//                   ) : (
//                     <VideoOff className="w-5 h-5" />
//                   )}
//                 </button>

//                 {/* Mic toggle */}
//                 <button
//                   onClick={toggleMic}
//                   className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
//                     micOn
//                       ? "bg-white border-gray-300 text-gray-700"
//                       : "bg-white/90 border-gray-300 text-gray-500 hover:bg-white"
//                   }`}
//                 >
//                   {micOn ? (
//                     <Mic className="w-5 h-5" />
//                   ) : (
//                     <MicOff className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Start Exam button — gray/disabled until permissions granted */}
//             <Button
//               disabled={!allGranted}
//               className={`w-full h-12 text-base font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
//                 allGranted
//                   ? "bg-gray-800 hover:bg-gray-900 text-white"
//                   : "bg-gray-300 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Start Exam
//               <ChevronRight className="w-5 h-5" />
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Warning banner below card — matches screenshot */}
//         {!allGranted && (
//           <Alert className="rounded-2xl border border-gray-200 bg-white shadow-sm py-3 px-4">
//             <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
//             <AlertDescription className="text-sm text-gray-700 font-medium ml-1">
//               You cannot continue unless permissions are granted.
//             </AlertDescription>
//           </Alert>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useState, useRef } from "react";
// import Webcam from "react-webcam";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Video, VideoOff, Mic, MicOff, Monitor, AlertTriangle, ChevronRight } from "lucide-react";

// export default function ExamCameraSetup() {
//   const webcamRef = useRef<Webcam>(null);

//   const [camOn, setCamOn] = useState(false);
//   const [micOn, setMicOn] = useState(false);
//   const [screenOn, setScreenOn] = useState(false);

//   const allGranted = camOn && micOn;

//   // ── react-webcam callbacks ─────────────────────────────────────────────────
//   const onUserMedia = () => setCamOn(true);
//   const onUserMediaError = () => {
//     setCamOn(false);
//     alert("Camera access denied. Please allow permission in your browser.");
//   };

//   const toggleCam = () => setCamOn((prev) => !prev);

//   const toggleMic = async () => {
//     if (micOn) {
//       setMicOn(false);
//       return;
//     }
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//       setMicOn(true);
//     } catch {
//       alert("Microphone access denied.");
//     }
//   };

//   const toggleScreen = async () => {
//     if (screenOn) {
//       setScreenOn(false);
//       return;
//     }
//     try {
//       await navigator.mediaDevices.getDisplayMedia({ video: true });
//       setScreenOn(true);
//     } catch {
//       /* user cancelled */
//     }
//   };

//   // ── Called on "Start Exam" — grab an initial frame ────────────────────────
//   const handleStart = () => {
//     const frame = webcamRef.current?.getScreenshot(); // → base64 JPEG, ready for /exams/vision-check
//     console.log("Initial frame:", frame);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl flex flex-col gap-3">
//         {/* ── Main card ──────────────────────────────────────────────────── */}
//         <Card className="rounded-2xl shadow-sm border border-gray-200">
//           <CardHeader className="pb-3 border-b border-gray-100">
//             <CardTitle className="text-xl font-bold text-gray-900">
//               Allow Camera, Mic, Screen Access
//             </CardTitle>
//             <CardDescription className="text-sm text-gray-500 mt-1">
//               To ensure exam security, we need to access camera, microphone and screen — please
//               allow permissions when prompted.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="pt-4 space-y-4">
//             {/* ── Camera preview ───────────────────────────────────────── */}
//             <div className="relative bg-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
//               {camOn ? (
//                 <Webcam
//                   ref={webcamRef}
//                   audio={micOn}
//                   screenshotFormat="image/jpeg"
//                   screenshotQuality={0.8}
//                   onUserMedia={onUserMedia}
//                   onUserMediaError={onUserMediaError}
//                   videoConstraints={{ facingMode: "user", width: 1280, height: 720 }}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <svg width="130" height="130" viewBox="0 0 120 120" fill="none">
//                   <circle cx="60" cy="42" r="22" stroke="#9ca3af" strokeWidth="5" />
//                   <path
//                     d="M16 108 C16 82 104 82 104 108"
//                     stroke="#9ca3af"
//                     strokeWidth="5"
//                     strokeLinecap="round"
//                   />
//                 </svg>
//               )}

//               {/* ── Control buttons ───────────────────────────────────── */}
//               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
//                 <button
//                   onClick={toggleScreen}
//                   className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
//                     ${
//                       screenOn
//                         ? "bg-white border-gray-300 text-gray-700"
//                         : "bg-white/90 border-gray-300 text-gray-500 hover:bg-white"
//                     }`}
//                 >
//                   <Monitor className="w-5 h-5" />
//                 </button>

//                 <button
//                   onClick={toggleCam}
//                   className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
//                     ${
//                       camOn
//                         ? "bg-white border-gray-300 text-gray-700"
//                         : "bg-red-400 border-red-400 text-white hover:bg-red-500"
//                     }`}
//                 >
//                   {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
//                 </button>

//                 <button
//                   onClick={toggleMic}
//                   className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
//                     ${
//                       micOn
//                         ? "bg-white border-gray-300 text-gray-700"
//                         : "bg-white/90 border-gray-300 text-gray-500 hover:bg-white"
//                     }`}
//                 >
//                   {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* ── Start Exam button ─────────────────────────────────────── */}
//             <Button
//               disabled={!allGranted}
//               onClick={handleStart}
//               className={`w-full h-12 text-base font-semibold rounded-xl gap-2
//                 ${
//                   allGranted
//                     ? "bg-gray-800 hover:bg-gray-900 text-white"
//                     : "bg-gray-300 text-gray-400 cursor-not-allowed"
//                 }`}
//             >
//               Start Exam
//               <ChevronRight className="w-5 h-5" />
//             </Button>
//           </CardContent>
//         </Card>

//         {/* ── Warning banner ──────────────────────────────────────────────── */}
//         {!allGranted && (
//           <Alert className="rounded-2xl border border-gray-200 bg-white shadow-sm">
//             <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
//             <AlertDescription className="text-sm text-gray-700 font-medium">
//               You cannot continue unless permissions are granted.
//             </AlertDescription>
//           </Alert>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, Monitor, AlertTriangle, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function ExamCameraSetup() {
  const [camOn, setCamOn] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [screenOn, setScreenOn] = useState(false);

  const allGranted = camOn && micOn;

  const onUserMedia = () => setCamOn(true);
  const onUserMediaError = () => {
    setCamOn(false);
    alert("Camera access denied. Please allow permission in your browser.");
  };

  const toggleCam = () => setCamOn((prev) => !prev);

  const toggleMic = async () => {
    if (micOn) {
      setMicOn(false);
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicOn(true);
    } catch {
      alert("Microphone access denied.");
    }
  };

  const toggleScreen = async () => {
    if (screenOn) {
      setScreenOn(false);
      return;
    }
    try {
      await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenOn(true);
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full  sm:max-w-md  md:max-w-2xl xl:max-w-3xl flex flex-col gap-3">
        <Card className="rounded-2xl shadow-sm border border-gray-200">
          <CardHeader className="pb-3 border-b border-gray-100 px-4 sm:px-6 pt-4 sm:pt-6">
            <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">
              Allow Camera, Mic, Screen Access
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-gray-500 mt-1">
              To ensure exam security, we need to access camera, microphone and screen — please
              allow permissions when prompted.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
            {/* Camera preview */}
            <div className="relative bg-gray-200 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              {camOn ? (
                <Webcam
                  audio={micOn}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={0.8}
                  onUserMedia={onUserMedia}
                  onUserMediaError={onUserMediaError}
                  videoConstraints={{ facingMode: "user", width: 1280, height: 720 }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-20 h-20 sm:w-32 sm:h-32" viewBox="0 0 120 120" fill="none">
                  <circle cx="60" cy="42" r="22" stroke="#9ca3af" strokeWidth="5" />
                  <path
                    d="M16 108 C16 82 104 82 104 108"
                    stroke="#9ca3af"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              )}

              {/* Control buttons */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                <button
                  onClick={toggleScreen}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all
                    ${screenOn ? "bg-white border-gray-300 text-gray-700" : "bg-white/90 border-gray-300 text-gray-500 hover:bg-white"}`}
                >
                  <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={toggleCam}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all
                    ${camOn ? "bg-white border-gray-300 text-gray-700" : "bg-red-400 border-red-400 text-white hover:bg-red-500"}`}
                >
                  {camOn ? (
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <VideoOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                <button
                  onClick={toggleMic}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all
                    ${micOn ? "bg-white border-gray-300 text-gray-700" : "bg-white/90 border-gray-300 text-gray-500 hover:bg-white"}`}
                >
                  {micOn ? (
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Start Exam button */}
            <Button
              asChild
              disabled={!allGranted}
              className={`w-full h-11 sm:h-12 text-sm sm:text-base font-semibold rounded-xl gap-2 transition-all
    ${
      allGranted
        ? "bg-gray-800 hover:bg-gray-900 text-white"
        : "bg-gray-300 text-gray-400 cursor-not-allowed pointer-events-none"
    }`}
            >
              <Link
                href={allGranted ? "/assesment-first" : "#"}
                className="flex items-center justify-center gap-2 w-full"
              >
                Start Exam
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Warning banner */}
        {!allGranted && (
          <Alert className="rounded-2xl border flex items-center justify-center gap-2 [&>svg]:text-yellow-400 border-gray-200 bg-white shadow-sm px-4 py-3 [&>svg]:static [&>svg]:translate-y-0 [&>svg~*]:pl-0 [&>svg+div]:translate-y-0">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 shrink-0" />
            <AlertDescription className="text-xs sm:text-sm text-gray-700 font-medium">
              You cannot continue unless permissions are granted.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
