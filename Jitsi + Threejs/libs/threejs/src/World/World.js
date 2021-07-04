// ./components imports
import { createCamera } from './components/camera.js';
import { createCube, createTexCube } from './components/cube.js';
import { createAmbientLight, createDirectionalLights, createHemisphereLight, createPointLight } from './components/lights.js'
import { createScene } from './components/scene.js';

import { loadModels } from './components/models/models.js'

// ./systems imports
import { Cameraman} from './systems/Cameraman.js';
import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Loop } from './systems/Loop.js'
import { Raycast } from './systems/Raycaster.js';
import { Resizer } from './systems/Resizer.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    const camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const controls = createControls(camera, renderer.domElement);
    loop.updateables.push(controls); // for damping effect to work

    const roomsize = [10, 15, 5]

    const floor = createTexCube(roomsize[0], 0.1, roomsize[1], 0, 0.05, 0, 'carpet.png', 10, 10, 'floor')
    const backwall = createTexCube(roomsize[0], roomsize[2], 0.1, 0, roomsize[2]/2, roomsize[1]/2, 'plaster.png', 2, 2, 'backwall')
    const frontwall = createTexCube(roomsize[0], roomsize[2], 0.1, 0, roomsize[2]/2, -roomsize[1]/2, 'plaster.png', 2, 2, 'backwall')
    const sidewall_left = createTexCube(0.1, roomsize[2], roomsize[1], -roomsize[0]/2, roomsize[2]/2, 0, 'plaster.png', 2, 2, 'leftwall')
    const sidewall_right = createTexCube(0.1, roomsize[2], roomsize[1], roomsize[0]/2, roomsize[2]/2, 0, 'plaster.png', 2, 2, 'rightwall')
    const ceiling = createCube(roomsize[0], 0.1, roomsize[1], 0, roomsize[2], 0, '', 'ceiling')
    
    const screenframe = createCube(roomsize[0]*0.4, roomsize[2]*0.6, 0.1, 0, roomsize[2]/2, frontwall.position.z+0.1, 0x888888, 'screen frame')
    const screen = createCube(roomsize[0]*0.4*0.9, roomsize[2]*0.6*0.9, 0.05, 0, roomsize[2]/2, screenframe.position.z+0.05)

    const light  = createPointLight(0, roomsize[2]-0.5, 4, 6, 0xffffff, 'ceiling lamp light')
    const light2  = createPointLight(0, roomsize[2]-0.5, -2, 6, 0xffffff, 'ceiling lamp light2')

    const hemisphereLight = createHemisphereLight('white', 'darkslategrey', 0.5, 'hemisphere light')
    const lamp = createCube(0.5, 0.05, 0.5, light.position.x, light.position.y+0.45, light.position.z, '', 'ceiling lamp')
    const lamp2 = createCube(0.5, 0.05, 0.5, light2.position.x, light2.position.y+0.45, light2.position.z, '', 'ceiling lamp2')

    scene.add(floor, frontwall, backwall, sidewall_left, sidewall_right, //ceiling,
       screenframe, screen,
       light, light2, hemisphereLight, lamp, lamp2);

    const resizer = new Resizer(container, camera, renderer);  // Resize window when resize event is fired
    const cameraman = new Cameraman(camera, controls, scene, screen);  // Orbital camera controls
    const raycaster = new Raycast(camera, controls, renderer, scene);

    controls.target.set(0, 2.5, 5.9); // Initial camera target

    // controls.minAzimuthAngle = - MathUtils.degToRad(20); // Limit Camera rotation angle left
    // controls.maxAzimuthAngle = MathUtils.degToRad(20);   // Limit Camera rotation angle right

    // controls.minPolarAngle = MathUtils.degToRad(0); // Limit Camera rotation angle up
    // controls.maxPolarAngle = MathUtils.degToRad(95); // Limit Camera rotation angle down

  }

  // add objects from models.js
  async init() {
    const { chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8, table, door } = await loadModels();
    scene.add( chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8, table, door )
  };


  render() {
    // draw a single frame
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };