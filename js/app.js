let synth = window.speechSynthesis;

// Create a variable containing the result container
const element = document.getElementById("imageResult");

function startImageScan() {
  // Create a variable to initialize the ml5.js image classifier with MobileNet
  const classifier = ml5.imageClassifier("./model.json", "./model.weights.bin");

  // Scan the uploaded image
  classifier.classify(
    document.getElementById("uploadedImage"),
    imageScanResult
  );
  element.innerHTML = "...";
}

function speak(text) {
  if (synth.speaking) {
    console.log("still speaking...");
    return;
  }
  if (text !== "") {
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
    console.log(text);
  }
}

window.addEventListener("load", () => {
  speak("Maak een foto van een Dopper of een scheerapparaat");
});

// Check for errors and display the results if there aren't any
async function imageScanResult(error, results) {
  if (error) {
    element.innerHTML = error;
  } else {
    let num = (await results[0].confidence) * 100;
    element.innerHTML = results[0].label + " " + num.toFixed(0) + "%";
    speak(results[0].label);
  }
}
