Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot(){
    Webcam.snap(function (data_uri){
       document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';

    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/_hHhkFTDr/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function check()
{
    capimg = document.getElementById('captured_image');
    classifier.classify(capimg, gotResult);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The prediction for gesture is " + prediction;
    
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function gotResult(error, results)
{
    if (error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Best"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
            speak_data = "This gesture means ALL THE BEST"; 
        }
        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
            speak_data = "This gesture shows that you are saying THIS IS LOOKING AMAZING"; 
        }
        if(results[0].label == "Victory"){ 
            document.getElementById("update_gesture").innerHTML = "&#9996;";
            speak_data = "If you make this posture of your hand, it means THAT WAS A MARVELOUS VICTORY"; 
        }
        var synth = window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }
}