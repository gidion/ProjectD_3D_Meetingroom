import { Raycaster, Vector2 } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

class Raycast {
  constructor(camera, controls, renderer, scene) {
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const chair_availability = {chair_l1: true, chair_r1: true, chair_l2: true, chair_r2: true, chair_l3: true, chair_r3: true, chair_l4: true, chair_r4: true} // Which chairs are available
    const chair_positions = {chair_l1: {x:-1.575, y:2.1, z:2.8}, chair_r1: true, chair_l2: true, chair_r2: true, chair_l3: true, chair_r3: true, chair_l4: true, chair_r4: true}
    var btn1 = document.querySelector("#btn_l1")
    btn1.onclick = mm_move

    function onMouseClick( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        window.requestAnimationFrame(render);

    }

    // set chair to available
    function free_chair(chair) {
      chair_availability[chair] = true
    }

    // set chair to unavailable
    function occupy_chair(chair) {
      chair_availability[chair] = false
    }

    // recolor minimap button
    function minimap_color(chair, color) {
      const btn = document.querySelector(chair) // get button element
      btn.style.setProperty( 'border-color', color )  // set color
    }

    function mm_move(){
      move_to_chair('chair_' + btn1.id.slice(-2))

    }

    function move_to_chair(chair){
      camera.position.set(chair_positions[chair]['x'], chair_positions[chair]['y'], chair_positions[chair]['z']); // set camera position to chair position
      controls.target.copy(camera.position); // set target to camera position
      controls.target.z -= 0.01; // slight offset to stop camera from freezing
    }


    function render() {

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children, true );

        for ( let i = 0; i < intersects.length; i ++ ) {
            // check if intersects with a mesh
            if ((intersects[ i ].object.name).includes('mesh')) {

              // check if mesh belongs to chair
              const parent_obj = intersects[ i ].object.parent.parent.parent
              if ((parent_obj.name).includes('chair')) {

                // check if selected chair is available
                if (chair_availability[parent_obj.name]){

                  // check if already sitting in a chair
                  if (camera.seated){
                    free_chair(camera.seated) // make current chair available again before switching seats
                    minimap_color( '#btn_' +  camera.seated.slice(-2), 'yellowgreen' ) // recolor matching minimap button to yellowgreen (available)
                  }

                  occupy_chair(parent_obj.name) // set selected chair to unavailable
                  minimap_color( '#btn_' +  parent_obj.name.slice(-2), 'tomato') // recolor matching minimap button to tomato (unavailable)

                  const chair_pos = parent_obj.position
                  const sliced = parseInt(parent_obj.name.slice(-1));

                  camera.position.set(chair_pos.x*0.7, chair_pos.y+2, 4-2*sliced+0.8); // set camera position to chair position
                  console.log(parent_obj.name,camera.position)
                  controls.target.copy(camera.position); // set target to camera position
                  controls.target.z -= 0.01; // slight offset to stop camera from freezing

                  camera.seated = parent_obj.name // if camera is at chair
                  
                  break
                }
              }
            }
        };

        renderer.render( scene, camera );

    }

    window.addEventListener( 'mousedown', onMouseClick, false );
    window.addEventListener('keyup', async function(event) {
      switch (event.key) {

        case 'r':
        case 't':
        // if currently in a chair, set that chair to available and change the matching chairs color in the minimap to yellowgreen (available)
        if (camera.seated){
          free_chair(camera.seated)
          minimap_color( '#btn_' +  camera.seated.slice(-2), 'yellowgreen')
          camera.seated = false // if camera is at chair
        }
        break
    }})
  }
}

export { Raycast };