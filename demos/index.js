import { start as naiveStart, stop as naiveStop } from "./0_naivescheduling";
import { start as halfnotesStart, stop as halfnotesStop } from "./1_halfnotes";
import {
  start as halfnotesSemifixedStart,
  stop as halfnotesSemifixedStop,
} from "./1_5_halfnotessemifixed";
import {
  start as halfnotesFixedStart,
  stop as halfnotesFixedStop,
} from "./2_halfnotesfixed";
import {
  start as singleloopStart,
  stop as singleloopStop,
} from "./3_singleloop";
import {
  start as singleloopFixedStart,
  stop as singleloopFixedStop,
} from "./4_singleloopfixed";
import { start as lookaheadStart, stop as lookaheadStop } from "./5_lookahead";
import {
  start as audioclockStart,
  stop as audioclockStop,
} from "./6_audioclock";
import { start as funtimesStart, stop as funtimesStop } from "./7_funtimes";
import {
  start as multifuntimesStart,
  stop as multifuntimesStop,
} from "./8_multifuntimes";

let demos = {
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
    this.demo = demos[demo];
    this.controls = controls;
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
    await this.demo.start(this.canvas, this.controls, this.audioContext);
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
