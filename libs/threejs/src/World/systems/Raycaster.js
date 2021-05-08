import { Raycaster, Vector2 } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

class Raycast {
  constructor(camera, controls, renderer, scene) {
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    function onMouseClick( event ) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        window.requestAnimationFrame(render);
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
              if ((intersects[ i ].object.parent.parent.parent.name).includes('chair')) {

                const chair_pos = intersects[ i ].object.parent.parent.parent.position
                const sliced = parseInt(intersects[ i ].object.parent.parent.parent.name.slice(-1));
                camera.position.set(chair_pos.x*0.7,
                                    chair_pos.y+2,
                                    4-2*sliced+0.8);
                
                controls.target.copy(camera.position);
                controls.target.z -= 0.01;
                camera.seated = true // if camera is at chair
                break
              }
            }
        };

        renderer.render( scene, camera );

    }

    window.addEventListener( 'mousedown', onMouseClick, false );
  }
}

export { Raycast };