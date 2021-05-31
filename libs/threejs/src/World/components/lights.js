import { AmbientLight, DirectionalLight, HemisphereLight, PointLight, RectAreaLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

// Create a Directional Light
function createDirectionalLights(x, y, z) {
  const light = new DirectionalLight('white', 8)

  light.position.set(x, y, z)

  return light
}

// Create a Point Light
function createPointLight(x, y, z, brightness=100, color=0xffffff, name='') {
  const light = new PointLight(color, brightness)

  light.position.set(x, y, z)
  light.name = name

  return light
}

// Create a Hemisphere Light
function createHemisphereLight(color_top, color_bottom, intensity, name='') {
  const hemisphereLight = new HemisphereLight(
    color_top,
    color_bottom,
    intensity
  )
  hemisphereLight.name = name

  return hemisphereLight
}

// Create an Ambient Light
function createAmbientLight(color, intensity, name='') {
  const ambientLight = new AmbientLight(color, intensity)
  ambientLight.name = name

  return ambientLight
}

// Create a RectArea Light
function createRectAreaLight(x, y, z, color, intensity, width, height, name='') {
  const rectAreaLight = new RectAreaLight(color, intensity, width, height)
  rectAreaLight.name = name
  rectAreaLight.position.set(x,y,z)
  return rectAreaLight
}

var toggled = false
var old = {}

// Light Switch Toggle
function toggleLight(light_dict) {
  if ( !toggled ){
    old.cl1 = light_dict['ceiling lamp'].intensity
    old.cl2 = light_dict['ceiling lamp 2'].intensity
    old.cl3 = light_dict['ceiling light'].intensity
    light_dict['ceiling lamp'].intensity = 0
    light_dict['ceiling lamp 2'].intensity = 0
    light_dict['ceiling light'].intensity = 0
    light_dict['screen light screen'].intensity = 1
    light_dict['screen light room'].intensity = 5
    

    toggled = true
  }
  else {
    light_dict['ceiling lamp'].intensity = old.cl1
    light_dict['ceiling lamp 2'].intensity = old.cl2
    light_dict['ceiling light'].intensity = old.cl3
    light_dict['screen light screen'].intensity = 0
    light_dict['screen light room'].intensity = 0

    toggled = false
  }

}

export { createAmbientLight, createDirectionalLights, createHemisphereLight, createPointLight, createRectAreaLight, toggleLight }
