//camera.rotation.y = 0
//is now true, because gazer is automaticly paused on start
var paused = false;
//var gazer_active = false;
// devide screen into sections and return target section
function deviser(cameraRotation){
    // amount of devisions in the window
    var divisions = 6;
    var divisionSize = 180/divisions;
    for(i = 0; i < divisions; i++){
        if(cameraRotation >= (divisionSize*i) && cameraRotation <= (divisionSize*(i+1))){
            // return center of devided space for the target rotation
            return (((divisionSize*(i+1)) - (divisionSize*i) / 2) + (divisionSize*i)) - 90;
        }
    }
}

// pause eye tracking / TODO: add button on html page
function gazePauser(){
    /*if(!gazer_active)
    {
        console.log("activate webgazer");
    //set webgazer/eyetracker listener
    webgazer.setGazeListener(function(data, timestamp) {
      var windowWidth = window.innerWidth;
      var windowCenter = windowWidth / 2;
      var degreeRotation = camera.rotation.y * 180 / Math.PI;
  
      try{
          // main camera rotation
          if(data.x < windowCenter){
              var pixelPerRotation = 90*((windowCenter - data.x) / windowCenter);
              rotateCam(deviser(degreeRotation - (degreeRotation - pixelPerRotation)), degreeRotation, 3, camera);
          }
          if(data.x > windowCenter){
              var pixelPerRotation = 90*((data.x - windowCenter) / windowCenter);
              rotateCam(deviser(degreeRotation + (pixelPerRotation - degreeRotation)), degreeRotation, 3, camera);
          }        
      }
      catch{
        console.log("error");
      }
      camera.rotation.y = 0;
    }).begin();
    gazer_active = true;
    }
*/
    if(paused == true){
        webgazer.resume();
        console.log("webgazer resumed");     
        paused = false;
        return;
    }
    if(paused == false){
        webgazer.pause();
        console.log("webgazer paused");  
        paused = true;
        return;
    }
}

// animated rotation
function rotateCam(targetRotation, degreeRotation, degree, camera){
    /*console.log("target degree rotation: " + targetRotation);
    console.log("current degree rotation:" + degreeRotation);
    console.log("current radian rotation: " + camera.rotation.y);
    */
    if(degreeRotation < targetRotation){
        if(targetRotation - 5 < degreeRotation && targetRotation + 5 > degreeRotation){
            degreeRotation = targetRotation;
        }
        else{
            camera.rotateY(-(degree * Math.PI / 180));
        }
    }
    if(degreeRotation > targetRotation) {
        if(targetRotation - 5 < degreeRotation && targetRotation + 5 > degreeRotation){
            degreeRotation = targetRotation;
        }
        else{
            camera.rotateY(degree * Math.PI / 180);
        }
    } 
}
webgazer.pause();
/*
// main webgazer loop  old
webgazer.setGazeListener(function(data, timestamp) {
    var windowWidth = window.innerWidth;
    var windowCenter = windowWidth / 2;
    var degreeRotation = camera.rotation.y * 180 / Math.PI;

    try{
        // main camera rotation
        if(data.x < windowCenter){
            var pixelPerRotation = 90*((windowCenter - data.x) / windowCenter);
            rotateCam(deviser(degreeRotation - (degreeRotation - pixelPerRotation)), degreeRotation, 3);
        }
        if(data.x > windowCenter){
            var pixelPerRotation = 90*((data.x - windowCenter) / windowCenter);
            rotateCam(deviser(degreeRotation + (pixelPerRotation - degreeRotation)), degreeRotation, 3);
        }        
    }
    catch{ }   
}).begin();
//jitsi version
webgazer.setGazeListener(function(data, timestamp) {
      var windowWidth = window.innerWidth;
      var windowCenter = windowWidth / 2;
      var degreeRotation = camera.rotation.y * 180 / Math.PI;
  
      try{
          // main camera rotation
          if(data.x < windowCenter){
              var pixelPerRotation = 90*((windowCenter - data.x) / windowCenter);
              rotateCam(deviser(degreeRotation - (degreeRotation - pixelPerRotation)), degreeRotation, 3, camera);
          }
          if(data.x > windowCenter){
              var pixelPerRotation = 90*((data.x - windowCenter) / windowCenter);
              rotateCam(deviser(degreeRotation + (pixelPerRotation - degreeRotation)), degreeRotation, 3, camera);
          }        
      }
      catch{ }   
  }).begin();
*/