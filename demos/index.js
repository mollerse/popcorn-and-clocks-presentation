import { start as pianoStart, stop as pianoStop } from "./0_piano";
import { start as naiveStart, stop as naiveStop } from "./1_naivescheduling";
import { start as halfnotesStart, stop as halfnotesStop } from "./2_halfnotes";
import {
  start as halfnotesSemifixedStart,
  stop as halfnotesSemifixedStop,
} from "./2_5_halfnotessemifixed";
import {
  start as halfnotesFixedStart,
  stop as halfnotesFixedStop,
} from "./3_halfnotesfixed";
import {
  start as singleloopStart,
  stop as singleloopStop,
} from "./4_singleloop";
import {
  start as singleloopFixedStart,
  stop as singleloopFixedStop,
} from "./5_singleloopfixed";
import { start as lookaheadStart, stop as lookaheadStop } from "./6_lookahead";
import {
  start as audioclockStart,
  stop as audioclockStop,
} from "./7_audioclock";
import { start as funtimesStart, stop as funtimesStop } from "./8_funtimes";
import {
  start as multifuntimesStart,
  stop as multifuntimesStop,
} from "./9_multifuntimes";

let demos = {
  piano: {
    start: pianoStart,
    stop: pianoStop,
  },
  naive: {
    start: naiveStart,
    stop: naiveStop,
  },
  halfnotes: {
    start: halfnotesStart,
    stop: halfnotesStop,
  },
  halfnotesSemifixed: {
    start: halfnotesSemifixedStart,
    stop: halfnotesSemifixedStop,
  },
  halfnotesFixed: {
    start: halfnotesFixedStart,
    stop: halfnotesFixedStop,
  },
  singleloop: {
    start: singleloopStart,
    stop: singleloopStop,
  },
  singleloopFixed: {
    start: singleloopFixedStart,
    stop: singleloopFixedStop,
  },
  lookahead: {
    start: lookaheadStart,
    stop: lookaheadStop,
  },
  audioclock: {
    start: audioclockStart,
    stop: audioclockStop,
  },
  funtimes: {
    start: funtimesStart,
    stop: funtimesStop,
  },
  multifuntimes: {
    start: multifuntimesStart,
    stop: multifuntimesStop,
  },
};

export class Demo {
  constructor({ demo, controls, audioContext }) {
    if (Array.isArray(controls)) {
      this.controls = controls[0];
      this.piano = controls[1];
    } else {
      this.controls = controls;
    }
    this.demo = demos[demo];
    this.audioContext = audioContext;

    this.canvas = null;

    this.running = false;
  }

  mountCanvas() {
    const canvas = document.createElement("canvas");
    const { width, height } = this.mount.getBoundingClientRect();

    canvas.setAttribute("height", height);
    canvas.setAttribute("width", width);

    this.mount.appendChild(canvas);
    document.body.classList.add("show-controls");
    return canvas;
  }

  async start(el) {
    this.mount = el;
    this.canvas = this.mountCanvas();
    await this.demo.start(
      this.canvas,
      this.controls,
      this.audioContext,
      this.piano
    );
    this.running = true;

    document.body.classList.add("show-controls");
  }

  async stop() {
    this.mount.removeChild(this.canvas);
    await this.demo.stop();
    this.running = false;

    document.body.classList.remove("show-controls");
  }
}
