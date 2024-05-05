Webcam.set({//the set function sets the properties of the camera
    width:350,
    height:300,
    img_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");


//Use attach( '#camera' )
Webcam.attach( '#camera' )   

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}


console.log('ml5 version : ', ml5.version);
//imageClassifier is a predefined function of ml5.js that is used to trigger the ml5.js image classification function
//we are adding model.json at the end of the link because we just want to access the model created in a teachable machine and nothing else from the model which has been created.
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/rbX6a9qLI/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);

        //give id as  result_object_name
        document.getElementById("result_object_name").innerHTML = results[0].label;

        //add   results[0].confidence.toFixed(2)*100+"%"
        document.getElementById("result_object_accuracy").innerHTML =  results[0].confidence.toFixed(2)*100+"%";
    }
}