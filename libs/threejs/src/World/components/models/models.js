import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js'
import { MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

import { setupModel } from './setupModel.js'

// To add new model:
// 1. Add model's gltf file (and if applicable textures) to assets/models

//PrePath: use '' for local, use 'libs/threejs' for server/live
const pre_path = 'libs/threejs';

async function loadModels() {
  const loader = new GLTFLoader()

  // 2. Add new loader data
  const [tableData, chairData, doorData, coffee_cupData, bellData, light_switchData, microphoneData, laptopData, space_roomData, starsData, chair_sc2Data, table_sc2Data, laptop_sc2Data, coffee_cup_sc2Data] = await Promise.all([
    loader.loadAsync(pre_path + '/assets/models/table/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/chair/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/door/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/coffee_cup/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/bell/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/light_switch/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/microphone/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/laptop/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/space_room/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/stars/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/chair2/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/table2/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/laptop2/scene.gltf'),
    loader.loadAsync(pre_path + '/assets/models/coffee_cup2/scene.gltf')
  ])

  // 3. Use setupModel and set position/scale/rotation etc.

  // Initial chair setup
  const chair1 = setupModel(chairData)
  chair1.position.set(2.5, 0.1, 2)
  chair1.rotation.z = MathUtils.degToRad(130)
  chair1.scale.set(1.3, 1.3, 1.3)
  chair1.name = 'chair_r1'

  // cloned chairs right side
  const chair2 = chair1.clone()
  chair2.position.z -= 2
  chair2.name = 'chair_r2'
  const chair3 = chair2.clone()
  chair3.position.z -= 2
  chair3.name = 'chair_r3'
  const chair4 = chair3.clone()
  chair4.position.z -= 2
  chair4.name = 'chair_r4'

  // left side chair setup
  const chair5 = chair1.clone()
  chair5.position.x = -2.25
  chair5.position.z = 3.7
  chair5.rotation.z = MathUtils.degToRad(-50)
  chair5.name = 'chair_l1'


  // cloned chairs left side
  const chair6 = chair5.clone()
  chair6.position.z -= 2
  chair6.name = 'chair_l2'
  const chair7 = chair6.clone()
  chair7.position.z -= 2
  chair7.name = 'chair_l3'
  const chair8 = chair7.clone()
  chair8.position.z -= 2
  chair8.name = 'chair_l4'

  // table
  const table = setupModel(tableData)
  table.position.set(1.3, 0.086, 3.9)
  table.scale.set(0.05,0.05,0.04)
  table.rotation.z = MathUtils.degToRad(90)
  table.name = 'table'

  // door
  const door = setupModel(doorData)
  door.position.set(-4.95, 0.02, -5)
  door.scale.set(0.0015, 0.0015, 0.0015)
  door.rotation.z = MathUtils.degToRad(90)
  door.name = 'door'

  // coffee cup
  const coffee_cup = setupModel(coffee_cupData)
  coffee_cup.position.set(0.5, 1.25, -1)
  coffee_cup.scale.set(0.001, 0.001, 0.001)
  coffee_cup.rotation.z = MathUtils.degToRad(69)
  coffee_cup.name = 'coffee_cup'
  
  // bell
  const bell = setupModel(bellData)
  bell.position.set(-0.5, 1.25, -1.3)
  bell.scale.set(0.1, 0.1, 0.1)
  bell.name = 'bell'

  // light switch
  const light_switch = setupModel(light_switchData)
  light_switch.position.set(-3.95, 2.25, -7.43)
  light_switch.scale.set(0.005, 0.005, 0.005)
  light_switch.rotation.z = MathUtils.degToRad(90)
  light_switch.rotation.y = MathUtils.degToRad(4)
  light_switch.rotation.x = MathUtils.degToRad(263)
  light_switch.name = 'light_switch'

  // microphone
  const microphone = setupModel(microphoneData)
  microphone.position.set(0, 1.34, -1.5)
  microphone.scale.set(0.0003, 0.0003, 0.0003)
  microphone.rotation.z = MathUtils.degToRad(25)

  microphone.name = 'microphone'
  
  // laptop
  const laptop = setupModel(laptopData)
  laptop.position.set(-0.65, 1.225, -3.4)
  laptop.scale.set(1, 1, 1)
  laptop.rotation.z = MathUtils.degToRad(-60)
  laptop.name = 'laptop'

  
  // space room
  const space_room = setupModel(space_roomData)
  space_room.position.set(0, 0, -2.4)
  space_room.scale.set(1.5, 1.3, 1.5)
  //space_room.rotation.z = MathUtils.degToRad(-60)
  space_room.name = 'space_room'

  // space room 2
  const space_room2 = space_room.clone()
  space_room2.position.set(0, 0, 21)
  space_room2.scale.set(1.5, 1.3, 1.5)
  space_room2.rotation.z = MathUtils.degToRad(180)
  space_room2.name = 'space_room2'

  // stars skybox
  const stars = setupModel(starsData)
  stars.position.set(0, 0, 0)
  stars.scale.set(500, 500, 500)
  stars.rotation.x = MathUtils.degToRad(90)
  stars.rotation.y = MathUtils.degToRad(-90)
  stars.rotation.z = MathUtils.degToRad(20)
  stars.name = 'stars'

  // Initial chair setup (scene2)
  const chair_sc2_1 = setupModel(chair_sc2Data)
  chair_sc2_1.position.set(2.5, 1, 2.75)
  chair_sc2_1.rotation.z = MathUtils.degToRad(-90)
  chair_sc2_1.scale.set(1.0, 1.0, 1.0)
  chair_sc2_1.name = 'chair_r1'

  // cloned chairs right side 2
  const chair_sc2_2 = chair_sc2_1.clone()
  chair_sc2_2.position.z -= 2
  chair_sc2_2.name = 'chair_r2'
  const chair_sc2_3 = chair_sc2_2.clone()
  chair_sc2_3.position.z -= 2
  chair_sc2_3.name = 'chair_r3'
  const chair_sc2_4 = chair_sc2_3.clone()
  chair_sc2_4.position.z -= 2
  chair_sc2_4.name = 'chair_r4'

  // left side chair setup 2
  const chair_sc2_5 = chair_sc2_1.clone()
  chair_sc2_5.position.x = -2.25
  chair_sc2_5.rotation.z = MathUtils.degToRad(90)
  chair_sc2_5.name = 'chair_l1'


  // cloned chairs left side 2
  const chair_sc2_6 = chair_sc2_5.clone()
  chair_sc2_6.position.z -= 2
  chair_sc2_6.name = 'chair_l2'
  const chair_sc2_7 = chair_sc2_6.clone()
  chair_sc2_7.position.z -= 2
  chair_sc2_7.name = 'chair_l3'
  const chair_sc2_8 = chair_sc2_7.clone()
  chair_sc2_8.position.z -= 2
  chair_sc2_8.name = 'chair_l4'

  // table 2
  const table_sc2 = setupModel(table_sc2Data)
  table_sc2.position.set(-5.8, 0, 3.75)
  table_sc2.scale.set(0.008,0.005,0.0025) // length, width, height
  table_sc2.rotation.z = MathUtils.degToRad(90)
  table_sc2.name = 'table'

  // laptop 2
  const laptop_sc2 = setupModel(laptop_sc2Data)
  laptop_sc2.position.set(-0.65, 1.06, -3.4)
  laptop_sc2.scale.set(0.3, 0.3, 0.3)
  laptop_sc2.rotation.z = MathUtils.degToRad(-60)
  laptop_sc2.name = 'laptop'

  // coffee cup 2
  const coffee_cup_sc2 = setupModel(coffee_cup_sc2Data)
  coffee_cup_sc2.position.set(0.5, 1.05, -1)
  coffee_cup_sc2.scale.set(0.001, 0.001, 0.001)
  coffee_cup_sc2.rotation.z = MathUtils.degToRad(-69)
  coffee_cup_sc2.name = 'coffee_cup'

  // 4. Add to return
  // 5. Add to scene in ../World.js
  // 6. Add to ../systems/Raycaster.js for interactivity
  return { chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8,
    table, door, coffee_cup, bell, light_switch, microphone, laptop, space_room, space_room2, stars,
    chair_sc2_1, chair_sc2_2, chair_sc2_3, chair_sc2_4, chair_sc2_5, chair_sc2_6, chair_sc2_7, chair_sc2_8,
    table_sc2, laptop_sc2, coffee_cup_sc2 }
}

export { loadModels }