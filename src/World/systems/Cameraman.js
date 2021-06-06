import { BoxBufferGeometry, MathUtils, Mesh, MeshStandardMaterial, VideoTexture } from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { createCube } from '../components/cube.js'

class Cameraman {
  constructor(camera, controls, scene, loop, screen, screen_sc2) {
    const vid = document.querySelector('video')
    window.addEventListener('keyup', async function(event) {
      switch (event.key) {

          // starting position reset
          case 'r':
          camera.position.set(0, 2.5, 6)
          controls.target.set(0, 2.5, 5.9)
          break

          // minimap
          case 'm':
          // Get the minimap element
          var mm = document.querySelector( '#minimap' )
          
          // Set visibility to hidden if it is currently visible, or to visible otherwise
          function toggle_visibility() {
            
            if ( mm.style.visibility == 'visible' ) {
              mm.style.setProperty( 'visibility', 'hidden' )
            }
            else {
              mm.style.setProperty( 'visibility', 'visible' )
            }
          }
          toggle_visibility()
          break

          // debug
          case ' ':
          break


          // 'toggle video'
          case 'p':
          startVideo()
        }
    })  
  

  // Start video
  async function startVideo() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: true
      })
      const videoTracks = stream.getVideoTracks()
      const track = videoTracks[0]
      vid.srcObject = stream
      }
      
      catch (error) {
      alert(`${error.name}`)
      console.error(error)
      }

      if (loop.scene.name == 'scene_2'){
        var cur_screen = screen_sc2
      }
      else {
        var cur_screen = screen
      } 

      // Add video to chair
      if (loop.scene.getObjectByName( 'Video' ) == undefined && camera.seated) {
        const vidcube = createVideoCube(0.01, 0.6, 0.8, camera.position.x, camera.position.y, camera.position.z)//+0.07)
        const vidcubeborder = createCube(0.02, 0.68, 0.88, vidcube.position.x*1.005, vidcube.position.y, vidcube.position.z, 0x99ddff, 'VideoBorder')
        //vidcube.rotation.y = MathUtils.degToRad()
        
        loop.scene.add(vidcube)
        loop.scene.add(vidcubeborder)
      }

      // Add video to screen
      
      else if (loop.scene.getObjectByName( 'Video' ) == undefined && !camera.seated) {
        const screensize = cur_screen.geometry.parameters
        const vidcube = createVideoCube(screensize.width, screensize.height, screensize.depth, cur_screen.position.x, cur_screen.position.y, cur_screen.position.z)
        loop.scene.add(vidcube)
      }
      else {
        // Remove video stuff
        var object = loop.scene.getObjectByName( 'Video' )
        loop.scene.remove(object)
        object.geometry.dispose()
        object.material.dispose()
        object = undefined
        var object = loop.scene.getObjectByName( 'VideoBorder' )
        loop.scene.remove(object)
        object.geometry.dispose()
        object.material.dispose()
        object = undefined
      }
      
  }

  // Create a video material
  function createVideoMaterial() {
  const video = document.getElementById( 'video' )
  const texture = new VideoTexture( video )
  const material = new MeshStandardMaterial({
      map: texture,
      transparent: true
    })
  return material
  }

  // Create a video cube
  function createVideoCube(x, y, z, pos_x, pos_y, pos_z) {
  // create a geometry
  const geometry = new BoxBufferGeometry(x,y,z)

  // create a the video material
  const material = createVideoMaterial()

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material)
  cube.position.set(pos_x, pos_y, pos_z)

  cube.name = 'Video'
  return cube
  }
}
}
export { Cameraman }