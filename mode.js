function switchMode(){
    if(currentMode == "Editor Mode"){
        currentMode = "Play Mode";
        document.getElementById("mode").innerHTML = "Play Mode";
        alert("You are now in Play Mode");
    }
    else{
        document.getElementById("mode").innerHTML = "Editor Mode";
        currentMode = "Editor Mode";
        alert("You are now in Editor Mode");
    }
}