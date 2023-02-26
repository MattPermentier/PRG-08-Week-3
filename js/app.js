let synth = window.speechSynthesis;

const element = document.getElementById("imageResult");

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

window.addEventListener("load", (event) => {
  speak("Maak een foto van een Dopper of een scheerapparaat");
});

function startImageScan() {
  const classifier = ml5.imageClassifier("./model.json", "./model.weights.bin");

  classifier.classify(
    document.getElementById("uploadedImage"),
    imageScanResult
  );
  element.innerHTML = "...";
}

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
