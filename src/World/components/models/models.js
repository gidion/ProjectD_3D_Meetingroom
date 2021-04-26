import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import { setupModel } from './setupModel.js';

async function loadModels() {
  const loader = new GLTFLoader();

  const [tableData, chairData, doorData] = await Promise.all([
      loader.loadAsync('/assets/models/table/scene.gltf'),
      loader.loadAsync('/assets/models/chair/scene.gltf'),
      loader.loadAsync('/assets/models/door/scene.gltf')
  ]);


  // Initial chair setup
  const chair1 = setupModel(chairData);
  chair1.position.set(2.5, 0.1, 2)
  chair1.rotation.z = MathUtils.degToRad(130);
  chair1.scale.set(1.3, 1.3, 1.3);
  chair1.name = 'chair_r1'

  // cloned chairs right side
  const chair2 = chair1.clone();
  chair2.position.z -= 2;
  chair2.name = 'chair_r2'
  const chair3 = chair2.clone();
  chair3.position.z -= 2;
  chair3.name = 'chair_r3'
  const chair4 = chair3.clone();
  chair4.position.z -= 2;
  chair4.name = 'chair_r4'

  // left side chair setup
  const chair5 = chair1.clone();
  chair5.position.x = -2.25;
  chair5.position.z = 3.7
  chair5.rotation.z = MathUtils.degToRad(-50);
  chair5.name = 'chair_l1'


  // cloned chairs left side
  const chair6 = chair5.clone();
  chair6.position.z -= 2;
  chair6.name = 'chair_l2'
  const chair7 = chair6.clone();
  chair7.position.z -= 2;
  chair7.name = 'chair_l3'
  const chair8 = chair7.clone();
  chair8.position.z -= 2;
  chair8.name = 'chair_l4'

  // table
  const table = setupModel(tableData);
  table.position.set(1.3, 0.086, 3.9);
  table.scale.set(0.05,0.05,0.04);
  table.rotation.z = MathUtils.degToRad(90);
  table.name = 'table';

  // door
  const door = setupModel(doorData);
  door.position.set(-4.95, 0.02, -5);
  door.scale.set(0.0015, 0.0015, 0.0015);
  door.rotation.z = MathUtils.degToRad(90);
  door.name = 'door';
  

  return { chair1, chair2, chair3, chair4, chair5, chair6, chair7, chair8, table, door };
}

export { loadModels };