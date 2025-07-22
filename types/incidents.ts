export type Camera = {
  id: string;
  name: string;
  location: string;
};

export type Incident = {
  id: string;
  cameraId: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
};
