import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import TimeLineSvg24Hours from "../custom/time-line-svg";
import { getOffsetPxFromTime, getTimeFromLeftPx } from "@/lib/helpers";
import { INCIDENT_TYPE_ICONS } from "./incidents";
import { useState, useRef, useEffect } from "react";

type Camera = {
  id: string;
  name: string;
};

type Incident = {
  id: string;
  type: string;
  tsStart: string;
  camera: {
    id: string;
  };
};

type TimelineProps = {
  uniqueCameras: Camera[];
  incidents: Incident[];
};

const INCIDENT_TYPE_COLORS: Record<string, string> = {
  "Unauthorized Access": "bg-[#481607]",
  "Gun Threat": "bg-[#6e0f0f]",
  "Face Recognised": "bg-[#172554]",
};

export default function Timeline({ uniqueCameras, incidents }: TimelineProps) {
  const [scrubberLeft, setScrubberLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      // Play
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setScrubberLeft((prev) => {
          const next = prev + SCRUBBER_SPEED;

          if (next >= MAX_WIDTH) {
            // Stop at end
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            return MAX_WIDTH;
          }

          return next;
        });
      }, 50); // adjust speed as needed
    }
  };

  const TIMELINE_OFFSET = 160;
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const SCRUBBER_SPEED = 2;
  const MAX_WIDTH = 2350 - TIMELINE_OFFSET;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const timelineRect = timelineRef.current?.getBoundingClientRect();
    if (!timelineRect) return;

    const newLeft = e.clientX - timelineRect.left - TIMELINE_OFFSET;

    // Optional: clamp to 0–max range
    const max = timelineRect.width;
    setScrubberLeft(Math.max(0, Math.min(newLeft, max)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  if (!uniqueCameras) return null;

  return (
    <div className="px-[16px] flex flex-col gap-4">
      {/* Controls */}
      <div className="bg-[#131313] rounded-sm p-4 text-white">
        <div className="flex gap-3 items-center">
          <SkipBack className="w-4 h-4" />
          <button
            onClick={togglePlay}
            className="w-6 h-6 rounded-full flex justify-center items-center bg-white"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-black" />
            ) : (
              <Play className="w-4 h-4 text-black" />
            )}
          </button>
          <SkipForward className="w-4 h-4" />
          {/* Show Time */}
          <span className="ml-4 text-sm text-gray-300">
            {getTimeFromLeftPx(scrubberLeft)}
          </span>
        </div>
      </div>

      {/* Main timeline block */}
      <div className="bg-[#131313]  flex flex-col p-4 gap-6 text-white  rounded-md">
        <div className="overflow-x-auto resolve-scrollbar">
          <div className="w-full">
            {/* Timeline header row */}
            <div className="flex items-center mb-4">
              <p className="font-semibold w-40 shrink-0">Camera List</p>
              <div className="">
                <TimeLineSvg24Hours />
              </div>
            </div>

            <div className="flex flex-col relative" ref={timelineRef}>
              {/* scrubber  */}
              <div
                className="absolute top-0 bottom-0 w-[2px] h-55 mt-1 bg-yellow-300 z-50 cursor-ew-resize"
                style={{ left: `${scrubberLeft + TIMELINE_OFFSET}px` }}
                onMouseDown={handleMouseDown}
              >
                <span className="absolute -top-5 -left-5 text-sm text-yellow-300 ">
                  {getTimeFromLeftPx(scrubberLeft)}
                </span>
              </div>
              {/* <div className="flex flex-col"> */}
              {uniqueCameras.map((camera) => {
                const cameraIncidents = incidents.filter(
                  (i) => i.camera.id === camera.id
                );

                return (
                  <div
                    key={camera.id}
                    className="flex  rounded p-2 items-center h-15 mt-4  w-[2500px] border-b border-gray-700"
                  >
                    <p className="w-40 text-white font-medium shrink-0">
                      {camera.name}
                    </p>
                    <div className="relative w-[2600px] h-[30px] overflow-hidden rounded-sm pr-4">
                      {cameraIncidents.map((incident: any) => {
                        const left = getOffsetPxFromTime(incident.tsStart);

                        return (
                          <div
                            key={incident.id}
                            className={`absolute flex items-center  rounded p-1 ${
                              INCIDENT_TYPE_COLORS[incident.type] ??
                              "bg-[#292929]"
                            }`}
                            style={{ left: `${left}px` }}
                          >
                            {
                              INCIDENT_TYPE_ICONS.find(
                                (item) => item.type === incident.type
                              )?.icon
                            }
                            <span className="font-semibold text-white text-[10px]">
                              {incident.type}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
