import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updateables = []; // list of animated items that need to update / tick
  }

  start() {
    this.renderer.setAnimationLoop(() => {
    // tell every animated object to tick forward one frame
    this.tick();

    // render a frame
    this.renderer.render(this.scene, this.camera)
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // get time since last frame
    const delta = clock.getDelta();

    for (const object of this.updateables) {
      object.tick(delta);
    }
  }
}

export { Loop }