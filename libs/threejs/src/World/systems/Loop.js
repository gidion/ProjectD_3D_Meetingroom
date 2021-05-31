import { MeshBasicMaterial, VideoTexture, Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

const clock = new Clock()

let additional_member_amount = -1;
//1 second
const update_thick_limit = 30;
let update_timer = 0;

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

  //updates every second
  update(){
    this.update_user_models();
  }

  tick() {
    // get time since last frame
    const delta = clock.getDelta()

    for (const object of this.updateables) {
      object.tick(delta)
    }

    update_timer += 1;
    //check if to do update
    if(update_timer >= update_thick_limit){
      this.update();
      update_timer = 0;
    }
  }

  update_user_models(){
    //foreach member
    var videos = document.getElementsByTagName("video");

    //filter out non member video divs
    var member_videos = this.filter_video_divs_members_only(videos);
    const max_video_persons = 8;
    
    //loop through each person 3D object/webcam renderer
    for (let i = 0; i < max_video_persons; i++) 
    {
      //disable each person, and re-enable if needed
      let person_object = this.scene.getObjectByName("person_" + (i + 1));
      person_object.visible = false;
      //if i is under amount of members
      if(i < member_videos.length)
      {
        //video div
        const vid_div = member_videos[i];

        //if exists
        if(person_object != null){
          console.log("found person");
          //object.visible = false; 
          //create video material
          const vid_material = this.createVideoMaterialPerson(vid_div);  
          // create a Mesh containing the geometry and material
          person_object.material = vid_material;
          //re-enable person
          person_object.visible = true;
          
        }
      }
    }
    //update members in 3D room, if member amount has changedd
    if(additional_member_amount != member_videos.length){

    //+1 to include current user
    let total = member_videos.length + 1;
    console.log("There are currently : " + total + " members in the call.");

    additional_member_amount = member_videos.length;
   }
  }

  filter_video_divs_members_only(divs){
    var videos = [];

    //filter, to only contain vidoes from user
    if (divs.length) {
      for (let index = 0; index < divs.length; index++) {
        if (divs[index].id.lastIndexOf("remoteVideo_", 0) === 0) {
          //console.log(element + " - " + element.id);
          videos.push(divs[index]);
        }
      }
        //do code if element(s) are present
    }
    return videos;
  }

  // Create a video material
  createVideoMaterialPerson(video_div) {
    const video_texture = new VideoTexture( video_div );
    video_texture.frameRate = 24;
    var video_material = new MeshBasicMaterial({map: video_texture});
    return video_material
  }
}
export { Loop }