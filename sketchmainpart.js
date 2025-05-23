const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";
let pitch;
let audioContext;
let mic;
let freq = 0;
let threshold = 10;
let diff;
let notes = [
  { note: "High E", freq: 330 },
  { note: "B", freq: 247 },
  { note: "G", freq: 196 },
  { note: "D", freq: 147 },
  { note: "A", freq: 110 },
  { note: "Low E", freq: 82 },
];
function setup() {
  createCanvas(400, 400);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(listening);
  // pitch=ml5.pitchDetection(model_url,audioContext,mic.stream,modelLoaded);
}
function listening() {
  console.log("listening");
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}
function gotPitch(error, Frequency) {
  if (error) {
    console.error(error);
  } else {
    if (Frequency) {
      freq = Frequency;
    }
    //console.log(Frequency);
    pitch.getPitch(gotPitch);
  }
}
function modelLoaded() {
  console.log("model loaded hehehehe");
  pitch.getPitch(gotPitch);
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text(freq.toFixed(2), width / 2, height - 150);

  let closestNote = -1;
  let recordDiff = Infinity;
  for (let i = 0; i < notes.length; i++) {
    let diff = freq - notes[i].freq;
    if (abs(diff) < abs(recordDiff)) {
      closestNote = notes[i];
      recordDiff = diff;
    }
  }

  textSize(64);
  text(closestNote.note, width / 2, height - 50);

  let diff = recordDiff;
  let alpha = map(abs(diff), 0, 100, 255, 0);
  function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);
  text(freq.toFixed(2), width / 2, height - 150);

  let closestNote = -1;
  let recordDiff = Infinity;
  for (let i = 0; i < notes.length; i++) {
    let diff = freq - notes[i].freq;
    if (abs(diff) < abs(recordDiff)) {
      closestNote = notes[i];
      recordDiff = diff;
    }
  }

  textSize(64);
  text(closestNote.note, width / 2, height - 50);

  let diff = recordDiff;
  // let amt = map(diff, -100, 100, 0, 1);
  // let r = color(255, 0, 0);
  // let g = color(0, 255, 0);
  // let col = lerpColor(g, r, amt);

  let alpha = map(abs(diff), 0, 100, 255, 0);
  rectMode(CENTER);
  fill(255, alpha);
  stroke(255);
  strokeWeight(1);
  if (abs(diff) < threshold) {
    fill(0, 255, 0);
  }
  rect(200, 100, 200, 50);

  stroke(255);
  strokeWeight(4);
  line(200, 0, 200, 200);

  noStroke();
  fill(255, 0, 0);
  if (abs(diff) < threshold) {
    fill(0, 255, 0);
  }
  rect(200 + diff / 2, 100, 10, 75);
}
rectMode(CENTER);
  fill(255, alpha);
  stroke(255);
  strokeWeight(1);
  if (abs(diff) < threshold) {
    fill(0, 255, 0);
  }
  rect(200, 100, 200, 50);

  stroke(255);
  strokeWeight(4);
  line(200, 0, 200, 200);

  noStroke();
  fill(255, 0, 0);
  if (abs(diff) < threshold) {
    fill(0, 255, 0);
  }
  rect(200 + diff / 2, 100, 10, 75);
}
