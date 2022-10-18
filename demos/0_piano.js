import Synth from "./parts/synth";
import { FG, BG, ACCENT } from "./parts/colors";

const NAME = "Piano Demo";

let ctx;
let actx;
let ctrl;
let pianoCtrl;
let synth;
let W;
let H;

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
    });
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

function frame() {
  ctx.save();

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = FG;
  ctx.font = `${0.1 * H}px monospace`;
  ctx.textBaseline = "top";
  ctx.fillText(
    `A: ${round(synth.A)} D: ${round(synth.D)} S: ${round(synth.S)} R: ${round(
      synth.R
    )}`,
    0.05 * W,
    0.15 * H
  );

  ctx.restore();
}

let rAF;
function loop() {
  rAF = requestAnimationFrame(loop);
  frame();
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
  loop();
}

export function start(canvas, controls, audioContext, piano) {
  init(canvas, controls, audioContext, piano);
}

export function stop() {
  cancelAnimationFrame(rAF);
  ctrl.removeBinding(NAME);
}
