import Synth from "./parts/synth";
import { min, max, normalize } from "./parts/utils";
import { roundRect } from "./parts/figures";
import { FG, BG, ACCENT } from "./parts/colors";

const NAME = "Lookahead";

let ctx;
let actx;
let ctrl;
let synth;
let W;
let H;
let t0 = 0;
let at0 = 0;

const PULSE = 0.25; // s

// prettier-ignore
const POPCORN = [
  0, -2, 0, -5, -9, -5, -12, null, // 0-7
  0, -2, 0, -5, -9, -5, -12, null, // 8-15
  0, 2, 3, 2, 3, 3, 0, 2, 0, 2, 2, -2, 0, -2, 0, 0, -4, 0 // 16 - 33
];

// prettier-ignore
const HALF_NOTES = [
  4,
  12,
  19, 22, 24, 27, 29, 32
];

const ROOT = 83;
const SONG = POPCORN.reduce(function (acc, n, i) {
  let durationSoFar = acc[i - 1]?.on || 0;
  let previousNoteDuration = acc[i - 1]?.dur || 0;
  let isThisNoteAHalfNote = HALF_NOTES.indexOf(i) > -1;

  let note = {
    note: n == null ? n : n + ROOT,
    on: durationSoFar + previousNoteDuration,
    dur: (isThisNoteAHalfNote ? 0.5 : 1) * PULSE,
  };
  acc.push(note);

  return acc;
}, []);

function initControls() {
  ctrl
    .createBinding(NAME)
    .addEffect(
      "Spill av",
      [
        () => {
          t0 = 0;
          at0 = actx.currentTime;
          QUEUE = [...SONG];
          loop();
        },
      ],
      {
        triggerId: 9,
      }
    )
    .addEffect(
      "Waste time",
      [
        () => {
          for (let i = 0; i < 100000; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-1, -1);
            ctx.stroke();
          }
        },
      ],
      {
        triggerId: 10,
      }
    );
}

function frame(t) {
  ctx.save();

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  ctx.translate(0.05 * W, 0.05 * H);
  let w = 0.9 * W;
  let h = 0.9 * H;

  let tInSeconds = t / 1000;
  let lastNote = SONG[SONG.length - 1];
  let totalDuration = lastNote.on + lastNote.dur;
  let timePassedAsPercentage = tInSeconds / totalDuration;

  let notes = SONG.map(({ note }) => note);
  let highestNote = max(notes);
  let lowestNote = min(notes);
  let yStep = h / Math.abs(highestNote - lowestNote);

  for (let i = 0; i < SONG.length; i++) {
    let { note, on, dur } = SONG[i];
    if (note == null) continue;

    let notePos = on;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = tInSeconds > notePos;

    let durationAsPercentage = dur / totalDuration;

    let y = h - normalize(lowestNote - 1, highestNote, note) * h;
    let x = notePosAsPercentage * w;

    ctx.fillStyle = isActive ? ACCENT : FG;
    roundRect(ctx, x, y, durationAsPercentage * w, yStep, 0.01 * w);
    ctx.fill();
  }

  ctx.strokeStyle = ACCENT;
  ctx.beginPath();
  ctx.moveTo(timePassedAsPercentage * w, 0);
  ctx.lineTo(timePassedAsPercentage * w, h);
  ctx.lineWidth = 0.01 * w;
  ctx.stroke();

  ctx.restore();
}

let rAF;
const LOOKAHEAD = 0.75;

let QUEUE = [...SONG];

function loop(t) {
  if (!t0) t0 = t;

  let lastNote = SONG[SONG.length - 1];
  let durationInSeconds = lastNote.on + lastNote.dur;
  let tMax = 1000 * durationInSeconds;

  let deltaT = t - t0;

  rAF = requestAnimationFrame(loop);
  if (deltaT > tMax) {
    cancelAnimationFrame(rAF);
    frame(0);
    return;
  }

  let scheduleThreshold = deltaT / 1000 + LOOKAHEAD;
  while (QUEUE.length && QUEUE[0].on < scheduleThreshold) {
    let { note, on, dur } = QUEUE[0];
    QUEUE.splice(0, 1);

    if (note == null) continue;

    synth.play(note, at0 + on, dur);
  }

  frame(deltaT);
}

function init(canvas, controls, audioContext) {
  ctx = canvas.getContext("2d");
  actx = audioContext;
  ctrl = controls;
  synth = new Synth(actx);

  W = canvas.width;
  H = canvas.height;

  initControls(controls);
  frame(0);
}

export function start(canvas, controls, audioContext) {
  init(canvas, controls, audioContext);
}

export function stop() {
  ctrl.removeBinding(NAME);
}
