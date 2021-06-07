import { MeshBasicMaterial, VideoTexture, Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js'

const clock = new Clock()

let additional_member_amount = -1;
//1 second
const update_thick_limit = 30;
let update_timer = 0;

const lateupdate_thick_limit = 5;
let lateupdate_timer = 0;
 
let participants_data = [];

class Participant_data {
  constructor(name, render) {
    this.name = name
    this.render = render
  }
}

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
    this.update_user_models(false);
    this.update_participants_renders(participants_data);

    lateupdate_timer += 1;
    //check if to do update
    if(lateupdate_timer >= lateupdate_thick_limit){
      this.lateupdate();
      lateupdate_timer = 0;
    }

  }
  
  //updates every second
  lateupdate(){
    this.update_user_models(true);
    this.update_participants_renders(participants_data);
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

  update_user_models(overide){
    //get head div, with all participants
    const filmstrip = document.getElementById("filmstripRemoteVideosContainer");
    //filter participants
    const participants = this.filter_video_divs_participants_only(filmstrip.children);
    
    const max_video_persons = 8;

    //check if participants have changed, or if overide is true(late update)
    if(this.participants_have_changed(participants_data, participants, overide))
    {
      participants_data = [];
      //foreach participants
      for (let i = 0; i < max_video_persons; i++) {
        //reset participants
        const person_object = this.scene.getObjectByName("person_" + (i + 1));
        if(person_object != null)
        {
          person_object.visible = false;
          //if i is under amount of members
          if(i < participants.length)
          {
            //set material for render
            //get video div
            const vid_div = this.get_participant_video(participants[i]);
            //if participant has vidoe
            if(vid_div != null){
            //use video texture
              const vid_material = this.createVideoMaterialPerson(vid_div);
              // create a Mesh containing the geometry and material
              person_object.material = vid_material;
            }
            //else use standard texture
            console.log("found person");
            //get name
            console.log(this.get_participant_name(participants[i].id));
            //re-enable person
            person_object.visible = true;
            //store participant data 
            //participants_names.push(participants[i].id);
            //participants_objects.push(person_object);
            participants_data.push(new Participant_data(participants[i].id,person_object));
          }
          else
          {
            console.log("person not found");
          }            
        }
      }
      //update members in 3D room, if member amount has changedd
    
      //+1 to include current user
      let total = participants.length + 1;
      console.log("There are currently : " + total + " members in the call.");
      additional_member_amount = participants_data.length;
    }
  }

  update_participants_renders(p_d){
    console.log("data size: " + p_d.length);
    for (let i = 0; i < p_d.length; i++) {
      p_d[i].render.quaternion.copy(this.camera.quaternion);
    }
  }

  participants_have_changed(old_participants, current_participants, overide){
    //amount has changed
    if(overide == true){
      console.log("overide");
      return true;
    }
    if(additional_member_amount != current_participants.length){
      console.log("wrong amount- " + additional_member_amount + " x " + current_participants.length);
      return true;
    }
    //check if all old_participants are still in current one(none have left)
    for (let i = 0; i < old_participants.length; i++) {
      let found_again = false;
      //foreach in current
      for (let j = 0; j < current_participants.length; j++) {
        //found old id in current id
      
        if(old_participants[i].name == current_participants[j].id){
          found_again = true;
        }
      }
      //old participant id is missing
      if(found_again == false){
        console.log("no name found");
        return true;
      }
    }
    return false;
  }

  get_participant_video(element){
    for (let i = 0; i < element.children.length; i++) {
      if(element.children[i].tagName == "VIDEO" || element.children[i].tagName == "video"){
        return element.children[i];
      }
    }
    return null;
  }

  get_participant_name(participant_id){
    //get element.text containing participant_id
    const participant_name = document.getElementById(participant_id +"_name").innerText;
    return participant_name;
  }

  filter_video_divs_participants_only(divs){
    var videos = [];

    //filter, to only contain vidoes from user
    if (divs.length) {
      for (let index = 0; index < divs.length; index++) {
        if (divs[index].id.lastIndexOf("participant_", 0) === 0) {
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