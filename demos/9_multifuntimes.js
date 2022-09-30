import Synth from "./parts/synth";
import { min, max, normalize, unique } from "./parts/utils";
import { FG, BG, ACCENT } from "./parts/colors";

const NAME = "Multiple Funtimes";

let ctx;
let actx;
let ctrl;
let synth;
let W;
let H;
let t0 = 0;

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
          t0 = actx.currentTime;
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

function circleAt(r, w = 1, f = FG) {
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, 2 * Math.PI, false);
  ctx.strokeStyle = f;
  ctx.lineWidth = w;
  ctx.stroke();
}

function frame(t) {
  ctx.save();

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, W, H);
  ctx.translate(0.05 * W, 0.05 * H);
  let w = 0.9 * W;
  let h = 0.9 * H;

  let totalR = 0.5 * 0.25 * w;
  let totalPhi = 2 * Math.PI;

  let lastNote = SONG[SONG.length - 1];
  let totalDuration = lastNote.on + lastNote.dur;
  let timePassedAsPercentage = t / totalDuration;

  let notes = SONG.map(({ note }) => note);
  let highestNote = max(notes);
  let lowestNote = min(notes);
  let uniqueNotes = unique(notes);

  let currentlyPlayingNote = SONG.find(
    ({ on, dur }) => on >= t && t < on + dur
  );

  for (let i = 0; i < uniqueNotes.length; i++) {
    let isActive =
      t > 0 &&
      currentlyPlayingNote &&
      uniqueNotes.indexOf(currentlyPlayingNote.note) === i;
    let row = Math.floor(i / 4);
    let col = i % 4;

    ctx.save();

    ctx.translate((col + 0.5) * (w / 4), ((row + 0.5) * h) / 2);
    ctx.scale(1, -1);
    circleAt(totalR - 10, isActive ? 5 : 1, isActive ? ACCENT : FG);

    ctx.strokeStyle = ACCENT;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      (totalR - 10) *
        Math.cos(0.5 * Math.PI + -1 * timePassedAsPercentage * totalPhi),
      (totalR - 10) *
        Math.sin(0.5 * Math.PI + -1 * timePassedAsPercentage * totalPhi)
    );
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  for (let i = 0; i < SONG.length; i++) {
    let { note, on, dur } = SONG[i];
    if (note == null) continue;

    ctx.save();

    let idx = uniqueNotes.indexOf(note);
    let row = Math.floor(idx / 4);
    let col = idx % 4;

    ctx.translate((col + 0.5) * (w / 4), ((row + 0.5) * h) / 2);
    ctx.scale(1, -1);

    let notePos = on;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = t > 0 && t > notePos;

    let durationAsPercentage = dur / totalDuration;

    let r =
      0.25 * (totalR - 15) +
      0.75 * normalize(lowestNote - 1, highestNote, note) * (totalR - 15);
    let phi = notePosAsPercentage * totalPhi;

    ctx.fillStyle = isActive ? ACCENT : FG;
    ctx.beginPath();
    let j = 0;
    while (j < 0.75 * durationAsPercentage * totalPhi) {
      let y = r * Math.cos(phi + j);
      let x = r * Math.sin(phi + j);
      j += 0.005 * Math.PI;
      ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
    }
    ctx.fill();

    ctx.restore();
  }

  ctx.restore();
}

let rAF;
const LOOKAHEAD = 0.75;

let QUEUE = [...SONG];

function loop() {
  let lastNote = SONG[SONG.length - 1];
  let tMax = lastNote.on + lastNote.dur;

  let deltaT = actx.currentTime - t0;

  rAF = requestAnimationFrame(loop);
  if (deltaT > tMax) {
    cancelAnimationFrame(rAF);
    frame(0);
    return;
  }

  let scheduleThreshold = deltaT + LOOKAHEAD;
  while (QUEUE.length && QUEUE[0].on < scheduleThreshold) {
    let { note, on, dur } = QUEUE[0];
    QUEUE.splice(0, 1);

    if (note == null) continue;

    synth.play(note, t0 + on, dur);
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
