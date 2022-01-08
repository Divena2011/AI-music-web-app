song="";
rightWristX=0;
rightWristY=0;
leftwristX=0;
leftWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
    song = loadSound("music.mp3")
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    poseNet= ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video,0,0,600,500);
  fill("#48C9B6");
  stroke("#BA48C9");
  if (scoreRightWrist >0.2){
  circle(rightWrist,rightWristY,20);
  if(rightWristY>0 && rightWristY<=100){
      document.getElementById("speed").innerHTML="Speed=0.5x";
      song.rate(0.5);
  }
 else if(rightWristY >100 && rightWristY<=200){
document.getElementById("speed").innerHTML="Speed=1x";
song.rate(1);
 }
 else if(rightWristY >200 && rightWristY <=300){
     document.getElementById("speed").innerHTML="Speed= 1.5x";
     song.rate(1.5);
 }
 else if(rightWristY >300 && rightWristY <=400){
     document.getElementById("speed").innerHTML= " speed = 2px";
     song.rate(2);
 }
 else if(rightWristY > 400 && rightWristY <= 500){
     document.getElementById("speed").innerHTML= "Speed = 2.5px";
     song.rate(2);
 }
  if(scoreLeftWrist=-0.2){
    circle(leftWristX,leftWristY,20);
    InnumberleftWristY= Number(leftWristY);
    remove_decimals=floor(InnumberleftWristY);
    volume= remove_decimals/500;
    document.getElementById("volume").innerHTML= "Volume="+volume;
    song.setVolume(volume);
  }
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log('PoseNet is initialized');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        console.log("ScoreRightWrist="+ scoreRightWrist + "scoreLeftWrist="+ scoreLeftWrist);
        scoreLeftWrist= results[0].pose.keypoinjts[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("rightWristX="+ rightWristX+" rightWristY="+rightWristY);
        console.log("leftWristX="+ leftWristX+" leftWristY="+rightWristY);
    }
}
