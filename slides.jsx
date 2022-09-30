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
} from "spectacle";

import { Demo } from "./demos/index";

import midiControl from "@mollerse/midi-control";
let controls = midiControl("tweakpane", ["Demo Controls"]);

await controls.init("Launch Control");
const audioContext = new AudioContext();

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
  8: [naiveDemo, 0],
  14: [halfNotesDemo, 1],
  18: [halfNotesFixedDemo, 2],
  33: [halfNotesSemifixedDemo, 3],
  35: [halfNotesFixedDemo, 4],
  39: [singleLoopDemo, 5],
  42: [singleLoopFixedDemo, 6],
  51: [singleLoopFixedDemo, 7],
  54: [lookaheadDemo, 8],
  63: [audioclockDemo, 9],
  71: [funtimesDemo, 10],
  73: [multifuntimesDemo, 11],
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
        POPCORN &amp; KLOKKER
      </Heading>
      <Heading fontWeight="300" margin="0px" fontSize="h2">
        &mdash; En historie om skedulering i nettleseren
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
        Digital Historieutvikling NRK
      </Text>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn</Heading>
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
    </Slide>

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
        Takk til Tove Lo for å gjøre dette enda mer relevant enn det var når det
        ble påtenkt 😅
      </Text>
    </Slide>

    <SlideLayout.Center>
      <Heading fontWeight={300}>Mission:</Heading>
      <Heading fontWeight={300}>
        Få nettleseren til å spille Popcorn mens det skjer noe visuelt på
        skjermen.
      </Heading>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hvor starter vi?
      </Heading>
      <Text fontWeight={300}>Vi trenger to ting:</Text>
      <Appear>
        <Text fontWeight={300}>1 - Noe som kan spille noter.</Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>2 - Noe som kan tegne ting på skjermen.</Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Noe som kan spille noter</Text>
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
      <Text fontWeight={300}>Noe som kan spille noter</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> er vårt første møte med skedulering.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan> lar oss instruere nettleseren til å
          kalle en funksjon hvert Nte ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> vil legge seg i køen sammen med andre
        asynkrone og skedulerte ting som nettleseren håndterer i tur og orden.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det vil si at vi ikke har noen garanti for at funksjonen vår kalles
          med eksakt timing, det kommer helt an på hva annet nettleseren har å
          sysle med på det aktuelle tidspunktet.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        De med skarpe ører hørte kanskje at det var noe litt off med
        avspillingen vår.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Alle notene skal ikke være like lange. Noen av notene er kortere.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Halvnoter.</Text>
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
      <Text fontWeight={300}>Halvnoter.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Den største begrensningen til <CodeSpan>setInterval</CodeSpan> er at
        intervallet er fixed.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det funker dårlig når vi vil veksle mellom lange og korte intervaller.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Fleksible intervaller.</Text>
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
      <Text fontWeight={300}>Fleksible intervaller.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setTimeout</CodeSpan> er en mer fleksibel variant av{" "}
        <CodeSpan>setInterval</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Istedenfor å sette opp noe som kalles hver Nte ms, setter vi opp noe
          som kalles 1-en gang om N ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Vi benytter oss av muligheten for å skedulere ting rekursivt, for å
        oppnå det samme som <CodeSpan>setInterval</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Ellers fungerer <CodeSpan>setTimeout</CodeSpan> og{" "}
          <CodeSpan>setInterval</CodeSpan> på samme måte.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Begrensningene til <CodeSpan>setTimeout</CodeSpan> er de samme som{" "}
        <CodeSpan>setInterval</CodeSpan>, vi har ingen garanti for at timingen
        er eksakt.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det er godt nok for nå, og vi kan gå videre til delmål 2: Noe som kan
          tegne ting på skjermen.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>En grunnleggende animasjonsloop</Text>
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
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Allerede her treffer vi på neste metode for skedulering,{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>requestAnimationFrame</CodeSpan> er en måte for oss å be
          nettleseren om å kjøre en funksjon rett før den setter igang med en ny
          opptegning, sånn at vi hele tiden er synkronisert med nettleserens
          egen tengeloop.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        En ting som skiller <CodeSpan>requestAnimationFrame</CodeSpan> fra de to
        andre metodene er at vi ikke har noen eksplisitt måte å time ting på.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det vi har isteden er tidspunktet, i ms, når funksjonen ble kallt av
          nettleseren. Så vi må gjøre litt matte for å vite hvor langt vi har
          kommet.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        En annen ting som skiller <CodeSpan>requestAnimationFrame</CodeSpan> fra
        de to andre er at den har sin egen kø, så nettleseren kan velge å
        prioritere <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det er fortsatt ingen garanti for at timingen er stabil, hvis det tar
          for lang tid å kjøre tegnekoden vår begynner nettleseren å droppe
          frames og dermed forstyrre tiden mellom hver{" "}
          <CodeSpan>requestAnimationFrame</CodeSpan>.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>En grunnleggende animasjonsloop</Text>
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
      <Text fontWeight={300}>Synkronisere lyd og bilde.</Text>
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
      <Text fontWeight={300}>Tegne noter.</Text>
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
      <Text fontWeight={300}>Tegne noter.</Text>
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
      <Text fontWeight={300}>Tegne noter.</Text>
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
      <Text fontWeight={300}>Tegne noter.</Text>
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
      <Text fontWeight={300}>Tegne opp en progress indikator.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Fikse gaps i visualiseringen.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hva har vi bygd?
      </Heading>
      <Text fontWeight={300}>
        Vi har noe som spiller av noter, bygd på å skedulere avspilling med
        setTimeout, og vi har en paintloop som tegner noter, bygd med
        requestAnimationFrame.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Hadde det ikke vært fint å slippe å synkronisere to loops?
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Loop-konsolidering.</Text>
      <CodePane language="javascript" highlightRanges={[2, 3]}>
        {`
init()
loop()
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Loop-konsolidering.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Loop-konsolidering
      </Heading>
      <Text fontWeight={300}>Nå har vi introdusert bugs igjen.</Text>
      <Appear>
        <Text fontWeight={300}>
          Det er en variant av feilen vi hadde når vi forsøkte å tegne
          halvnotene. Vi tar ikke høyde for at notene skal etterfølge hverandre.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Loop-konsolidering.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Loop-konsolidering
      </Heading>
      <Text fontWeight={300}>
        Vi har alt samlet i en og samme loop, nå driver vi å manuellt teller det
        samme på to ulike plasser.
      </Text>
      <Appear>
        <Text fontWeight={300}>Vi må ha en smartere datastruktur.</Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smarte data.</Text>
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
      <Text fontWeight={300}>Smarte data.</Text>
      <CodePane language="javascript" highlightRanges={[]}>
        {`
const ROOT = 83;
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));
        `}
      </CodePane>
    </Slide>
    <Slide transition={transition}>
      <Text fontWeight={300}>Smarte data.</Text>
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
      <Text fontWeight={300}>Smarte data.</Text>
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
      <Text fontWeight={300}>Smarte data.</Text>
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
      <Text fontWeight={300}>Smarte data.</Text>
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
      <Text fontWeight={300}>Smarte data.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Smarte data.
      </Heading>
      <Text fontWeight={300}>
        Vi har fjerna behovet for å tracke hvor langt vi har kommet i form av en
        variabel, og lagt det inn i en datastruktur isteden. Big win.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har egentlig ikke gjort noe med runtime skjørhet. Det burde vi.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Kø og lookahead.</Text>
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
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        Noen la kanskje merke til hvordan vi gikk fra <CodeSpan>now()</CodeSpan>{" "}
        til å eksplisitt sette et tidspunkt når vi ber synthen om å spille en
        note.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Gjennom hele prosessen til nå har vi sjonglert tid i ms og tid i s,
          som og er ganske forvirrende.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        I tillegg til tiden <CodeSpan>requestAnimationFrame</CodeSpan> forteller
        oss om, har vi den interne tiden til <CodeSpan>WebAudio</CodeSpan>{" "}
        APIet.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det er <CodeSpan>WebAudio</CodeSpan>-klokka vi har benyttet oss av
          hver gang vi har bedt synthen om å spille av en note.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Tid != Tid</Text>
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
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        Det som er ulempen med klokka i{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> er at den kun kan leses av i
        det vi får et callback.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          I tillegg har <CodeSpan>requestAnimationFrame</CodeSpan> en
          begrensning i at tidspunktet kun blir lest av en gang for hver runde
          med callbacks.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        Som vil si at hvis du har fler{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> callbacks på en side vil ikke
        tiden oppdateres med tiden som ble brukt på foregående callbacks.
      </Text>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>WebAudio</CodeSpan>-klokka har ikke denne begrensningen. Den
        kjører i en separat tråd og vil alltid være oppdatert.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Når vi skal lage noe visuel som skal synkroniseres mot lyd, bør derfor
          det visuelle og benytte seg av <CodeSpan>WebAudio</CodeSpan>-klokka.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>requestAnimationFrame tid.</Text>
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
      <Text fontWeight={300}>WebAudio tid.</Text>
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
      <div className="demo-mount" />
    </Slide>

    {/* HIT */}

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hva har vi bygd?
      </Heading>
      <Text fontWeight={300}>
        Vi har nå en snurre som bygger på nettleserens paint-loop med{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>, som igjen benytter seg av{" "}
        <CodeSpan>WebAudio</CodeSpan>-klokka for å skedulere noter en
        synthesizer skal spille og for å synkronisere lyd og bilde.
      </Text>
      <Appear>
        <Text fontWeight={300}>Ikke værst for en tidlig ettermiddag.</Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hva har vi lært?
      </Heading>
      <Text fontWeight={300}>
        Det som starta som et moro-prosjekt for å gjenskape Popcorn, en meme-låt
        fra 1969, har gitt oss innsikt i fler av nettleserns verktøy for å
        hanskes med hendelser i tid.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan>, <CodeSpan>setTimeout</CodeSpan>,{" "}
          <CodeSpan>requestAnimationFrame</CodeSpan>,{" "}
          <CodeSpan>WebAudio</CodeSpan>-klokka.
        </Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>
          Og en liten leksjon i nytten av å velge rett datastruktur.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Læring.
      </Heading>
      <Text fontWeight={300}>
        Det trenger ikke være seriøst eller nyttig. Eller riktig for den saks
        skyld. Det viktigste er at <em>du</em> får noe ut av det.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Koding for egen underholdning er vel så lærerikt som annen kode.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Læring.
      </Heading>
      <Text fontWeight={300}>
        Vær nysgjerrig. Vær tøysete. Ha det gøy. Plutselig har du lært deg noe
        interessant du kan få bruk for.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Koding er et utrolig artig kreativt medium. Bare fordi det er
          skjemagenerering som betaler regninga, betyr ikke det at det er alt
          programmering er.
        </Text>
      </Appear>
    </Slide>
    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Appropo gøy.</Heading>
    </SlideLayout.Center>
    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        Siden vi uansett har en ganske robust greie for lyd og bilde.
      </Heading>
    </SlideLayout.Center>
    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Og vi har jo snakka mye om klokker...</Heading>
    </SlideLayout.Center>
    <Slide transition={transition}>
      <div className="demo-mount" />
    </Slide>
    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        Og siden vi uansett har en god datastruktur...
      </Heading>
    </SlideLayout.Center>
    <Slide transition={transition}>
      <div className="demo-mount" />
    </Slide>
    <SlideLayout.Center transition={transition}>
      <Heading fontWeight="300" margin="0px" fontSize="150px">
        TAKK FOR MEG!
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
        Digital Historieutvikling NRK
      </Text>
      <Text fontWeight="300" textAlign="center" fontSize={25}>
        Slides &amp; Kode: github/mollerse/popcorn-and-clocks-presentation
      </Text>
    </SlideLayout.Center>
  </Deck>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Presentation />);
