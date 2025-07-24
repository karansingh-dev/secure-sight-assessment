import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import TimeLineSvg24Hours from "../custom/time-line-svg";
import {
  formatTime,
  getOffsetPxFromTime,
  getTimeFromLeftPx,
  parseTimeToSeconds,
} from "@/lib/helpers";
import { INCIDENT_TYPE_ICONS } from "./incidents";
import { useState, useRef, useEffect } from "react";
import { Incident } from "@/types/incidents";

type Camera = {
  id: string;
  name: string;
};

type TimelineProps = {
  uniqueCameras: Camera[];
  incidents: Incident[];
  onIncidentSelect: (incident: Incident | null) => void;
};
const INCIDENT_TYPE_COLORS: Record<string, string> = {
  "Unauthorized Access": "bg-[#481607]",
  "Gun Threat": "bg-[#6e0f0f]",
  "Face Recognised": "bg-[#172554]",
};

export default function Timeline({
  uniqueCameras,
  incidents,
  onIncidentSelect,
}: TimelineProps) {
  const [scrubberLeft, setScrubberLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(
    uniqueCameras.length > 0 ? uniqueCameras[0].id : null
  );

  const skipToNextIncident = () => {
    if (!selectedCameraId) return;

    const currentTime = getTimeFromLeftPx(scrubberLeft);
    const currentTimeSeconds = parseTimeToSeconds(currentTime);

    // Get incidents for selected camera, sorted by start time
    const selectedCameraIncidents = incidents
      .filter((incident) => incident.camera.id === selectedCameraId)
      .sort(
        (a, b) =>
          parseTimeToSeconds(formatTime(a.tsStart)) -
          parseTimeToSeconds(formatTime(b.tsStart))
      );

    // Find the next incident after current scrubber position
    const nextIncident = selectedCameraIncidents.find((incident) => {
      const incidentStartSeconds = parseTimeToSeconds(
        formatTime(incident.tsStart)
      );
      return incidentStartSeconds > currentTimeSeconds;
    });

    if (nextIncident) {
      const nextIncidentPosition = getOffsetPxFromTime(nextIncident.tsStart);
      updateScrubberAndIncident(Math.min(nextIncidentPosition, MAX_WIDTH));
    }
  };

  const skipToPreviousIncident = () => {
    if (!selectedCameraId) return;

    const currentTime = getTimeFromLeftPx(scrubberLeft);
    const currentTimeSeconds = parseTimeToSeconds(currentTime);

    // Get incidents for selected camera, sorted by start time (reverse order for previous)
    const selectedCameraIncidents = incidents
      .filter((incident) => incident.camera.id === selectedCameraId)
      .sort(
        (a, b) =>
          parseTimeToSeconds(formatTime(b.tsStart)) -
          parseTimeToSeconds(formatTime(a.tsStart))
      );

    // Find the previous incident before current scrubber position
    const previousIncident = selectedCameraIncidents.find((incident) => {
      const incidentStartSeconds = parseTimeToSeconds(
        formatTime(incident.tsStart)
      );
      return incidentStartSeconds < currentTimeSeconds;
    });

    if (previousIncident) {
      const previousIncidentPosition = getOffsetPxFromTime(
        previousIncident.tsStart
      );
      updateScrubberAndIncident(Math.max(previousIncidentPosition, 0));
    }
  };

  const [pendingIncidentUpdate, setPendingIncidentUpdate] = useState<{
    scrubberPosition: number;
    cameraId: string | null;
  } | null>(null);

  const [currentActiveIncident, setCurrentActiveIncident] =
    useState<Incident | null>(null);

  useEffect(() => {
    if (pendingIncidentUpdate) {
      const { scrubberPosition, cameraId } = pendingIncidentUpdate;

      if (!cameraId) {
        onIncidentSelect(null);
        setCurrentActiveIncident(null);
        setPendingIncidentUpdate(null);
        return;
      }

      const currentTime = getTimeFromLeftPx(scrubberPosition);
      const currentTimeSeconds = parseTimeToSeconds(currentTime);

      const selectedCameraIncidents = incidents.filter(
        (incident) => incident.camera.id === cameraId
      );

      // Check if current active incident is still valid
      if (currentActiveIncident) {
        const activeEndSeconds = parseTimeToSeconds(
          formatTime(currentActiveIncident.tsEnd)
        );

        // Check If current incident is still active , then don't change it
        if (currentTimeSeconds <= activeEndSeconds) {
          setPendingIncidentUpdate(null);
          return;
        }
      }

      // Find new incident only if current one has ended or doesn't exist
      let matchingIncident = null;
      for (const incident of selectedCameraIncidents) {
        const startSeconds = parseTimeToSeconds(formatTime(incident.tsStart));
        const endSeconds = parseTimeToSeconds(formatTime(incident.tsEnd));

        if (
          currentTimeSeconds >= startSeconds &&
          currentTimeSeconds <= endSeconds
        ) {
          matchingIncident = incident;
          break;
        }
      }

      // Update the active incident and  set selectedIncident
      setCurrentActiveIncident(matchingIncident);
      onIncidentSelect(matchingIncident);
      setPendingIncidentUpdate(null);
    }
  }, [
    pendingIncidentUpdate,
    incidents,
    onIncidentSelect,
    currentActiveIncident,
  ]);

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

  const updateScrubberAndIncident = (newLeft: number) => {
    setScrubberLeft(newLeft);
    setPendingIncidentUpdate({
      scrubberPosition: newLeft,
      cameraId: selectedCameraId,
    });
  };

  const handleCameraSelect = (cameraId: string) => {
    setSelectedCameraId(cameraId);
    setCurrentActiveIncident(null);
    setPendingIncidentUpdate({
      scrubberPosition: scrubberLeft,
      cameraId: cameraId,
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setScrubberLeft((prev) => {
          const next = prev + SCRUBBER_SPEED;

          if (next >= MAX_WIDTH) {
            clearInterval(intervalRef.current!);
            setIsPlaying(false);
            return MAX_WIDTH;
          }

          setPendingIncidentUpdate({
            scrubberPosition: next,
            cameraId: selectedCameraId,
          });

          return next;
        });
      }, 50);
    }
  };

  const TIMELINE_OFFSET = 160;
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const SCRUBBER_SPEED = 1;
  const MAX_WIDTH = 2350;

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const timelineRect = timelineRef.current?.getBoundingClientRect();
    if (!timelineRect) return;

    const newLeft = e.clientX - timelineRect.left - TIMELINE_OFFSET;
    const clampedLeft = Math.max(0, Math.min(newLeft, MAX_WIDTH));

    updateScrubberAndIncident(clampedLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!uniqueCameras) return null;

  return (
    <div className="px-[16px] flex flex-col gap-4">
      {/* Controls */}
      <div className="bg-[#131313] rounded-sm p-4 text-white">
        <div className="flex gap-3 items-center">
          {/* Skip to previous incident */}
          <button
            onClick={skipToPreviousIncident}
            className="p-1 hover:bg-[#242424] rounded transition-colors"
            title="Skip to previous incident"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Play/Pause button */}
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

          {/* Skip to next incident */}
          <button
            onClick={skipToNextIncident}
            className="p-1 hover:bg-[#242424] rounded transition-colors"
            title="Skip to next incident"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <span className="ml-4 text-sm text-gray-300">
            {getTimeFromLeftPx(scrubberLeft)}
          </span>
          <span className="ml-4  ">
            {uniqueCameras.find((c) => c.id === selectedCameraId)?.name ||
              "None"}
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

              {uniqueCameras.map((camera) => {
                const cameraIncidents = incidents.filter(
                  (i) => i.camera.id === camera.id
                );
                const isSelected = selectedCameraId === camera.id;

                return (
                  <div
                    key={camera.id}
                    onClick={() => handleCameraSelect(camera.id)}
                    className={`flex rounded p-2 items-center h-15 mt-4 w-[2510px] border-b border-gray-700 cursor-pointer transition-colors
        ${isSelected ? "bg-[#1a1a1a] border-yellow-300" : "hover:bg-[#0d0d0d]"}
      `}
                  >
                    <p
                      className={`w-40 font-medium shrink-0 ${
                        isSelected ? "text-yellow-300" : "text-white"
                      }`}
                    >
                      {camera.name}
                    </p>
                    <div className="relative w-[2600px] h-[30px] overflow-hidden rounded-sm">
                      {cameraIncidents.map((incident: any) => {
                        const left = getOffsetPxFromTime(incident.tsStart);

                        return (
                          <div
                            key={incident.id}
                            className={`absolute flex items-center rounded p-1 ${
                              INCIDENT_TYPE_COLORS[incident.type] ??
                              "bg-[#292929]"
                            } ${isSelected ? "ring-1 ring-yellow-300" : ""}`}
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
