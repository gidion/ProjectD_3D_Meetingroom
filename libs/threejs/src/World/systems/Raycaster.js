import { Raycaster, Vector2 } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

class Raycast {
  constructor(camera, controls, renderer, scene) {
    const raycaster = new Raycaster()
    const mouse = new Vector2()
    const chair_availability = {chair_l1: true, chair_r1: true, chair_l2: true, chair_r2: true,
                                chair_l3: true, chair_r3: true, chair_l4: true,chair_r4: true} // Which chairs are available
    const chair_positions = {chair_l1: {x:-1.575, y:2.1, z:2.8}, chair_r1: {x:1.75, y:2.1, z:2.8}, chair_l2: {x:-1.575, y:2.1, z:0.8}, chair_r2: {x:1.75, y:2.1, z:0.8}, chair_l3: {x:-1.575, y:2.1, z:-1.2}, chair_r3: {x:1.75, y:2.1, z:-1.2},
                             chair_l4: {x:-1.575, y:2.1, z:-3.2}, chair_r4: {x:1.75, y:2.1, z:-3.2}}

    // !!! make dry later
    var btn_l1 = document.querySelector("#btn_l1")
    btn_l1.onclick = mm_movel1
    var btn_r1 = document.querySelector("#btn_r1")
    btn_r1.onclick = mm_mover1
    var btn_l2 = document.querySelector("#btn_l2")
    btn_l2.onclick = mm_movel2
    var btn_r2 = document.querySelector("#btn_r2")
    btn_r2.onclick = mm_mover2
    var btn_l3 = document.querySelector("#btn_l3")
    btn_l3.onclick = mm_movel3
    var btn_r3 = document.querySelector("#btn_r3")
    btn_r3.onclick = mm_mover3
    var btn_l4 = document.querySelector("#btn_l4")
    btn_l4.onclick = mm_movel4
    var btn_r4 = document.querySelector("#btn_r4")
    btn_r4.onclick = mm_mover4

    function onMouseClick( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

        window.requestAnimationFrame(render)
    }

    // set chair to available
    function free_chair(chair) {
      chair_availability[chair] = true
      minimap_color( '#btn_' +  camera.seated.slice(-2), 'yellowgreen' ) // recolor matching minimap button to yellowgreen (available)
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

    // !!! make dry later
    function mm_movel1(){
      //move_to_chair('chair_' + btn1.id.slice(-2))
      move_to_chair('chair_l1')
    }
    function mm_mover1(){
      move_to_chair('chair_r1')
    }
    function mm_movel2(){
      move_to_chair('chair_l2')
    }
    function mm_mover2(){
      move_to_chair('chair_r2')
    }
    function mm_movel3(){
      move_to_chair('chair_l3')
    }
    function mm_mover3(){
      move_to_chair('chair_r3')
    }
    function mm_movel4(){
      move_to_chair('chair_l4')
    }
    function mm_mover4(){
      move_to_chair('chair_r4')
    }
    

    function move_to_chair(chair){
      if (camera.seated) {
        free_chair(camera.seated)
      }
      occupy_chair(chair)
      minimap_color( '#btn_' +  chair.slice(-2), 'tomato') // recolor matching minimap button to tomato (unavailable)

      camera.position.set(chair_positions[chair]['x'], chair_positions[chair]['y'], chair_positions[chair]['z']) // set camera position to chair position
      controls.target.copy(camera.position) // set target to camera position
      controls.target.z -= 0.01 // slight offset to stop camera from freezing
      camera.seated = chair
    }

    function render() {

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera )

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children, true )

        for ( let i = 0; i < intersects.length; i ++ ) {
            // check if intersects with a mesh
            console.log(intersects[ i ].object.name)
            if ((intersects[ i ].object.name).includes('mesh')) {

              // check if mesh belongs to chair
              var chair_name = intersects[ i ].object.parent.parent.parent.name
              if ((chair_name).includes('chair')) {

                // check if selected chair is available
                if (chair_availability[chair_name]){

                  // check if already sitting in a chair
                  if (camera.seated){
                    free_chair(camera.seated) // make current chair available again before switching seats
                  }
                  move_to_chair(chair_name)
                  break
                }
              }
            }
            else if ((intersects[ i ].object.name).includes('Rectangle')) {
              alert('Coffee')
              break
            }

            else if ((intersects[ i ].object.name).includes('outer')) {
              alert('Bell')
              break
            }
        }
        renderer.render( scene, camera )
    }

    window.addEventListener( 'mousedown', onMouseClick, false )
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

export { Raycast }