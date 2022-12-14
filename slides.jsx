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
        Stian Veum M??llersen / @mollerse
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
          N??r vi har en synthesizer er det fristende ?? pr??ve ?? gjenskape noe
          g??y.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        Stor takk til Tove Lov for ?? gj??re dette foredraget mer relevant n??, enn
        n??r jeg startet p?? det f??r sommeren.????
      </Text>
    </Slide>

    <Slide transition={transition}>
      <Heading fontWeight={300}>Popcorn ????.</Heading>
      <Text fontWeight={300} className="demo-readme">
        This is a demo-slide.
        <br />
        Press &quot;p&quot; to start or stop.
        <br />
        This particular demo doesn't work without a nanoKEY2 midi keyboard????
      </Text>
      <div className="demo-mount" />
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Musikk!
      </Heading>
      <Text fontWeight={300}>
        Det er frustrerende ?? vite hvordan noe skal h??res ut, men ikke v??re
        istand til ?? gjenskape det.
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
      <Heading fontWeight={300}>F?? browsern til ?? spille Pop Corn.</Heading>
      <Appear>
        <Heading fontWeight={300}>Og vise oss det.</Heading>
      </Appear>
    </SlideLayout.Center>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hvor starter vi?
      </Heading>
      <Text fontWeight={300}>Vi kommer til ?? trenge to ting:</Text>
      <Appear>
        <Text fontWeight={300}>1 - Noe som spiller noter.</Text>
      </Appear>
      <Appear>
        <Text fontWeight={300}>2 - Noe som tegner ting p?? skjermen.</Text>
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        <CodeSpan>setInterval</CodeSpan> er v??rt f??rste m??te med skedulering.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>setInterval</CodeSpan> lar oss instruere nettlesern til ??
          gj??re noe hvert N-te ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        <CodeSpan>setInterval</CodeSpan> putter funksjonen v??r i k??en sammen med
        andre asynkrone ting nettleseren h??ndterer.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Dette betyr at vi ikke har noen garantier for at funksjonen v??r vil
          bli kj??rt av nettleseren med eksakt timing. N??r den blir kallt er
          avhengig av hva annet nettleseren m?? hanskes med.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 1: <CodeSpan>setInterval</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        Hvis du har trente ??rer kan det hende at du la merke til at det var noe
        off med fors??ket v??rt p?? ?? spille av Pop Corn.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Notene skal ikke alle v??re like lange, noen av dem er kortere.
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        <CodeSpan>setInterval</CodeSpan>s st??rste ulempe er at
        skeduleringsintervallet er fast.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Dette gj??r seg d??rlig n??r du trenger ?? justere lengden p??
          intervallene, som vi jo trenger n??r vi ??nsker ?? spille halvnoter.
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        <CodeSpan>setTimeout</CodeSpan> er en mer fleksibel l??sning enn{" "}
        <CodeSpan>setInterval</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Isteden for et repeterende fast intervall, kan vi skedulere funksjonen
          v??r til ?? bli kallt en gang hvert N-te ms.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 2: <CodeSpan>setTimeout</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        For ?? oppn?? den samme repeterende skeduleringen som vi hadde med{" "}
        <CodeSpan>setInterval</CodeSpan> benytter vi oss av rekursjon. Hver gang
        v??r funksjon blir kallt s??rger den selv for ?? skedulere neste kall.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Utover dette fungerer <CodeSpan>setTimeout</CodeSpan> og{" "}
          <CodeSpan>setInterval</CodeSpan> p?? den samme m??ten.
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
          Men det er godt nok for n??. La oss fortsette med del 2 av oppdraget:
          Noe som tegner ting p?? skjermen.
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
        Allerde her har vi truffet p?? v??r tredje metode for skedulering:{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>requestAnimationFrame</CodeSpan> er en m??te ?? be nettleseren
          om ?? kj??re en funksjon rett f??r den gj??r en ny tegning. Dette gir oss
          en m??te for ?? synkronisere koden v??r med nettleserens tenge-lopp.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        En stor forskjell fra de to andre metodene vi har sett p?? er at{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> ikke lar oss kontrollere
        timing.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Isteden f??r vi vite tidspunktet funksjonen blir kallt p?? gjennom et
          argument som browseren sender med n??r funksjonen v??r blir kallt. S?? vi
          kan oppn?? det samme med litt matte.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Metode 3: <CodeSpan>requestAnimationFrame</CodeSpan>
      </Heading>
      <Text fontWeight={300}>
        En annen ting som skiller <CodeSpan>requestAnimationFrame</CodeSpan> fra
        de to andre metodene er at vi ikke lengre deler k?? med alle andre
        asynkrone ting i nettleseren. Vi ligger i en egen tegne-k??, som
        nettleseren kan velge ?? prioritere.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har fortsatt ingen garantier fra nettleseren om eksakt eller stabil
          timing. Hvis koden v??r bruker for lang tid begynner nettleseren ??
          droppe frames, som igjen betyr at den dropper kall til funksjonen v??r.
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        Vi har noe som spiller noter, bygd ved ?? skedulere avspillinger med{" "}
        <CodeSpan>setTimeout</CodeSpan>. Og vi har noe som tegner noter p??
        skjermen, styrt av kontinuerlig kj??rende animasjonsloop bygd p??{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Hadde det ikke v??rt fint om de to bitene hadde basert seg p?? samme
          underliggende teknologi?
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Konsoliderte l??kker.</Text>
      <CodePane language="javascript" highlightRanges={[2, 3]}>
        {`
init()
loop()
playSong()
        `}
      </CodePane>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Konsoliderte l??kker.</Text>
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        Konsoliderte l??kker
      </Heading>
      <Text fontWeight={300}>Ops, vi har reintrodusert noen b??ggs.</Text>
      <Appear>
        <Text fontWeight={300}>
          Dette er samme feilen vi gjorde n??r vi ikke tok h??yde for at noter
          skal f??lge hverandre, selv om de ikke er like lange.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>Konsoliderte l??kker.</Text>
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        Konsoliderte l??kker
      </Heading>
      <Text fontWeight={300}>
        Vi har n?? klart ?? samle b??de skeduleringen av noter og tegningen av
        noter i samme l??kke.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi gj??r fortsatt mye manuelt synkroniseringsarbeid. La oss fikse det.
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        Vi har fjernet behovet for ?? manuelt holde styr p?? hvor i sangen vi er
        ved ?? isteden bare regne det ut i starten.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har ikke gjort noe med hvor lite motstandsdyktig avspillinga er til
          variasjoner i kj??retidsressurser. La oss fikse det og.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Text fontWeight={300}>K??er og framsynthet.</Text>
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        <CodeSpan>now()</CodeSpan> til ?? eksplisitt regne ut tiden vi vil at
        noten skal spille av.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Vi har og sjonglert ms og s gjennom hele koden v??r, som er ganske
          forvirrende.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Tid != Tid
      </Heading>
      <Text fontWeight={300}>
        I tillegg til tidspunktet vi f??r fra klokka i nettleseren, gjennom{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan>, har vi og tilgang p?? tid i
        klokka til <CodeSpan>WebAudio</CodeSpan>.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          <CodeSpan>WebAudio</CodeSpan>-klokka er den vi faktisk har brukt hele
          veien til ?? fortelle synthen v??r n??r en note skal spilles.
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
        En stor ulempe med ?? lese av klokka til nettleseren gjennom{" "}
        <CodeSpan>requestAnimationFrame</CodeSpan> er at vi kun f??r tilgang p??
        den n??r funksjonen v??r kalles.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          I tillegg snapshotter klokka, slik at alle funksjoner som kalles i
          samme runde av nettleserens tegneloop vil f?? samme tidspunkt,
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
        er bygget for h??y presisjon og kj??rer i sin egen lille loop, s??nn at den
        vil alltid v??re oppdatert n??r vi leser den av.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          N??r vi lager noe som tar sikte p?? ?? synkronisere lyd og bilde b??r vi
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
      <Heading fontWeight={300}>Popcorn ????.</Heading>
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
        Vi har n?? en liten snurre som blir kontinuerlig tegnet av en
        animasjonsloop basert p?? <CodeSpan>requestAnimationFrame</CodeSpan> og
        som bruker <CodeSpan>WebAudio</CodeSpan>-klokka til ?? skedulere en synth
        til ?? spille noter og synkronisere lyd og bilde.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Ikke v??rst ?? ha det p?? plass f??r l??nsj p?? en onsdag.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Hva har vi l??rt?
      </Heading>
      <Text fontWeight={300}>
        Det som startet som et moro-prosjekt for ?? gjenskape Pop Corn, en
        meme-l??t fra 1969, har gitt oss ganske verdifull innsikt i metodene vi
        har tilgjengelig i nettleseren for ?? hanskes med b??de lyd og bilde i
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
        L??ring.
      </Heading>
      <Text fontWeight={300}>
        Koding for egen underholdning kan v??re vel s?? l??rerikt som annen koding.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Det trenger ikke v??re seri??st eller nyttig. Eller korrekt for den saks
          skyld. At <em>du</em> f??r noe ut av det er det viktigste.
        </Text>
      </Appear>
    </Slide>
    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Nytte.
      </Heading>
      <Text fontWeight={300}>
        Programmering er et kreativt yrke. Ikke bare i form, men og i ut??velse.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          V??r nysgjerrig. V??r teit. Ha det moro. ?? v??re kreativ er en superpower
          for en utvikler.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        ?? vite at noe er mer.
      </Heading>
      <Text fontWeight={300}>Jeg pleide ?? spille piano n??r jeg var yngre.</Text>
      <Appear>
        <Text fontWeight={300}>
          Men jeg gav opp p?? det, til tross for at jeg var veldig glad i musikk,
          fordi jeg ikke s?? den kreative siden av det.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        ?? vite at noe er mer.
      </Heading>
      <Text fontWeight={300}>
        Spol frem noen ??r, og jeg g??r p?? universitetet for ?? bli en
        programmerer.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Mye p?? samme m??te som pianospillinga, s?? jeg kun den ene
          &quot;riktige&quot; veien.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        ?? vite at noe er mer.
      </Heading>
      <Text fontWeight={300}>
        N??r jeg etterhvert kom meg gjennom studiene ble jeg eksponert for en
        helt ny verden, hvor programmering ikke bare var <em>en</em> ting.
      </Text>
      <Appear>
        <Text fontWeight={300}>
          Og det er litt det jeg h??per at jeg har vist dere med denne lille
          fortellingen, at kode kan v??re mer. Hvis du vil, trenger eller synes
          det er det.
        </Text>
      </Appear>
    </Slide>

    <Slide transition={transition}>
      <Heading textAlign="left" fontWeight={300}>
        Dr??mmejobben
      </Heading>
      <Appear>
        <Text fontWeight={300}>
          ?? gj??re ting som{" "}
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
        Siden vi har snakket en del om ?? ha det moro...
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
        Og siden vi har en ganske fin struktur p?? dataene v??re...
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
        TAKK FOR AT DERE H??RTE P??!
      </Heading>
      <Text
        fontWeight="300"
        textAlign="center"
        padding="0px"
        margin="0px"
        fontSize={25}
      >
        Stian Veum M??llersen / @mollerse
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
