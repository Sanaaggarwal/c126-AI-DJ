song="";
leftwristscore=0;
leftwristx=0;
rightwristx=0;
leftwristy=0;
rightwristy=0;
function preload(){
    song=loadSound("music.mp3")
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',getposes)
}
function modelloaded(){
    console.log("Posenet is Initialized");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}
function getposes(results){
    if (results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristx="+leftwristx);
        console.log("leftwristy="+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("rightwristx="+rightwristx);
        console.log("rightwristy="+rightwristy);
        leftwristscore=results[0].pose.keypoints[9].score;
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(leftwristscore>0.2){
        circle(leftwristx,leftwristy,20);
        newleftwristy=Number(leftwristy);
        removedecimals=floor(newleftwristy);
        volume=removedecimals/500;
        document.getElementById("volume").innerHTML="volume:"+volume;
        song.setVolume(volume);
    }
}