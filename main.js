function setup(){
    canvas=createCanvas(380,380)
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status:Detecting objects"
}

img="";
status=""
objects=[];
song="";
function preload(){
   song=loadSound("mom_is_calling.mp3")
}

function draw(){
    image(video,0,0,380,380);
    if(status !=""){
        r= random(255);
        b= random(255);
        g= random(255);
        objectdetector.detect(video,gotresults);
        for ( i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status: object detected";
            fill(r,g,b);
percent= floor(objects[i].confidence) *100;
text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y)
noFill(); 
stroke(r,g,b)   
rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height);  
if(objects[i].label=="person"){
    document.getElementById("numberofobjects").innerHTML= "Baby is Found";
    song.stop();
}
else{
    document.getElementById("numberofobjects").innerHTML= "Baby not Found";
 song.play()
}

}
if(objects.length==0){
    document.getElementById("numberofobjects").innerHTML= "Baby not Found";
song.play();  
}
    }
}

function modelloaded(){
    console.log("modelloaded")
    status=true;
}

function gotresults(error,results){
    if(error){
        console.log(error)
    }
    console.log(results)
    objects=results;

}

