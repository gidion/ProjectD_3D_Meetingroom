import { AmbientLight, DirectionalLight, HemisphereLight, PointLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createDirectionalLights(x, y, z) {
  // Create a Directional Light
  const light = new DirectionalLight('white', 8);

  light.position.set(x, y, z)

  return light;
}

function createPointLight(x, y, z, brightness=100, color=0xffffff, name='') {
  // Create a Point Light
  const light = new PointLight(color, brightness);

  light.position.set(x, y, z)
  light.name = name

  return light;
}

function createHemisphereLight(color_top, color_bottom, intensity, name='') {
  const hemisphereLight = new HemisphereLight(
    color_top,
    color_bottom,
    intensity
  );
  hemisphereLight.name = name

  return hemisphereLight;
}

function createAmbientLight(color, intensity) {
  const ambientLight = new AmbientLight(color, intensity);

  return ambientLight;
}

export { createAmbientLight, createDirectionalLights, createHemisphereLight, createPointLight };
