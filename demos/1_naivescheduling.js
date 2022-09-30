import Synth from "./parts/synth";
import { min, max, normalize } from "./parts/utils";
import { roundRect } from "./parts/figures";
import { FG, BG, ACCENT } from "./parts/colors";

const NAME = "Naivë Scheduling";

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
  0, -2, 0, -5, -9, -5, -12, null,
  0, -2, 0, -5, -9, -5, -12, null,
  0, 2, 3, 2, 3, 3, 0, 2, 0, 2, 2, -2, 0, -2, 0, 0, -4, 0
];

const ROOT = 83;
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));

function playSong() {
  let i = 0;
  let interval;

  function schedule() {
    synth.play(SONG[i], now(), PULSE);
    i++;

    if (i >= SONG.length) {
      interval && clearInterval(interval);
    }
  }

  schedule();
  interval = setInterval(schedule, PULSE * 1000);
}

function initControls() {
  ctrl
    .createBinding(NAME)
    .addEffect(
      "Spill av kun sang",
      [
        () => {
          t0 = 0;
          playSong();
        },
      ],
      {
        triggerId: 9,
      }
    )
    .addEffect(
      "Tegn opp",
      [
        () => {
          t0 = 0;
          frame(0);
        },
      ],
      {
        triggerId: 10,
      }
    )
    .addEffect(
      "Spill av alt",
      [
        () => {
          t0 = 0;
          loop();
          playSong();
        },
      ],
      {
        triggerId: 11,
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
  let totalDuration = SONG.length * PULSE;
  let timePassedAsPercentage = tInSeconds / totalDuration;

  let highestNote = max(SONG);
  let lowestNote = min(SONG);
  let yStep = h / Math.abs(highestNote - lowestNote);

  for (let i = 0; i < SONG.length; i++) {
    if (SONG[i] == null) continue;

    let notePos = i * PULSE;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = tInSeconds > notePos;

    let duration = PULSE;
    let durationAsPercentage = duration / totalDuration;

    let y = h - normalize(lowestNote - 1, highestNote, SONG[i]) * h;
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
function loop(t) {
  if (!t0) t0 = t;

  let durationInSeconds = PULSE * SONG.length;
  let tMax = 1000 * durationInSeconds;

  let deltaT = t - t0;

  rAF = requestAnimationFrame(loop);
  if (deltaT > tMax) {
    cancelAnimationFrame(rAF);
    frame(0);
    return;
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
}

export function start(canvas, controls, audioContext) {
  init(canvas, controls, audioContext);
}

export function stop() {
  ctrl.removeBinding(NAME);
}
