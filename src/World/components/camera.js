import { PerspectiveCamera } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  );

  camera.position.set(0, 2.5, 6); // initial camera position
  camera.seated = false // if camera is at chair

  return camera;
}

export { createCamera };
