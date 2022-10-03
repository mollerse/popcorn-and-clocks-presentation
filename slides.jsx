import React from "react";
import ReactDOM from "react-dom/client";
import {
  Heading,
  Slide,
  Deck,
  Text,
  Appear,
  SlideLayout,
  CodePane,
  CodeSpan,
  Box,
  FlexBox,
  Link,
} from "spectacle";

import { Demo } from "./demos/index";

import midiControl from "@mollerse/midi-control";
let controls = midiControl("tweakpane", ["Demo Controls"]);

await controls.init("Launch Control");
const audioContext = new AudioContext();

let pianoControls = midiControl("tweakpane", ["Piano"]);
await pianoControls.init("nanoKEY2");

const theme = {
  fonts: {
    header: "'DejaVu Sans', Helvetica, sans-serif",
    text: "'DejaVu Sans', Helvetica, sans-serif",
  },
  colors: {
    primary: "#ebebeb",
    secondary: "#ebebeb",
    tertiary: "#050505",
  },
};

let pianoDemo = new Demo({
  demo: "piano",
  controls: [controls, pianoControls],
  audioContext,
});
let naiveDemo = new Demo({ demo: "naive", controls, audioContext });
let halfNotesDemo = new Demo({ demo: "halfnotes", controls, audioContext });
let halfNotesSemifixedDemo = new Demo({
  demo: "halfnotesSemifixed",
  controls,
  audioContext,
});
let halfNotesFixedDemo = new Demo({
  demo: "halfnotesFixed",
  controls,
  audioContext,
});
let singleLoopDemo = new Demo({ demo: "singleloop", controls, audioContext });
let singleLoopFixedDemo = new Demo({
  demo: "singleloopFixed",
  controls,
  audioContext,
});
let lookaheadDemo = new Demo({ demo: "lookahead", controls, audioContext });
let audioclockDemo = new Demo({ demo: "audioclock", controls, audioContext });
let funtimesDemo = new Demo({ demo: "funtimes", controls, audioContext });
let multifuntimesDemo = new Demo({
  demo: "multifuntimes",
  controls,
  audioContext,
});

const demos = {
  7: [pianoDemo, 0],
  10: [naiveDemo, 1],
  16: [halfNotesDemo, 2],
  20: [halfNotesFixedDemo, 3],
  35: [halfNotesSemifixedDemo, 4],
  37: [halfNotesFixedDemo, 5],
  41: [singleLoopDemo, 6],
  44: [singleLoopFixedDemo, 7],
  53: [singleLoopFixedDemo, 8],
  56: [lookaheadDemo, 9],
  64: [audioclockDemo, 10],
  76: [funtimesDemo, 11],
  78: [multifuntimesDemo, 12],
};

document.body.addEventListener("keydown", async function (event) {
  if (event.key === "p") {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    let params = new URLSearchParams(window.location.search);
    let slideIndex = parseInt(params.get("slideIndex"), 10);
    let [demo, mountIndex] = demos[slideIndex];

    if (demo.running) {
      demo.stop();
    } else if (!demo.running) {
      let mounts = document.querySelectorAll(".demo-mount");
      demo.start(mounts[mountIndex]);
    }
  }
});

const transition = {
  from: {
    opacity: 1,
  },
  enter: {
    opacity: 1,
  },
  leave: {
    opacity: 1,
  },
};

const Presentation = () => (
  <Deck theme={theme}>
    <SlideLayout.Center transition={transition}>
      <Heading fontWeight="300" margin="0px" fontSize="150px">
        POPCORN &amp; CLOCKS
      </Heading>
      <Heading fontWeight="300" margin="0px" fontSize="h2">
        &mdash; A Story About Scheduling in the Browser
      </Heading>
      <Text
        fontWeight="300"
        textAlign="center"
        padding="0px"
        margin="0px"
        fontSize={25}
      >
        Stian Veum Møllersen / @mollerse
      </Text>
      <Text
        fontWeight="300"
        textAlign="center"
        padding="0px"
        margin="0px"
        fontSize={25}
      >
        Digital Story Development NRK
      </Text>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        Our journey today begins with everyones favorite thing in the whole
        world
      </Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Appear>
        <FlexBox>
          <Box>
            <Text margin="0px" padding="0px">
              [
            </Text>
            <Text margin="0px" padding="0px">
              &nbsp;&nbsp;83, 81, 83, 78, 74, 78, 71, null,
            </Text>
            <Text margin="0px" padding="0px">
              &nbsp;&nbsp;83, 81, 83, 78, 74, 78, 71, null,
            </Text>
            <Text margin="0px" padding="0px">
              &nbsp;&nbsp;83, 85, 86, 85, 86, 86, 83, 85,
            </Text>
            <Text margin="0px" padding="0px">
              &nbsp;&nbsp;83, 85, 85, 81, 83, 81, 83, 83,
            </Text>
            <Text margin="0px" padding="0px">
              &nbsp;&nbsp;79, 83,
            </Text>
            <Text margin="0px" padding="0px">
              ]
            </Text>
          </Box>
        </FlexBox>
      </Appear>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <FlexBox>
        <iframe
          width="639"
          height="281.75"
          src="https://www.youtube.com/embed/YK3ZP6frAMc?start=39&end=47"
          title="Hot Butter - Popcorn"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </FlexBox>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <FlexBox>
        <iframe
          width="639"
          height="281.75"
          src="https://www.youtube.com/embed/eUSkZCoGalo?start=93&end=102"
          title="Tove Lo - 2 Die 4 (Official Music Video)"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </FlexBox>
      <Text textAlign="center" fontSize={15} fontWeight={300}>
        Big thanks to Tove Lo for making this talk more relevant now, than when
        I proposed it. 😅
      </Text>
    </Slide>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Mission:</Heading>
      <Heading fontWeight={300}>
        Make the browser play Popcorn while something visual is happening on the
        screen
      </Heading>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Where do we begin?
      </Heading>
      <Text fontWeight={300}>We're going to need two things:</Text>
      <Appear>
        <Text fontWeight={300}>1 - Something that plays notes.</Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>
          2 - Something that draws stuff on the screen.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        This particular demo doesn't work without a nanoKEY2 midi keyboard😔
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Something that plays notes</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [1, 5],
          [7, 7],
          [8, 8],
          [9, 9],
        ]}
      >
        {`
const POPCORN = [
  0, -2, 0, -5, -9, -5, -12, null,
  0, -2, 0, -5, -9, -5, -12, null,
  0, 2, 3, 2, 3, 3, 0, 2, 0, 2, 2, -2, 0, -2, 0, 0, -4, 0
];

const ROOT = 83;
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));
const PULSE = 0.25;
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Something that plays notes</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [2, 3],
          [5, 12],
          [6, 6],
          [7, 7],
          [9, 11],
          [14, 15],
          17,
        ]}
      >
        {`
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
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Attempt 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> is our first encounter with scheduling.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan> lets us instruct the browser to call
          a function every Nth ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Attempt 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> puts the function into the queue with
        other async and scheduled things, which the browser handles accordingly.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          This means that we do not have any guarantees that our function will
          be called with exact timing. It depends entirely on which other tasks
          the browser is handling at the same time.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Attempt 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        If you've got trained ears, you might even notice that there is
        something off about the playback.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          The notes should not all be the same length. Some of the notes are
          shorter.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Half notes.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [1, 5],
          [7, 11],
          [13, 15],
        ]}
      >
        {`
const POPCORN = [
  0, -2, 0, -5, -9, -5, -12, null,
  0, -2, 0, -5, -9, -5, -12, null,
  0, 2, 3, 2, 3, 3, 0, 2, 0, 2, 2, -2, 0, -2, 0, 0, -4, 0
];

const HALF_NOTES = [
  4,
  12,
  19, 22, 24, 27, 29, 32
];

const ROOT = 83;
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));
const PULSE = 0.25;
        `}
      </CodePane>
    </Slide>
    <Slide transition={transition}>
      <Text fontWeight={300}>Half notes.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [6, 7],
          [8, 8],
        ]}
      >
        {`
function playSong() {
  let i = 0;
  let interval;

  function schedule() {
    let isHalfNote = HALF_NOTES.indexOf(i) > -1;
    let duration = isHalfNote ? 0.5 * PULSE : PULSE;
    synth.play(SONG[i], now(), duration);
    i++;

    if (i >= SONG.length) {
      interval && clearInterval(interval);
    }
  }

  schedule();
  interval = setInterval(schedule, PULSE * 1000);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Attempt 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        The most significant drawback of <CodeSpan>setInterval</CodeSpan> is
        that the scheduling interval is fixed.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          This does not lend itself terribly well to cases with varying
          intervals. Like notes usually have.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Flexible intervals.</Text>
      <CodePane language="javascript" highlightRanges={[17, 17]}>
        {`
function playSong() {
  let i = 0;
  let interval;

  function schedule() {
    let isHalfNote = HALF_NOTES.indexOf(i) > -1;
    let duration = isHalfNote ? 0.5 * PULSE : PULSE;
    synth.play(SONG[i], now(), duration);
    i++;

    if (i >= SONG.length) {
      interval && clearInterval(interval);
    }
  }

  schedule();
  interval = setInterval(schedule, PULSE * 1000);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Flexible intervals.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [4, 11],
          [5, 8],
          [10, 10],
          [13, 13],
        ]}
      >
        {`
function playSong() {
  let i = 0;

  function schedule() {
    let isHalfNote = HALF_NOTES.indexOf(i) > -1;
    let dur = isHalfNote ? 0.5 * PULSE : PULSE;
    synth.play(SONG[i], now(), dur);
    i++;

    if (i < SONG.length) setTimeout(schedule, dur * 1000);
  }

  setTimeout(schedule, 0);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Approach 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setTimeout</CodeSpan> is a more flexible solution than{" "}
        <CodeSpan>setInterval</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Instead of having a repeating fixed interval, we can schedule our
          function to be called once in N ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Approach 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        To achieve the same repeating scheduling as{" "}
        <CodeSpan>setInterval</CodeSpan> we'll utilize recursion. Every time our
        function gets called, it will schedule the next function call.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Appart from this, <CodeSpan>setTimeout</CodeSpan> and{" "}
          <CodeSpan>setInterval</CodeSpan> work in the same way.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Approach 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        The limitations of <CodeSpan>setTimeout</CodeSpan> are unfortunatly the
        same as <CodeSpan>setInterval</CodeSpan>. No guarantees for exact
        timing.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          It is, however, good enough for now. Let's get cracking on part 2 of
          the mission: drawing things on the screen.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>The Animation Loop</Text>
      <CodePane language="javascript" highlightRanges={[[14, 16], [6, 12], 10]}>
        {`
function frame(t) {
  // framefunction
}

let t0, rAF;
function loop(t) {
  if(!t0) t0 = t;

  let deltaT = t - t0
  rAF = requestAnimationFrame(loop);
  frame(deltaT)
}

function init() {
  // grab contexts and do setup-things
}

init()
loop()
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Approach 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Already we're getting to a 3rd approach for scheduling,{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>requestAnimationFrame</CodeSpan> schedules a function to be
          called immediatly before a paint happens. This provides us with a way
          to synchronize our code with the browsers internal paint loop.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Approach 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        One major difference between <CodeSpan>requestAnimationFrame</CodeSpan>{" "}
        and the two other approaches we've looked at, is that it does not have
        any way to explicitly control timing.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          What we get instead, is the exact time our function is called. So we
          can achieve the same things as before, with just a little bit of math.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Approach 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Another thing that separates <CodeSpan>requestAnimationFrame</CodeSpan>{" "}
        from our two previous attemps, are the fact that this time we actually
        have a different queue. Which means the browser can chose to prioritize
        functions scheduled with <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          There is, however, still no guarantee that the timing is stable. If
          our code takes too long to run, the browser will start dropping frames
          and with it calls to our function.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>The Animation Loop</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[6, 12], 7, 9, 10, 11, [1, 3], [18, 20]]}
      >
        {`
function frame(t) {
  // framefunction
}

let t0, rAF;
function loop(t) {
  if(!t0) t0 = t;

  let deltaT = t - t0
  rAF = requestAnimationFrame(loop);
  frame(deltaT)
}

function init() {
  // grab contexts and do setup-things
}

init()
loop()
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Synchronizing sound and visuals.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[5, 6], 10, [11, 15], 17]}
      >
        {`
let t0, rAF;
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

  frame(deltaT);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Drawing notes.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [2, 2],
          [11, 11],
          [3, 4],
          [5, 7],
        ]}
      >
        {`
function frame(t) {
  ctx.save();
  ctx.fillStyle = Colors.BG;
  ctx.fillRect(0, 0, W, H);
  ctx.translate(0.05 * W, 0.05 * H);
  let w = 0.9 * W;
  let h = 0.9 * H;

  // [...]

  ctx.restore();
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Drawing notes.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[3, 5], 3, 4, 5, [7, 9], [7, 8], 9]}
      >
        {`
function frame(t) {
  // [...]
  let tInSeconds = t / 1000;
  let totalDuration = (SONG.length - HALF_NOTES.length * 0.5) * PULSE;
  let timePassedAsPercentage = tInSeconds / totalDuration;

  let highestNote = max(SONG);
  let lowestNote = min(SONG);
  let yStep = h / Math.abs(highestNote - lowestNote);

  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Drawing notes.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [3, 16],
          3,
          4,
          6,
          [8, 10],
          8,
          9,
          10,
          [12, 13],
          12,
          13,
        ]}
      >
        {`
function frame(t) {
  // [...]
  for (let i = 0; i < SONG.length; i++) {
    if (SONG[i] == null) continue;

    let isHalfNote = HALF_NOTES.indexOf(i) > -1;

    let notePos = i * PULSE;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = tInSeconds > notePos;

    let duration = isHalfNote ? 0.5 * PULSE : PULSE;
    let durationAsPercentage = duration / totalDuration;

    // [...]
  }
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Drawing notes.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[3, 12], 6, 7, [9, 11], 9, 10, 11]}
      >
        {`
function frame(t) {
  // [...]
  for (let i = 0; i < SONG.length; i++) {
    // [...]

    let y = h - normalize(lowestNote - 1, highestNote, SONG[i]) * h;
    let x = notePosAsPercentage * w;

    ctx.fillStyle = isActive ? Colors.ACCENT : Colors.FG;
    roundRect(ctx, x, y, durationAsPercentage * w, yStep, 0.01 * w);
    ctx.fill();
  }
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Drawing a progress indicator.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [1, 14],
          [3, 5],
          [7, 12],
        ]}
      >
        {`
function frame(t) {
  // [...]
  for (let i = 0; i < SONG.length; i++) {
    // [...]
  }

  ctx.strokeStyle = ACCENT;
  ctx.beginPath();
  ctx.moveTo(timePassedAsPercentage * w, 0);
  ctx.lineTo(timePassedAsPercentage * w, h);
  ctx.lineWidth = 0.01 * w;
  ctx.stroke();
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Fixing the gaps in our visual.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[3, [4, 14], [5, 7], 9, [10, 11], 15]}
      >
        {`
function frame() {
  // [...]
  let offset = 0;
  for (let i = 0; i < SONG.length; i++) {
    if (SONG[i] == null) {
      offset += PULSE;
      continue;
    }
    let notePos = offset;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = tInSeconds > notePos;

    // [...]

    offset += duration;
  }
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        What have we built?
      </Heading>
      <Text fontWeight={300}>
        We have something which plays notes, built by scheduling notes with{" "}
        <CodeSpan>setTimeout</CodeSpan>. And we've got something which draws
        notes, built by continously running a paint function in a loop using{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Wouldn't it be nice if we could base the two parts on the same
          underlying tech?
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Loop-consolidation.</Text>
      <CodePane language="javascript" highlightRanges={[2, 3]}>
        {`
init()
loop()
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Loop-consolidation.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [2, 17],
          3,
          5,
          [7, 14],
          7,
          1,
          8,
          [9, 10],
          12,
          13,
          [7, 14],
          16,
        ]}
      >
        {`
let notePointer = 0;
function loop(t) {
  // [...]

  let beatNumber = Math.floor(deltaT / (1000 * PULSE));

  if (beatNumber > notePointer) {
    let noteToPlay = SONG[notePointer];
    let isHalfNote = HALF_NOTES.indexOf(noteToPlay) > -1;
    let dur = isHalfNote ? 0.5 * PULSE : PULSE;

    synth.play(noteToPlay, now(), dur);
    notePointer++;
  }

  frame(deltaT);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Loop-consolidation
      </Heading>
      <Text fontWeight={300}>Whopsie, we've reintroduced a few bugs.</Text>
      <Appear>
        <Text fontWeight={300}>
          This is a repeat of the bugs we had when we didn't account for the
          varying duration of the notes and the fact that they're meant to
          follow eachother.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Loop-consolidation.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[8, 17], 8, 6, 2, [9, 13], 15, 16, [8, 17], 19]}
      >
        {`
let notePointer = 0;
let nextBeat = 0;
function loop(t) {
  // [...]

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
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Loop-consolidation
      </Heading>
      <Text fontWeight={300}>
        We've succesfully consolidated both the scheduling and painting into one
        loop.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          We're still doing alot of manual sync work though. Let's fix that.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[1, 15], 3, [10, 12], [17, 21], 16, 19]}
      >
        {`
function frame(t) {
  // [...]
  let offset = 0;
  for (let i = 0; i < SONG.length; i++) {
    if (SONG[i] == null) {
      offset += PULSE;
      continue;
    }
    // [...]
    let duration = isHalfNote ? 0.5 * PULSE : PULSE;
    // [...]
    offset += duration;
  }
  // [...]
}
let nextBeat = 0;
function loop(t) {
  // [...]
  nextBeat = nextBeat + (isHalfNote ? 0.5 : 1);
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane language="javascript" highlightRanges={[]}>
        {`
const ROOT = 83;
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));
        `}
      </CodePane>
    </Slide>
    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[2, 18], 3, [4, 5], 6, 8, [10, 14], 15, 17]}
      >
        {`
const ROOT = 83;
const SONG = POPCORN.reduce(function (acc, n, i) {
  let previousNote = acc[i - 1] || {};
  let previousNoteOn = previousNote.on || 0;
  let previousNoteDuration = previousNote.dur || 0;
  let durationSoFar = previousNoteOn + previousNoteDuration;

  let isHalfNote = HALF_NOTES.indexOf(i) > -1;

  let note = {
    note: n == null ? n : n + ROOT,
    on: durationSoFar,
    dur: (isHalfNote ? 0.5 : 1) * PULSE,
  };
  acc.push(note);

  return acc;
}, []);
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane language="javascript" highlightRanges={[4, 5]}>
        {`
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

  // [...]

  frame(deltaT);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[2, 12], 1, 4, 6, [7, 10], 7, 8, 9]}
      >
        {`
let notePointer = 0;
function loop(t) {
  // [...]
  let tInSeconds = deltaT / 1000;

  let noteToPlay = SONG[notePointer];
  if (tInSeconds >= noteToPlay.on) {
    synth.play(noteToPlay.note, now(), noteToPlay.dur);
    notePointer++;
  }
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane language="javascript" highlightRanges={[4, 5]}>
        {`
function frame(t) {
  //[...]
  let tInSeconds = t / 1000;
  let lastNote = SONG[SONG.length - 1];
  let totalDuration = lastNote.on + lastNote.dur;
  let timePassedAsPercentage = tInSeconds / totalDuration;
  //[...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarter data.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[3, 13], 3, 4, 5, [7, 9], 7, 11]}
      >
        {`
function frame(t) {
  // [...]
  for (let i = 0; i < SONG.length; i++) {
    let { note, on, dur } = SONG[i];
    if (note == null) continue;

    let notePos = on;
    let notePosAsPercentage = notePos / totalDuration;
    let isActive = tInSeconds > notePos;

    let durationAsPercentage = dur / totalDuration;
    // [...]
  }
  // [...]
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Smarter data.
      </Heading>
      <Text fontWeight={300}>
        We've removed the need for manually tracking the progress of our song,
        instead we're just calculating that up front.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          We haven't done anything about how susceptible our solution is to
          runtime shennanigans. Let's fix that.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Queues and lookahead.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[
          [3, 16],
          [6, 13],
          2,
          5,
          1,
          5,
          [6, 13],
          6,
          7,
          8,
          10,
          12,
        ]}
      >
        {`
const LOOKAHEAD = 0.75;
let QUEUE = [...SONG];
function loop(t) {
  // [...]
  let scheduleThreshold = deltaT / 1000 + LOOKAHEAD;
  while (QUEUE.length && QUEUE[0].on < scheduleThreshold) {
    let { note, on, dur } = QUEUE[0];
    QUEUE.splice(0, 1);

    if (note == null) continue;

    synth.play(note, at0 + on, dur);
  }

  frame(deltaT);
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Time != Time
      </Heading>
      <Text fontWeight={300}>
        Some of you might have noticed how we went from{" "}
        <CodeSpan>now()</CodeSpan> to explicitly defining a time for when we
        want our note to play.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Throughout the code we've also been swapping between ms and s as our
          time meassure, which is quite a source of confusion.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Time != Time
      </Heading>
      <Text fontWeight={300}>
        In addition to the clock we get from{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>, we've also got a clock in
        the <CodeSpan>WebAudio</CodeSpan>
      </Text>
      <Appear>
        <Text fontWeight={300}>
          The <CodeSpan>WebAudio</CodeSpan>-clock is the one we've been using
          whenever we told the synth to play a note.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Time != Time</Text>
      <CodePane language="javascript" highlightRanges={[]}>
        {`
function now() {
  return actx.currentTime
}
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Time != Time
      </Heading>
      <Text fontWeight={300}>
        One major drawback with the <CodeSpan>requestAnimationFrame</CodeSpan>
        -clock is that we can only access the time when our function gets
        called.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          In addition, the <CodeSpan>requestAnimationFrame</CodeSpan>-clock will
          snapshot. Inside one round of the paint loop it will only be read
          once, no matter how much time passes between work.
        </Text>
      </Appear>
    </Slide>

    {/* <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Time != Time
      </Heading>
      <Text fontWeight={300}>
        Som vil si at hvis du har fler{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> callbacks på en side vil ikke
        tiden oppdateres med tiden som ble brukt på foregående callbacks.
      </Text>
    </Slide> */}

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Time != Time
      </Heading>
      <Text fontWeight={300}>
        The <CodeSpan>WebAudio</CodeSpan>-clock does not have this limitation.
        It runs in a thread of its own and will always be up to date.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          When we are making something which features synchronized audio and
          visuals, we should always be using the <CodeSpan>WebAudio</CodeSpan>
          -clock.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>requestAnimationFrame-clock.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[2, 17], 2, 3, 5, 7, 14]}
      >
        {`
let t0;
function loop(t) {
  if (!t0) t0 = t;
  // [...]
  let deltaT = t - t0;
  // [...]
  let scheduleThreshold = (deltaT / 1000) + LOOKAHEAD;
  while (QUEUE.length && QUEUE[0].on < scheduleThreshold) {
    let { note, on, dur } = QUEUE[0];
    QUEUE.splice(0, 1);

    if (note == null) continue;

    synth.play(note, at0 + on, dur);
  }
  frame(deltaT)
}
    `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>WebAudio-clock.</Text>
      <CodePane
        language="javascript"
        highlightRanges={[[2, 20], 3, 1, 5, [8, 15], 14, 16]}
      >
        {`
let t0;
function loop() {
  if (!t0) t0 = actx.currentTime;
  // [...]
  let deltaT = actx.currentTime - t0;
  // [...]
  let scheduleThreshold = deltaT + LOOKAHEAD;
  while (QUEUE.length && QUEUE[0].on < scheduleThreshold) {
    let { note, on, dur } = QUEUE[0];
    QUEUE.splice(0, 1);

    if (note == null) continue;

    synth.play(note, t0 + on, dur);
  }
  frame(deltaT)
}
    `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn 🍿.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        What have we built?
      </Heading>
      <Text fontWeight={300}>
        We now have a little widget built on the browsers paint-loop with
        <CodeSpan>requestAnimationFrame</CodeSpan>, which utilizes the
        <CodeSpan>WebAudio</CodeSpan>-clock to schedule notes a synth can play
        and sync audio and visuals.
      </Text>
      <Appear>
        <Text fontWeight={300}>Not bad for a friday afternoon.</Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        What have we learned?
      </Heading>
      <Text fontWeight={300}>
        What started as a fun-project to recreate Popcorn, a meme-tune from
        1969, has given us some valuable experience with the tools available in
        the browser to deal with audio and visuals in time.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan>, <CodeSpan>setTimeout</CodeSpan>,{" "}
          <CodeSpan>requestAnimationFrame</CodeSpan> for scheduling. And the two
          clocks of <CodeSpan>requestAnimationFrame</CodeSpan> and{" "}
          <CodeSpan>WebAudio</CodeSpan>.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Learning.
      </Heading>
      <Text fontWeight={300}>
        It doesn't have to be serious or useful. Or correct for that matter. The
        most important thing is that <em>you</em> get something out of it.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Coding for your own enjoyment can be just as educational as any other
          coding.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Learning.
      </Heading>
      <Text fontWeight={300}>
        Be curious. Be silly. Have fun. Suddenly you'll stumble upon something
        interesting you can use in another context.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Coding is a very creative medium. Just because generating forms is
          what pays the bills, doesn't mean it's all that coding can be.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Knowing that there is more to it.
      </Heading>
      <Text fontWeight={300}>I used to play piano as a teenager.</Text>
      <Appear>
        <Text fontWeight={300}>
          But I gave up on it, despite a love of music, because I never saw the
          creative side of it.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Knowing that there is more to it.
      </Heading>
      <Text fontWeight={300}>I went to university to learn programming.</Text>
      <Appear>
        <Text fontWeight={300}>
          Much in the same way as my piano playing, I only saw that one path
          laid out by my curriculum.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Knowing that there is more to it.
      </Heading>
      <Text fontWeight={300}>
        Interacting with the frontend-community, and especially the creative
        programming crowd showed me that there were more to it.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          And that's what I hope you'll take away from this. That programming
          can be more, if you want or need it to be.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        My dream job
      </Heading>
      <Appear>
        <Text fontWeight={300}>
          Doing things like{" "}
          <Link
            color="#ebebeb"
            fontWeight="300"
            target="_blank"
            href="https://www.nrk.no/sos-from-the-ocean-1.15763366"
          >
            this
          </Link>
        </Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>
          <Text fontWeight={300}>
            and{" "}
            <Link
              color="#ebebeb"
              fontWeight="300"
              target="_blank"
              href="https://preview.nrk.no/1.14946557.LATEST"
            >
              this
            </Link>
          </Text>
        </Text>
      </Appear>
    </Slide>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Speaking of having fun..</Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        Since we've got a pretty robust thing with audio and visuals.
      </Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>And we've talked alot about clocks...</Heading>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        And since we've structured our data in an ordered manner...
      </Heading>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        Trigger demo effects by using the tweakpane.
      </Text>
      <div className="demo-mount" />
    </Slide>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight="300" margin="0px" fontSize="150px">
        THANKS FOR LISTENING!
      </Heading>
      <Text
        fontWeight="300"
        textAlign="center"
        padding="0px"
        margin="0px"
        fontSize={25}
      >
        Stian Veum Møllersen / @mollerse
      </Text>
      <Text
        fontWeight="300"
        textAlign="center"
        padding="0px"
        margin="0px"
        fontSize={25}
      >
        Digital Story Development NRK
      </Text>
      <Text fontWeight="300" textAlign="center" fontSize={25}>
        Slides &amp; Code: github/mollerse/popcorn-and-clocks-presentation
      </Text>
    </SlideLayout.Center>
  </Deck>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Presentation />);
