
export const cameras = [
    {
      camera: "Kitchen",
      url: "http://10.131.48.198/mjpg/video.mjpg"
    },
    {
      camera: "Office",
      url: "http://10.131.48.110:8000/stream.mjpg"
    },
    {
      camera: "Desktop",
      url: "http://10.131.48.109:8000/stream.mjpg"
    }
  ];

  export const updateCamera = (cameraIndex, newCamera) => {
    cameras[cameraIndex] = newCamera;
  };


