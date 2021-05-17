import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

const clock = new Clock()

let additional_member_amount = -1;

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updateables = [] // list of animated items that need to update / tick
  }

  
  start() {
    this.renderer.setAnimationLoop(() => {
    // tell every animated object to tick forward one frame
    this.tick()

    // render a frame
    this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    // get time since last frame
    const delta = clock.getDelta()

    for (const object of this.updateables) {
      object.tick(delta)
    }

      //foreach member
      var videos = document.getElementsByTagName("video");

      var member_videos = [];

      if (videos.length) {
        for (let index = 0; index < videos.length; index++) {
          if (videos[index].id.lastIndexOf("remoteVideo_", 0) === 0) {
            //console.log(element + " - " + element.id);
            member_videos.push(videos[index]);
          }
        }
          //do code if element(s) are present
      }
      //update members in 3D room
      if(additional_member_amount != member_videos.length){
      //CHANGE 3D ROOM LAYOUT
      //for i in videos
                                              //+1 to include current user
      let total = member_videos.length + 1;
      console.log("There are currently : " + total + " members in the call.");

      additional_member_amount = member_videos.length;
     }
  }
}

export { Loop }