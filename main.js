song="";
rightwristscore=0;
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
        rightwristscore=results[0].pose.keypoints[10].score;
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
    if (rightwristscore>0.2){
        circle(rightwristx,rightwristy,20);
        if(rightwristx>0&rightwristx<=100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="speed:0.5x";
        }
        if(rightwristx>100&rightwristx<=200){
            song.rate(1);
            document.getElementById("speed").innerHTML="speed:1x";
        }
        if(rightwristx>200&rightwristx<=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="speed:1.5x";
        }
        if(rightwristx>300&rightwristx<=400){
            song.rate(2);
            document.getElementById("speed").innerHTML="speed:2x";
        }
        if(rightwristx>400&rightwristx<=500){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="speed:2.5x";
        }
}
}