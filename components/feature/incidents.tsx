"use client";

import LoadingScreen from "@/components/custom/screen-loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatDate2, formatTime } from "@/lib/helpers";
import { Camera, Incident } from "@/types/incidents";
import {
  CalendarDays,
  CheckCheck,
  ChevronRight,
  Disc,
  DoorOpen,
  Plus,
  TriangleAlert,
  UserSearch,
} from "lucide-react";
import { useEffect, useState } from "react";
import Timeline from "./timeline";

export const INCIDENT_TYPE_ICONS = [
  {
    key: "Unauthorized",
    name: "Unauthorized Access",
    type: "Unauthorized Access",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 11 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.333313 2.43333V11.7667C0.333313 11.9435 0.403551 12.113 0.528575 12.2381C0.6536 12.3631 0.823169 12.4333 0.99998 12.4333H2.99998V11.1H1.66665V3.1H2.99998V1.76667H0.99998C0.823169 1.76667 0.6536 1.8369 0.528575 1.96193C0.403551 2.08695 0.333313 2.25652 0.333313 2.43333ZM9.82798 1.78667L4.49465 0.453333C4.39639 0.428827 4.29384 0.427026 4.19479 0.448068C4.09574 0.469109 4.00278 0.51244 3.92297 0.57477C3.84316 0.637101 3.7786 0.716794 3.73418 0.807801C3.68977 0.898807 3.66667 0.998735 3.66665 1.1V13.1C3.66641 13.2014 3.68934 13.3014 3.73367 13.3926C3.77801 13.4837 3.84257 13.5635 3.92245 13.6259C4.00233 13.6883 4.0954 13.7316 4.19457 13.7525C4.29373 13.7734 4.39637 13.7714 4.49465 13.7467L9.82798 12.4133C9.97227 12.3773 10.1004 12.2942 10.1919 12.177C10.2835 12.0598 10.3333 11.9154 10.3333 11.7667V2.43333C10.3333 2.28463 10.2835 2.1402 10.1919 2.02303C10.1004 1.90585 9.97227 1.82265 9.82798 1.78667ZM6.99998 7.22533C6.9923 7.39699 6.91871 7.55906 6.79453 7.67782C6.67034 7.79657 6.50514 7.86284 6.33331 7.86284C6.16149 7.86284 5.99628 7.79657 5.8721 7.67782C5.74792 7.55906 5.67432 7.39699 5.66665 7.22533V6.974C5.66673 6.79719 5.73706 6.62765 5.86214 6.50269C5.98723 6.37773 6.15684 6.30758 6.33365 6.30767C6.51046 6.30775 6.67999 6.37808 6.80495 6.50316C6.92992 6.62825 7.00007 6.79786 6.99998 6.97467V7.22533Z"
          fill="#F97316"
        />
      </svg>
    ),
  },
  {
    key: "GunThreat",
    name: "Gun Threat",
    type: "Gun Threat",
    icon: (
      <svg
        className="w-4 h-4"
        viewBox="0 0 16 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.66668 1.63334H15.3333V4.30001H14.6667V4.96667H10.6667C10.4899 4.96667 10.3203 5.03691 10.1953 5.16194C10.0702 5.28696 10 5.45653 10 5.63334V6.30001C10 6.65363 9.85953 6.99277 9.60948 7.24282C9.35944 7.49287 9.0203 7.63334 8.66668 7.63334H6.41334C6.16001 7.63334 5.92668 7.78001 5.81334 8.00668L4.18001 11.2667C4.06668 11.4933 3.84001 11.6333 3.58668 11.6333H1.33334C1.33334 11.6333 -0.666658 11.6333 2.00001 7.63334C2.00001 7.63334 4.00001 4.96667 1.33334 4.96667V1.63334H2.00001L2.33334 0.966675H4.33334L4.66668 1.63334ZM9.33334 6.30001V5.63334C9.33334 5.45653 9.2631 5.28696 9.13808 5.16194C9.01306 5.03691 8.84349 4.96667 8.66668 4.96667H8.00001C8.00001 4.96667 7.33334 5.63334 8.00001 6.30001C7.64639 6.30001 7.30725 6.15953 7.0572 5.90948C6.80715 5.65944 6.66668 5.3203 6.66668 4.96667C6.48986 4.96667 6.3203 5.03691 6.19527 5.16194C6.07025 5.28696 6.00001 5.45653 6.00001 5.63334V6.30001C6.00001 6.47682 6.07025 6.64639 6.19527 6.77141C6.3203 6.89644 6.48986 6.96667 6.66668 6.96667H8.66668C8.84349 6.96667 9.01306 6.89644 9.13808 6.77141C9.2631 6.64639 9.33334 6.47682 9.33334 6.30001Z"
          fill="#EF4444"
        />
      </svg>
    ),
  },
  {
    key: "FaceRecognised",
    name: "Face Recognised",
    type: "Face Recognised",
    icon: <UserSearch className="w-4 h-4 text-blue-500" />,
  },
];

export default function IncidentPreview() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [resolvingIncidentIds, setResolvingIncidentIds] = useState<string[]>(
    []
  );
  const [uniqueCameras, setUniqueCameras] = useState<Camera[]>();

  const [loading, setLoading] = useState<boolean>(true);

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null
  );
  const [resolved, setResolved] = useState<number>(0);

  useEffect(() => {
    async function getIncidents() {
      setLoading(true);
      try {
        const res = await fetch("/api/incidents/?resolved=false", {});

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setIncidents(data.incidents as Incident[]);
        const uniqueCameras = Array.from(
          new Map(
            data.incidents.map((incident: Incident) => [
              incident.camera.id,
              incident.camera,
            ])
          ).values()
        );
        setUniqueCameras(uniqueCameras as Camera[]);
        if (data.incidents && data.incidents.length > 0) {
          setSelectedIncident(data.incidents[0]);
        } else {
          setSelectedIncident(null);
        }
      } catch (err) {
        console.error(err);
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    }
    getIncidents();
  }, []);

  const handleResolve = async (incidentId: string) => {
    setResolvingIncidentIds((ids) => [...ids, incidentId]);
    try {
      const res = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to resolve incident");
      setIncidents((old) => {
        const newList = old.filter((i) => i.id !== incidentId);

        if (selectedIncident && selectedIncident.id === incidentId) {
          setSelectedIncident(newList.length > 0 ? newList[0] : null);
        }

        return newList;
      });

      setResolved((prv) => prv + 1);
    } catch (err) {
      setResolvingIncidentIds((ids) => ids.filter((id) => id !== incidentId));
      alert("Error resolving incident.");
    }
  };

  if (loading) return <LoadingScreen />;
  if (!incidents) return <div>Error Loading data, Reload Again</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex px-[16px] gap-4 items-start">
        <div className="flex-[1.4] relative">
          {selectedIncident && (
            <>
              <div className="bg-[#131313] rounded-md flex gap-2 items-center w-43 p-1 text-sm text-center absolute left-10 top-2 text-slate-200 border-1 border-[#242424] z-10">
                <CalendarDays className="w-4 h-4" />
                {formatDate2(selectedIncident.tsStart)} -{" "}
                {formatTime(selectedIncident.tsStart)}
              </div>
              <img
                src={selectedIncident.thumbnailUrl}
                className="rounded-md w-full min-h-120 max-h-120 object-cover"
                alt={selectedIncident.type}
              />
              <div className="bg-[#131313] rounded-md flex gap-2 items-center w-50 p-1 text-sm text-center absolute left-10 top-110 text-slate-200 border-1 border-[#242424] z-10">
                <Disc className="w-4 h-4 text-red-500" />
                Camera - {selectedIncident.camera.location}
              </div>
            </>
          )}
        </div>

        <Card className="flex-[1] bg-[#131313] border-none text-white self-start overflow-auto resolve-scrollbar max-h-120 min-h-120">
          <CardHeader className="sticky">
            <CardTitle className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-[#481607] rounded-full w-6 h-6 flex justify-center items-center">
                  <TriangleAlert className="text-[#af3e3e] w-4 h-4" />
                </div>

                <span>{incidents.length} Unresolved Incidents</span>
              </div>

              <div className="flex">
                <div className="bg-[#481607] rounded-full w-6 h-6 flex justify-center items-center">
                  <DoorOpen className="text-orange-500 w-4 h-4" />
                </div>
                <div className="bg-[#481607] -ml-1 rounded-full w-6 h-6 flex justify-center items-center">
                  <Plus className="text-orange-500 w-4 h-4" />
                </div>
                <div className="bg-[#172554] -ml-1 mr-2 rounded-full w-6 h-6 flex justify-center items-center">
                  <UserSearch className="text-[#264d9a] w-4 h-4" />
                </div>
                <div className="bg-[#0a0a0a] text-xs rounded-md border-1 border-[#242424] flex gap-1 p-1 ">
                  <CheckCheck className="text-green-500 w-4 h-4" />
                  <span className="font-light">
                    {resolved} resolved incidents
                  </span>
                </div>
              </div>
            </CardTitle>

            <CardContent className="space-y-4 mt-4 px-1">
              {incidents.map((incident: Incident) => {
                return (
                  <div
                    onClick={() => setSelectedIncident(incident)}
                    key={incident.id}
                    className={`
    flex gap-3 items-center rounded-lg p-2
    hover:bg-[#0d0d0d] transition-colors duration-200
    transition-opacity duration-500 ease-in-out
    ${
      resolvingIncidentIds.includes(incident.id)
        ? "opacity-0 pointer-events-none"
        : "opacity-100"
    }
  `}
                  >
                    <div className="w-[120px] h-[75px] rounded-md overflow-hidden ">
                      <img
                        src={incident.thumbnailUrl}
                        alt={incident.type}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col flex-1 justify-between">
                      <div className="flex items-center gap-1">
                        {
                          INCIDENT_TYPE_ICONS.find(
                            (item) => item.type === incident.type
                          )?.icon
                        }

                        <span className="font-semibold text-white text-sm">
                          {incident.type}
                        </span>
                      </div>
                      <div className="text-[#bcbbc2] mt-4 flex items-center text-xs mt-1 mb-1">
                        <svg
                          className="mr-2 w-4 h-4"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.33902 3.23112L2.20945 0.542658C2.14878 0.515943 2.08339 0.501481 2.01706 0.500108C1.95074 0.498735 1.8848 0.510478 1.82306 0.534658C1.76137 0.558949 1.70513 0.595186 1.65758 0.641272C1.61004 0.687358 1.57213 0.74238 1.54607 0.803154L0.0406464 4.3031C-0.011776 4.42496 -0.0134714 4.56259 0.0359333 4.6857C0.0853379 4.80881 0.181797 4.90733 0.304095 4.95959L3.79516 6.45006L3.17292 8.00004H1.00361V6.50006H0V10.5H1.00361V9.00002H3.17292C3.58591 9.00002 3.95173 8.75303 4.10428 8.37103L4.71748 6.84406L6.43316 7.57655C6.55492 7.62868 6.69243 7.63071 6.81568 7.58218C6.93893 7.53366 7.03792 7.43853 7.09103 7.31755L8.59645 3.8891C8.64971 3.76782 8.65252 3.63043 8.60426 3.50708C8.556 3.38373 8.46062 3.28449 8.33902 3.23112ZM8.99739 7.68604L8.06503 7.31505L9.06764 4.81509L10 5.18558L8.99739 7.68604Z"
                            fill="white"
                          />
                        </svg>
                        {incident.camera.name}
                        <span className="mx-1">•</span>
                        {incident.camera.location}
                      </div>
                      <div className="flex items-center  gap-2 text-[#bcbbc2] text-xs">
                        <span className="text-[#bcbbc2] text-xs flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 9 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.76685 10.4451L4.7619 10.446L4.72995 10.462L4.72095 10.4639L4.71465 10.462L4.6827 10.446C4.6779 10.4445 4.6743 10.4452 4.6719 10.4483L4.6701 10.4529L4.66245 10.6491L4.6647 10.6582L4.6692 10.6642L4.716 10.6981L4.72275 10.7L4.72815 10.6981L4.77495 10.6642L4.78035 10.6569L4.78215 10.6491L4.7745 10.4533C4.7733 10.4484 4.77075 10.4457 4.76685 10.4451ZM4.8861 10.3933L4.88025 10.3942L4.797 10.4368L4.7925 10.4414L4.79115 10.4464L4.79925 10.6436L4.8015 10.6491L4.8051 10.6523L4.89555 10.6949C4.90125 10.6964 4.9056 10.6952 4.9086 10.6912L4.9104 10.6848L4.8951 10.4034C4.8936 10.3979 4.8906 10.3945 4.8861 10.3933ZM4.56435 10.3942C4.56237 10.393 4.56 10.3926 4.55773 10.3931C4.55547 10.3936 4.55349 10.395 4.5522 10.3969L4.5495 10.4034L4.5342 10.6848C4.5345 10.6903 4.53705 10.694 4.54185 10.6958L4.5486 10.6949L4.63905 10.6523L4.64355 10.6486L4.64535 10.6436L4.653 10.4464L4.65165 10.4409L4.64715 10.4364L4.56435 10.3942Z"
                              fill="white"
                            />
                            <path
                              d="M4.5 0.699951C6.98535 0.699951 9 2.7523 9 5.28416C9 7.81602 6.98535 9.86837 4.5 9.86837C2.01465 9.86837 0 7.81602 0 5.28416C0 2.7523 2.01465 0.699951 4.5 0.699951ZM4.5 1.61679C3.54522 1.61679 2.62955 2.00318 1.95442 2.69094C1.27928 3.37871 0.9 4.31152 0.9 5.28416C0.9 6.25681 1.27928 7.18962 1.95442 7.87739C2.62955 8.56515 3.54522 8.95153 4.5 8.95153C5.45478 8.95153 6.37045 8.56515 7.04558 7.87739C7.72072 7.18962 8.1 6.25681 8.1 5.28416C8.1 4.31152 7.72072 3.37871 7.04558 2.69094C6.37045 2.00318 5.45478 1.61679 4.5 1.61679ZM4.5 2.53364C4.61022 2.53365 4.7166 2.57487 4.79897 2.64949C4.88133 2.7241 4.93395 2.82691 4.94685 2.93842L4.95 2.99206V5.09438L6.16815 6.33532C6.24886 6.41782 6.29571 6.52852 6.2992 6.64493C6.30269 6.76135 6.26255 6.87475 6.18694 6.96211C6.11132 7.04947 6.0059 7.10424 5.89209 7.11528C5.77827 7.12633 5.6646 7.09282 5.57415 7.02158L5.53185 6.98353L4.18185 5.60827C4.11191 5.53696 4.06699 5.44415 4.05405 5.34422L4.05 5.28416V2.99206C4.05 2.87048 4.09741 2.75388 4.1818 2.6679C4.26619 2.58193 4.38065 2.53364 4.5 2.53364Z"
                              fill="white"
                            />
                          </svg>
                          <span className="font-bold">
                            {formatTime(incident.tsStart)} -{" "}
                            {formatTime(incident.tsEnd)} on{" "}
                            {formatDate(incident.tsStart)}
                          </span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleResolve(incident.id);
                      }}
                      disabled={resolvingIncidentIds.includes(incident.id)}
                      className="ml-2 text-[#FFCC00] hover:underline flex font-bold text-[15px]"
                    >
                      <span>Resolve</span>
                      <ChevronRight />
                    </button>
                  </div>
                );
              })}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      {uniqueCameras && (
        <Timeline uniqueCameras={uniqueCameras} incidents={incidents} />
      )}
    </div>
  );
}
