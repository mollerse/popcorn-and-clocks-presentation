import Synth from "./parts/synth";
import { min, max, normalize } from "./parts/utils";
import { roundRect } from "./parts/figures";
import { FG, BG, ACCENT } from "./parts/colors";

const NAME = "Single Loop Fixed";

let ctx;
let actx;
let ctrl;
let synth;
let W;
let H;
let t0 = 0;
let now = () => actx.currentTime;

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
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));

function initControls() {
  ctrl
    .createBinding(NAME)
    .addEffect(
      "Play sound and animate",
      [
        () => {
          t0 = 0;
          notePointer = 0;
          nextBeat = 0;
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
  let totalDuration = (SONG.length - HALF_NOTES.length * 0.5) * PULSE;
  let timePassedAsPercentage = tInSeconds / totalDuration;

  let highestNote = max(SONG);
  let lowestNote = min(SONG);
  let yStep = h / Math.abs(highestNote - lowestNote);

  let offset = 0;

  for (let i = 0; i < SONG.length; i++) {
    if (SONG[i] == null) {
      offset += PULSE;
      continue;
    }

    let isHalfNote = HALF_NOTES.indexOf(i) > -1;

    let notePos = offset;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = tInSeconds > notePos;

    let duration = isHalfNote ? 0.5 * PULSE : PULSE;
    let durationAsPercentage = duration / totalDuration;

    let y = h - normalize(lowestNote - 1, highestNote, SONG[i]) * h;
    let x = notePosAsPercentage * w;

    ctx.fillStyle = isActive ? ACCENT : FG;
    roundRect(ctx, x, y, durationAsPercentage * w, yStep, 0.01 * w);
    ctx.fill();

    offset += duration;
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
let notePointer = 0;
let nextBeat = 0;

function loop(t) {
  if (!t0) t0 = t;

  let durationInSeconds = (SONG.length - HALF_NOTES.length * 0.5) * PULSE;
  let tMax = 1000 * durationInSeconds;

  let deltaT = t - t0;

  rAF = requestAnimationFrame(loop);
  if (deltaT > tMax) {
    cancelAnimationFrame(rAF);
    frame(0);
    return;
  }

  let beatNumber = deltaT / (1000 * PULSE);

  if (beatNumber > nextBeat) {
    let noteToPlay = SONG[notePointer];
    let isHalfNote = HALF_NOTES.indexOf(notePointer) > -1;
    let dur = isHalfNote ? 0.5 * PULSE : PULSE;

    synth.play(noteToPlay, now(), dur);

    nextBeat = nextBeat + (isHalfNote ? 0.5 : 1);
    notePointer++;
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
