import Synth from "./parts/synth";
import { min, max, normalize } from "./parts/utils";
import { roundRect } from "./parts/figures";
import { FG, BG, ACCENT } from "./parts/colors";

const NAME = "Audio Clock";

let ctx;
let actx;
let ctrl;
let pianoCtrl;
let synth;
let W;
let H;
let t0 = 0;

function round(n) {
  return n.toFixed(2);
}

function initControls() {
  ctrl
    .createBinding(NAME)
    .addNumberValue("A", [0, 0, 1.0, 0.01], {
      triggerId: 21,
      onChange: ({ value }) => {
        synth.A = value;
      },
    })
    .addNumberValue("D", [0.5, 0, 1.0, 0.01], {
      triggerId: 22,
      onChange: ({ value }) => {
        synth.D = value;
      },
    })
    .addNumberValue("S", [0, 0, 1.0, 0.01], {
      triggerId: 23,
      onChange: ({ value }) => {
        synth.S = value;
      },
    })
    .addNumberValue("R", [0, 0, 1.0, 0.01], {
      triggerId: 24,
      onChange: ({ value }) => {
        synth.R = value;
      },
    })
    .addEffect(
      "Spill av",
      [
        () => {
          t0 = actx.currentTime;
          loop();
        },
      ],
      {
        triggerId: 9,
      }
    );
}

function initPiano() {
  let { in: piano } = pianoCtrl.getDevices();
  if (!piano) return;

  piano.onmidimessage = function ({ data }) {
    let [eventId, note] = data;

    const UP = 128;
    const DOWN = 144;

    if (eventId === UP) {
      synth.noteOff(note);
    } else if (eventId === DOWN) {
      synth.noteOn(note);
    }
  };
}

function frame(t) {
  let totalDuration = 60;
  let timePassedAsPercentage = t / totalDuration;

  ctx.save();

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, 0.05 * H);

  ctx.fillStyle = FG;
  ctx.font = `${0.05 * H}px monospace`;
  ctx.textBaseline = "top";
  ctx.fillText(
    `A: ${round(synth.A)} D: ${round(synth.D)} S: ${round(synth.S)} R: ${round(
      synth.R
    )}`,
    0.05 * W,
    0
  );
  ctx.fillStyle = BG;

  ctx.translate(0.05 * W, 0.05 * H);
  let w = 0.9 * W;
  let h = 0.9 * H;

  ctx.fillRect(
    timePassedAsPercentage * w + 0.005 * w,
    0,
    w - timePassedAsPercentage * w,
    h
  );

  let highestNote = 83 + 3;
  let lowestNote = 83 - 12;
  let yStep = h / Math.abs(highestNote - lowestNote);

  let activeNotes = Object.keys(synth.notes);
  for (let i = 0; i < activeNotes.length; i++) {
    let note = activeNotes[i];

    let y = h - normalize(lowestNote - 1, highestNote, note) * h;
    let x = timePassedAsPercentage * w;

    ctx.fillStyle = ACCENT;
    roundRect(ctx, x, y, 0.005 * w, yStep, 0.01 * w);
    ctx.fill();
  }

  ctx.strokeStyle = ACCENT;
  ctx.beginPath();
  ctx.moveTo(timePassedAsPercentage * w + 0.0115 * w, 0);
  ctx.lineTo(timePassedAsPercentage * w + 0.0115 * w, h);
  ctx.lineWidth = 0.01 * w;
  ctx.stroke();

  ctx.restore();
}

let rAF;
function loop() {
  let tMax = 60;

  let deltaT = actx.currentTime - t0;

  rAF = requestAnimationFrame(loop);
  if (deltaT > tMax) {
    cancelAnimationFrame(rAF);
    frame(0);
    return;
  }

  frame(deltaT);
}

function init(canvas, controls, audioContext, piano) {
  ctx = canvas.getContext("2d");
  actx = audioContext;
  ctrl = controls;
  pianoCtrl = piano;
  synth = new Synth(actx);

  W = canvas.width;
  H = canvas.height;

  initControls(controls);
  initPiano(piano);
  frame(0);
}

export function start(canvas, controls, audioContext, piano) {
  init(canvas, controls, audioContext, piano);
}

export function stop() {
  ctrl.removeBinding(NAME);
}
