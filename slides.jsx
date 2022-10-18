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
controls.listDevices();

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
  14: [naiveDemo, 1],
  20: [halfNotesDemo, 2],
  24: [halfNotesFixedDemo, 3],
  39: [halfNotesSemifixedDemo, 4],
  41: [halfNotesFixedDemo, 5],
  45: [singleLoopDemo, 6],
  48: [singleLoopFixedDemo, 7],
  57: [singleLoopFixedDemo, 8],
  60: [lookaheadDemo, 9],
  68: [audioclockDemo, 10],
  80: [funtimesDemo, 11],
  82: [multifuntimesDemo, 12],
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

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Kreativ Programmering</Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Uttrykk over Funksjon</Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Musikk!</Heading>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Musikk!
      </Heading>
      <Text fontWeight={300}>
        I nettleseren har vi noe som heter WebAudio. Med det kan vi bygge en
        liten synthesizer.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Når vi har en synthesizer er det fristende å prøve å gjenskape noe
          gøy.
        </Text>
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
        Stor takk til Tove Lov for å gjøre dette foredraget mer relevant nå, enn
        når jeg startet på det før sommeren.😅
      </Text>
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
      <Heading textAlign="left" fontWeight={300}>
        Musikk!
      </Heading>
      <Text fontWeight={300}>
        Det er frustrerende å vite hvordan noe skal høres ut, men ikke være
        istand til å gjenskape det.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi vet jo hvilke noter som skal spilles, kan vi ikke bare la dataen ta
          seg av det?
        </Text>
      </Appear>
    </Slide>

    <SlideLayout.Center transition={transition}>
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
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Oppdrag:</Heading>
      <Heading fontWeight={300}>Få browsern til å spille Pop Corn.</Heading>
      <Appear>
        <Heading fontWeight={300}>Og vise oss det.</Heading>
      </Appear>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hvor starter vi?
      </Heading>
      <Text fontWeight={300}>Vi kommer til å trenge to ting:</Text>
      <Appear>
        <Text fontWeight={300}>1 - Noe som spiller noter.</Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>2 - Noe som tegner ting på skjermen.</Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Noe som spiller noter.</Text>
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
      <Text fontWeight={300}>Noe som spiller noter.</Text>
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
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> er vårt første møte med skedulering.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan> lar oss instruere nettlesern til å
          gjøre noe hvert N-te ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> putter funksjonen vår i køen sammen med
        andre asynkrone ting nettleseren håndterer.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Dette betyr at vi ikke har noen garantier for at funksjonen vår vil
          bli kjørt av nettleseren med eksakt timing. Når den blir kallt er
          avhengig av hva annet nettleseren må hanskes med.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Hvis du har trente ører kan det hende at du la merke til at det var noe
        off med forsøket vårt på å spille av Pop Corn.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Notene skal ikke alle være like lange, noen av dem er kortere.
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
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan>s største ulempe er at
        skeduleringsintervallet er fast.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Dette gjør seg dårlig når du trenger å justere lengden på
          intervallene, som vi jo trenger når vi ønsker å spille halvnoter.
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
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setTimeout</CodeSpan> er en mer fleksibel løsning enn{" "}
        <CodeSpan>setInterval</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Isteden for et repeterende fast intervall, kan vi skedulere funksjonen
          vår til å bli kallt en gang hvert N-te ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        For å oppnå den samme repeterende skeduleringen som vi hadde med{" "}
        <CodeSpan>setInterval</CodeSpan> benytter vi oss av rekursjon. Hver gang
        vår funksjon blir kallt sørger den selv for å skedulere neste kall.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Utover dette fungerer <CodeSpan>setTimeout</CodeSpan> og{" "}
          <CodeSpan>setInterval</CodeSpan> på den samme måten.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Begrensningene til <CodeSpan>setTimeout</CodeSpan> er derfor desverre de
        samme som <CodeSpan>setInterval</CodeSpan>. Ingen garantert timing.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Men det er godt nok for nå. La oss fortsette med del 2 av oppdraget:
          Noe som tegner ting på skjermen.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Animasjonsloopen</Text>
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
        Allerde her har vi truffet på vår tredje metode for skedulering:{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>requestAnimationFrame</CodeSpan> er en måte å be nettleseren
          om å kjøre en funksjon rett før den gjør en ny tegning. Dette gir oss
          en måte for å synkronisere koden vår med nettleserens tenge-lopp.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        En stor forskjell fra de to andre metodene vi har sett på er at{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> ikke lar oss kontrollere
        timing.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Isteden får vi vite tidspunktet funksjonen blir kallt på gjennom et
          argument som browseren sender med når funksjonen vår blir kallt. Så vi
          kan oppnå det samme med litt matte.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        En annen ting som skiller <CodeSpan>requestAnimationFrame</CodeSpan> fra
        de to andre metodene er at vi ikke lengre deler kø med alle andre
        asynkrone ting i nettleseren. Vi ligger i en egen tegne-kø, som
        nettleseren kan velge å prioritere.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har fortsatt ingen garantier fra nettleseren om eksakt eller stabil
          timing. Hvis koden vår bruker for lang tid begynner nettleseren å
          droppe frames, som igjen betyr at den dropper kall til funksjonen vår.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Animasjonsloopen</Text>
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
      <Text fontWeight={300}>Synkronisering av lyd og bilde.</Text>
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
      <Text fontWeight={300}>Tegne en fremdriftsindikator.</Text>
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
      <Text fontWeight={300}>Fikse gapene i visualiseringen.</Text>
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
        Hva har vi bygd?
      </Heading>
      <Text fontWeight={300}>
        Vi har noe som spiller noter, bygd ved å skedulere avspillinger med{" "}
        <CodeSpan>setTimeout</CodeSpan>. Og vi har noe som tegner noter på
        skjermen, styrt av kontinuerlig kjørende animasjonsloop bygd på{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Hadde det ikke vært fint om de to bitene hadde basert seg på samme
          underliggende teknologi?
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Konsoliderte løkker.</Text>
      <CodePane language="javascript" highlightRanges={[2, 3]}>
        {`
init()
loop()
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Konsoliderte løkker.</Text>
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
        Konsoliderte løkker
      </Heading>
      <Text fontWeight={300}>Ops, vi har reintrodusert noen bøggs.</Text>
      <Appear>
        <Text fontWeight={300}>
          Dette er samme feilen vi gjorde når vi ikke tok høyde for at noter
          skal følge hverandre, selv om de ikke er like lange.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Konsoliderte løkker.</Text>
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
        Konsoliderte løkker
      </Heading>
      <Text fontWeight={300}>
        Vi har nå klart å samle både skeduleringen av noter og tegningen av
        noter i samme løkke.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi gjør fortsatt mye manuelt synkroniseringsarbeid. La oss fikse det.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Smartere data.</Text>
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
      <Text fontWeight={300}>Smartere data.</Text>
      <CodePane language="javascript" highlightRanges={[]}>
        {`
const ROOT = 83;
const SONG = POPCORN.map((v) => (v == null ? v : v + ROOT));
        `}
      </CodePane>
    </Slide>
    <Slide transition={transition}>
      <Text fontWeight={300}>Smartere data.</Text>
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
      <Text fontWeight={300}>Smartere data.</Text>
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
      <Text fontWeight={300}>Smartere data.</Text>
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
      <Text fontWeight={300}>Smartere data.</Text>
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
      <Text fontWeight={300}>Smartere data.</Text>
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
        Smartere data.
      </Heading>
      <Text fontWeight={300}>
        Vi har fjernet behovet for å manuelt holde styr på hvor i sangen vi er
        ved å isteden bare regne det ut i starten.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har ikke gjort noe med hvor lite motstandsdyktig avspillinga er til
          variasjoner i kjøretidsressurser. La oss fikse det og.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Køer og framsynthet.</Text>
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
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        Noen av dere la kanskje merke til at vi gikk fra{" "}
        <CodeSpan>now()</CodeSpan> til å eksplisitt regne ut tiden vi vil at
        noten skal spille av.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har og sjonglert ms og s gjennom hele koden vår, som er ganske
          forvirrende.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        I tillegg til tidspunktet vi får fra klokka i nettleseren, gjennom{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>, har vi og tilgang på tid i
        klokka til <CodeSpan>WebAudio</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>WebAudio</CodeSpan>-klokka er den vi faktisk har brukt hele
          veien til å fortelle synthen vår når en note skal spilles.
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
        En stor ulempe med å lese av klokka til nettleseren gjennom{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> er at vi kun får tilgang på
        den når funksjonen vår kalles.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          I tillegg snapshotter klokka, slik at alle funksjoner som kalles i
          samme runde av nettleserens tegneloop vil få samme tidspunkt,
          uavhengig av hvor mye tid som er brukt av annen kode.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>WebAudio</CodeSpan>-klokka har ikke denne begrensningen. Den
        er bygget for høy presisjon og kjører i sin egen lille loop, sånn at den
        vil alltid være oppdatert når vi leser den av.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Når vi lager noe som tar sikte på å synkronisere lyd og bilde bør vi
          derfor alltid benytte oss av <CodeSpan>WebAudio</CodeSpan>-klokka.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>requestAnimationFrame-klokka.</Text>
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
      <Text fontWeight={300}>WebAudio-klokka.</Text>
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
        Hva har vi bygd?
      </Heading>
      <Text fontWeight={300}>
        Vi har nå en liten snurre som blir kontinuerlig tegnet av en
        animasjonsloop basert på <CodeSpan>requestAnimationFrame</CodeSpan> og
        som bruker <CodeSpan>WebAudio</CodeSpan>-klokka til å skedulere en synth
        til å spille noter og synkronisere lyd og bilde.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Ikke værst å ha det på plass før lønsj på en onsdag.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hva har vi lært?
      </Heading>
      <Text fontWeight={300}>
        Det som startet som et moro-prosjekt for å gjenskape Pop Corn, en
        meme-låt fra 1969, har gitt oss ganske verdifull innsikt i metodene vi
        har tilgjengelig i nettleseren for å hanskes med både lyd og bilde i
        tid.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan>, <CodeSpan>setTimeout</CodeSpan>,{" "}
          <CodeSpan>requestAnimationFrame</CodeSpan> for skedulering. Og to
          ulike klokker gjennom <CodeSpan>requestAnimationFrame</CodeSpan> og{" "}
          <CodeSpan>WebAudio</CodeSpan>.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Læring.
      </Heading>
      <Text fontWeight={300}>
        Koding for egen underholdning kan være vel så lærerikt som annen koding.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det trenger ikke være seriøst eller nyttig. Eller korrekt for den saks
          skyld. At <em>du</em> får noe ut av det er det viktigste.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Nytte.
      </Heading>
      <Text fontWeight={300}>
        Programmering er et kreativt yrke. Ikke bare i form, men og i utøvelse.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vær nysgjerrig. Vær teit. Ha det moro. Å være kreativ er en superpower
          for en utvikler.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Å vite at noe er mer.
      </Heading>
      <Text fontWeight={300}>Jeg pleide å spille piano når jeg var yngre.</Text>
      <Appear>
        <Text fontWeight={300}>
          Men jeg gav opp på det, til tross for at jeg var veldig glad i musikk,
          fordi jeg ikke så den kreative siden av det.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Å vite at noe er mer.
      </Heading>
      <Text fontWeight={300}>
        Spol frem noen år, og jeg går på universitetet for å bli en
        programmerer.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Mye på samme måte som pianospillinga, så jeg kun den ene
          &quot;riktige&quot; veien.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Å vite at noe er mer.
      </Heading>
      <Text fontWeight={300}>
        Når jeg etterhvert kom meg gjennom studiene ble jeg eksponert for en
        helt ny verden, hvor programmering ikke bare var <em>en</em> ting.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Og det er litt det jeg håper at jeg har vist dere med denne lille
          fortellingen, at kode kan være mer. Hvis du vil, trenger eller synes
          det er det.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Drømmejobben
      </Heading>
      <Appear>
        <Text fontWeight={300}>
          Å gjøre ting som{" "}
          <Link
            color="#ebebeb"
            fontWeight="300"
            target="_blank"
            href="https://www.nrk.no/sos-from-the-ocean-1.15763366"
          >
            dette
          </Link>
        </Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>
          eller{" "}
          <Link
            color="#ebebeb"
            fontWeight="300"
            target="_blank"
            href="https://www.nrk.no/kultur/xl/the-hum_-hege-hoyrer-noko-nesten-ingen-andre-hoyrer-1.16121231"
          >
            dette
          </Link>
        </Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>
          eller{" "}
          <Link
            color="#ebebeb"
            fontWeight="300"
            target="_blank"
            href="https://static.nrk.no/core-design/latest/lofi-shapes/index.html"
          >
            dette
          </Link>
          .
        </Text>
      </Appear>
    </Slide>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        Siden vi har snakket en del om å ha det moro...
      </Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>
        Og vi har en ganske robust snurre for lyd og bilde...
      </Heading>
    </SlideLayout.Center>

    <SlideLayout.Center transition={transition}>
      <Heading fontWeight={300}>Og vi har snakket mye om klokker...</Heading>
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
        Og siden vi har en ganske fin struktur på dataene våre...
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
        TAKK FOR AT DERE HØRTE PÅ!
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
        Digital Historiefortelling NRK
      </Text>
      <Text fontWeight="300" textAlign="center" fontSize={25}>
        Slides &amp; Kode: github/mollerse/popcorn-and-clocks-presentation
      </Text>
    </SlideLayout.Center>
  </Deck>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Presentation />);
