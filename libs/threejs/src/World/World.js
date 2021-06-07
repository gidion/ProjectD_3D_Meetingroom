import {RectAreaLightUniformsLib} from 'https://unpkg.com/three@0.117.0/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { Mesh, PlaneGeometry, MathUtils, MeshLambertMaterial } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

// ./components imports
import { createCamera } from './components/camera.js'
import { createCube, createTexCube } from './components/cube.js'
import { createAmbientLight, createDirectionalLight, createHemisphereLight, createPointLight, createRectAreaLight } from './components/lights.js'
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
let scene2
let scene3
let loop

class World {
  constructor(container) {
    const camera = createCamera()
    scene = createScene()
    scene.name = 'scene_1'
    scene2 = createScene()
    scene2.name = 'scene_2'
    scene3 = createScene()
    scene3.name = 'scene_3'
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
    
    controls.target.set(0, 2.5, 5.9) // Initial camera target

    //People webcams
    // Initial chair setup
  
    const geometryPlane = new PlaneGeometry(1,1,1);
    const vid_empty_mat = new MeshLambertMaterial({color: "rgb(165, 182, 184)"}); 

    // cloned people right side
    const person1 = new Mesh(geometryPlane, vid_empty_mat)
    person1.position.set(2.5, 2, 2)
    person1.rotation.y = MathUtils.degToRad(-25)
    person1.scale.set(0.5, 0.5, 0.5)
    person1.name = 'person_1'

    const person2 = person1.clone()
    person2.position.z -= 2;
    person2.name = 'person_2';

    const person3 = person2.clone()
    person3.position.z -= 2;
    person3.name = 'person_3';
   
    const person4 = person3.clone()
    person4.position.z -= 2;
    person4.name = 'person_4';

    const person5 = person1.clone()
    // left sideperson setup
    person5.position.x = -2.25
    person5.position.z = 3.7
    person5.rotation.y = MathUtils.degToRad(25)
    person5.name = 'person_5'

    // cloned persons left side
    const person6 = person5.clone()
    person6.position.z -= 2
    person6.name = 'person_6'
    
    const person7 = person6.clone()
    person7.position.z -= 2
    person7.name = 'person_7'
    
    const person8 = person7.clone()
    person8.position.z -= 2
    person8.name = 'person_8'

    //auto hide persons
    person1.visible = false;
    person2.visible = false;
    person3.visible = false;
    person4.visible = false;
    person5.visible = false;
    person6.visible = false;
    person7.visible = false;
    person8.visible = false;

    /////////////
    // Scene 1 //
    /////////////
    scene.add(floor, frontwall, backwall, sidewall_left, sidewall_right, ceiling, ceilingLight,
       screenFrame, screen,
       light, light2, hemisphereLight, lamp, lamp2, screenLightScreen, screenLightRoom, person1, person2, person3, person4, person5, person6, person7, person8)


    /////////////
    // Scene 2 //
    /////////////
    const light_sc2 = createPointLight(0, roomSize[2]-1, 4, 1, 0xffffff, 'ceiling lamp light')
    const hemisphereLight_sc2 = createHemisphereLight('white', 'blue', 1, 'hemisphere light scene 2')
    const screen_sc2 = screen.clone()
    const screenFrame_sc2 = screenFrame.clone()
    screen_sc2.position.z += 1
    screenFrame_sc2.position.z += 1
    // const light_sc2 = createDirectionalLight(0, 5, 0, 'white', 5)
    const screenLightScreen_sc2 = createRectAreaLight(screen_sc2.position.x, screen_sc2.position.y, screen_sc2.position.z+0.05, 0xddddff, 0.5, screenSize[0], screenSize[1], 'screen light screen')
    const screenLightRoom_sc2 = createRectAreaLight(screen_sc2.position.x, screen_sc2.position.y, screen_sc2.position.z, 0xddddff, 20, screenSize[0], screenSize[1], 'screen light room')
    screenLightRoom_sc2.rotation.y = MathUtils.degToRad(180)

    scene2.add( hemisphereLight_sc2, light_sc2, screen_sc2, screenFrame_sc2, screenLightRoom_sc2, screenLightScreen_sc2 )


    const resizer = new Resizer(container, camera, renderer)  // Resize window when resize event is fired
    const cameraman = new Cameraman(camera, controls, scene, loop, screen, screen_sc2)  // Orbital camera controls
    const raycaster = new Raycast(camera, controls, renderer, scene, scene2, screen, screen_sc2, light_dict, loop) // Check if anything interactive was clicked
  }

  // Add objects from models.js
  async init() {
    const { chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8,
      chair_sc2_1, chair_sc2_2, chair_sc2_3, chair_sc2_4, chair_sc2_5, chair_sc2_6, chair_sc2_7, chair_sc2_8,
      table, door, coffee_cup, bell, light_switch, microphone, laptop, space_room, space_room2, stars,
      table_sc2, laptop_sc2, coffee_cup_sc2 } = await loadModels()

    // Scene 1
    scene.add( chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8, table, door, coffee_cup, bell, light_switch, microphone, laptop )

    const door_sc2 = door.clone()
    const microphone_sc2 = microphone.clone()
    const bell_sc2 = bell.clone()
    microphone_sc2.position.y -= 0.2
    bell_sc2.position.y -= 0.175
    door_sc2.position.x = 0
    door_sc2.position.z = 25
    door_sc2.rotation.z = MathUtils.degToRad(0)

    // Scene 2
    scene2.add( door_sc2, space_room, space_room2, stars,
      chair_sc2_1, chair_sc2_2, chair_sc2_3, chair_sc2_4, chair_sc2_5, chair_sc2_6, chair_sc2_7, chair_sc2_8,
      table_sc2, laptop_sc2, coffee_cup_sc2, microphone_sc2, bell_sc2 )
  
  /*
    webgazer.setGazeListener(function(data, timestamp) {
      var windowWidth = window.innerWidth;
      var windowCenter = windowWidth / 2;
      var degreeRotation = camera.rotation.y * 180 / Math.PI;
  
      try{
          // main camera rotation
          if(data.x < windowCenter){
              var pixelPerRotation = 90*((windowCenter - data.x) / windowCenter);
              rotateCam(deviser(degreeRotation - (degreeRotation - pixelPerRotation)), degreeRotation, 3, camera);
          }
          if(data.x > windowCenter){
              var pixelPerRotation = 90*((data.x - windowCenter) / windowCenter);
              rotateCam(deviser(degreeRotation + (pixelPerRotation - degreeRotation)), degreeRotation, 3, camera);
          }        
      }
      catch{
        //console.log("error");
      }
      camera.rotation.y = 0;
    }).begin();
    webgazer.pause();
    */
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
