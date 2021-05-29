import { BoxBufferGeometry, MathUtils, Mesh, MeshStandardMaterial, TextureLoader, RepeatWrapping, VideoTexture } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

//PrePath: use '' for local, use 'libs/threejs' for server/live
const pre_path = '';

// Create a colored material
function createColorMaterial(color) {
  const material = new MeshStandardMaterial({
    color: color,
  })

  return material
}

// Create a textured material
function createTextureMaterial(map, rep_x, rep_y) {
  // create a texture loader
  const textureLoader = new TextureLoader()
  // load a texture
  const texture = textureLoader.load(
    pre_path + '/assets/textures/' + map
  )
  texture.repeat.set(rep_x, rep_y)
  texture.wrapS = texture.wrapT = RepeatWrapping
  const material = new MeshStandardMaterial({
    map: texture
  })

  return material
}

// Create a textured cube
function createTexCube(x=1,y=1,z=1, pos_x=0,pos_y=0, pos_z=0, map='', rep_x=1, rep_y=1, name='') {
  // create a geometry
  const geometry = new BoxBufferGeometry(x,y,z)

  // create a default Standard material
  const material = createTextureMaterial(map, rep_x, rep_y)

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.position.set(pos_x, pos_y, pos_z)

  cube.name = name
  return cube
}

// Create a colored cube
function createCube(x=1,y=1,z=1, pos_x=0,pos_y=0,pos_z=0, color='white', name='') {
  // create a geometry
  const geometry = new BoxBufferGeometry(x,y,z)

  // create a default Standard material
  const material = createColorMaterial(color)

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.position.set(pos_x, pos_y, pos_z)

  // cube.rotation.set(-0.5, -0.1, 0.8)

  // const radiansPerSecond = MathUtils.degToRad(30)

  // // this method will be called once per frame
  // cube.tick = (delta) => {
  //   cube.rotation.x += radiansPerSecond * delta
  //   cube.rotation.y += radiansPerSecond * delta
  //   cube.rotation.z += radiansPerSecond * delta
  // }

  cube.name = name
  return cube
}





export { createCube, createTexCube }
