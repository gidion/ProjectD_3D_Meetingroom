import {RectAreaLightUniformsLib} from 'https://unpkg.com/three@0.117.0/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

// ./components imports
import { createCamera } from './components/camera.js'
import { createCube, createTexCube } from './components/cube.js'
import { createAmbientLight, createDirectionalLights, createHemisphereLight, createPointLight, createRectAreaLight } from './components/lights.js'
import { createScene } from './components/scene.js'

import { loadModels } from './components/models/models.js'

// ./systems imports
import { Cameraman} from './systems/Cameraman.js'
import { createControls } from './systems/controls.js'
import { createRenderer } from './systems/renderer.js'
import { Loop } from './systems/Loop.js'
import { Raycast } from './systems/Raycaster.js'
import { Resizer } from './systems/Resizer.js'

// Module-scoped variables
let camera
let renderer
let scene
let loop

class World {
  constructor(container) {
    const camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(camera, scene, renderer)
    container.append(renderer.domElement)
    RectAreaLightUniformsLib.init();

    const controls = createControls(camera, renderer.domElement)
    loop.updateables.push(controls) // for damping effect to work

    const roomSize = [10, 15, 5] // Width, Length, Height
    const screenSize = [roomSize[0]*0.4, roomSize[2]*0.6, 0.1]

    // Walls
    const floor = createTexCube(roomSize[0], 0.1, roomSize[1], 0, 0.05, 0, 'carpet.png', 10, 10, 'floor')
    const backwall = createTexCube(roomSize[0], roomSize[2], 0.1, 0, roomSize[2]/2, roomSize[1]/2, 'plaster.png', 2, 2, 'backwall')
    const frontwall = createTexCube(roomSize[0], roomSize[2], 0.1, 0, roomSize[2]/2, -roomSize[1]/2, 'plaster.png', 2, 2, 'backwall')
    const sidewall_left = createTexCube(0.1, roomSize[2], roomSize[1], -roomSize[0]/2, roomSize[2]/2, 0, 'plaster.png', 2, 2, 'leftwall')
    const sidewall_right = createTexCube(0.1, roomSize[2], roomSize[1], roomSize[0]/2, roomSize[2]/2, 0, 'plaster.png', 2, 2, 'rightwall')
    const ceiling = createTexCube(roomSize[0], 0.1, roomSize[1], 0, roomSize[2], 0, 'plaster.png', 2, 2, 'ceiling')
    // Ceiling is very dark without this light
    const ceilingLight = createRectAreaLight(ceiling.position.x, ceiling.position.y-0.051, ceiling.position.z, 0xffffff, 0.3, roomSize[0], roomSize[1], 'ceiling light')
    ceilingLight.rotation.x = MathUtils.degToRad(90)
    
    // Presentation Screen
    const screenFrame = createCube(screenSize[0], screenSize[1], screenSize[2], 0, roomSize[2]/2, frontwall.position.z+0.1, 0x888888, 'screen frame')
    const screen = createCube(screenSize[0]*0.9, screenSize[1]*0.9, screenSize[2]*0.5, 0, roomSize[2]/2, screenFrame.position.z+0.05, 'screen')

    // Lighting
    const light  = createPointLight(0, roomSize[2]-0.5, 4, 6, 0xffffff, 'ceiling lamp light')
    const light2  = createPointLight(0, roomSize[2]-0.5, -2, 6, 0xffffff, 'ceiling lamp light2')
    const hemisphereLight = createHemisphereLight('white', 'darkslategrey', 0.5, 'hemisphere light')
    const lamp = createCube(0.5, 0.05, 0.5, light.position.x, light.position.y+0.45, light.position.z, '', 'ceiling lamp')
    const lamp2 = createCube(0.5, 0.05, 0.5, light2.position.x, light2.position.y+0.45, light2.position.z, '', 'ceiling lamp 2')
    const screenLightScreen = createRectAreaLight(screen.position.x, screen.position.y, screen.position.z+0.05, 0xddddff, 0, screenSize[0], screenSize[1], 'screen light screen')
    const screenLightRoom = createRectAreaLight(screen.position.x, screen.position.y, screen.position.z, 0xddddff, 0, screenSize[0], screenSize[1], 'screen light room')
    screenLightRoom.rotation.y = MathUtils.degToRad(180)

    const light_dict = { 'ceiling lamp' : light, 'ceiling lamp 2' : light2, 'hemisphere light' : hemisphereLight, 'screen light screen' : screenLightScreen, 'screen light room' : screenLightRoom, 'ceiling light' : ceilingLight }

    scene.add(floor, frontwall, backwall, sidewall_left, sidewall_right, ceiling, ceilingLight,
       screenFrame, screen,
       light, light2, hemisphereLight, lamp, lamp2, screenLightScreen, screenLightRoom)

    const resizer = new Resizer(container, camera, renderer)  // Resize window when resize event is fired
    const cameraman = new Cameraman(camera, controls, scene, screen)  // Orbital camera controls
    const raycaster = new Raycast(camera, controls, renderer, scene, light_dict) // Check if anything interactive was clicked

    controls.target.set(0, 2.5, 5.9) // Initial camera target
  }

  // Add objects from models.js
  async init() {
    const { chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8, table, door, coffee_cup, bell, light_switch, microphone, laptop } = await loadModels()
    scene.add( chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8, table, door, coffee_cup, bell, light_switch, microphone, laptop )
  }


  render() {
    // draw a single frame
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { World }
