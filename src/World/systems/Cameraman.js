import { BoxBufferGeometry, MathUtils, Mesh, MeshStandardMaterial, VideoTexture } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { createCube } from '../components/cube.js'

class Cameraman {
  constructor(camera, controls, scene, screen) {
    const vid = document.querySelector('video')
    window.addEventListener('keyup', async function(event) {
      //console.log(event.key)

      switch (event.key) {

          // starting position reset
          case 'r':
          camera.position.set(0, 2.5, 6);
          controls.target.set(0, 2.5, 5.9);
          camera.seated = false // if camera is at chair
          break;

          // 'minimap'
          case 'm':
          camera.position.set(0, 15, 0);
          controls.target.set(0, 14.9, 0);
          camera.seated = false // if camera is at chair
          break

          // debug
          case ' ':
          console.log(camera.position)

          // 'toggle video'
          case 'p':
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            })
            const videoTracks = stream.getVideoTracks()
            const track = videoTracks[0]
            //alert(`Getting video from: ${track.label}`)
            vid.srcObject = stream
            //setTimeout(() => { track.stop() }, 3 * 1000)
            }
            
            catch (error) {
            alert(`${error.name}`)
            console.error(error)
            }

            // Add video to chair
            if (scene.getObjectByName( 'Video' ) == undefined && camera.seated) {
              const vidcube = createVideoCube(0.01, 0.6, 0.8, camera.position.x, camera.position.y, camera.position.z)//+0.07)
              const vidcubeborder = createCube(0.02, 0.68, 0.88, vidcube.position.x*1.005, vidcube.position.y, vidcube.position.z, 0x99ddff, 'VideoBorder')
              //vidcube.rotation.y = MathUtils.degToRad()
              
              scene.add(vidcube)
              scene.add(vidcubeborder)
            }

            // Add video to screen
            else if (scene.getObjectByName( 'Video' ) == undefined && !camera.seated) {
              const screensize = screen.geometry.parameters
              const vidcube = createVideoCube(screensize.width, screensize.height, screensize.depth, screen.position.x, screen.position.y, screen.position.z)
              scene.add(vidcube)
            }
            else {
              // Remove video stuff
              var object = scene.getObjectByName( 'Video' );
              scene.remove(object)
              object.geometry.dispose();
              object.material.dispose();
              object = undefined;
              var object = scene.getObjectByName( 'VideoBorder' );
              scene.remove(object)
              object.geometry.dispose();
              object.material.dispose();
              object = undefined;            }
            break;
        }
    });  
  

  // Create a video material
  function createVideoMaterial() {
  const video = document.getElementById( 'video' );
  const texture = new VideoTexture( video )
  const material = new MeshStandardMaterial({
      map: texture,
      transparent: true
    })
  return material;
  }

  // Create a video cube
  function createVideoCube(x, y, z, pos_x, pos_y, pos_z) {
  // create a geometry
  const geometry = new BoxBufferGeometry(x,y,z);

  // create a the video material
  const material = createVideoMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  cube.position.set(pos_x, pos_y, pos_z)

  cube.name = 'Video';
  return cube;
  }
}
}
export { Cameraman };