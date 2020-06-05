import React, { Component, useEffect, useState } from "react";

import "./App.css";
import oi from "./audio/oi.mp3";
import name from "./audio/apresentação.mp3";
import creator from "./audio/criador.mp3";
import silence from "./audio/out.mp3";
import help from "./audio/ajuda_2.mp3";
import opinion from "./audio/pergunta_opinião.mp3";
import naoSei from "./audio/nao_sei.mp3";
import sim from "./audio/sim.mp3";
import bomDia from "./audio/corrigir_boa_tarde.mp3";
import Jarvis from "./components/ui";
import annyang from "annyang";
function Play() {
  const [audio, setAudio] = useState(silence);
  const [myInterval, setMyInteral] = useState("");

  function HearVoice() {
    if (annyang) {
      annyang.setLanguage("pt-BR");

      // Let's define a command.
      annyang.debug();
      var commands = {
        oi: function () {
          setAudio(oi);
        },
        olá: function () {
          setAudio(oi);
        },
        "bom dia": function () {
          setAudio(bomDia);
        },
        "qual o seu nome": function () {
          setAudio(name);
        },
        "quem criou você": function () {
          setAudio(creator);
        },
        "e qual é o seu nome": function () {
          setAudio(name);
        },
        "me ajuda": function () {
          setAudio(help);
        },
        "vai me ajudar": function () {
          setAudio(sim);
        },
        "me ajudar": function () {
          setAudio(sim);
        },
        "pesquise :pergunta": function (p) {
          alert(p);
        },
        "me leve ao :site": function (site) {
          if (site === "Google") {
            window.location.href = "http://www.google.com.br";
          }
          if (site === "YouTube") {
            window.location.href = "http://www.youtube.com.br";
          }
        },
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.addCallback("resultNoMatch", function (phrases) {
        setAudio(naoSei);
        console.log("Comando não reconhecido ", phrases);
      });
      annyang.addCallback("soundstart", function () {
        console.log("Falou");
      });

      annyang.addCallback("result", function () {
        console.log("parou");
      });
      // Start listening.
      annyang.start();
    }
  }

  useEffect(() => {
    let audioEl = document.getElementsByClassName("audio-element")[0];
    HearVoice();
    audioEl.src = silence;

    audioEl.play();

    //manageAudios("não");
    //setNewAudio();
  }, []);

  return (
    <div>
      <audio
        className="audio-element"
        onPlay={() => {}}
        onEnded={() => {
          let audioEl = document.getElementsByClassName("audio-element")[0];
          if (audio !== silence) {
            let size = 55;

            setMyInteral(
              setInterval(() => {
                document.getElementsByClassName("circles")[0].style.width =
                  size + "vmin";
                document.getElementsByClassName("circles")[0].style.height =
                  size + "vmin";
                if (size > 70) {
                  size = 55;
                }
                size += 5;
              }, 100)
            );
          }
          audioEl.src = audio;
          audioEl.play();

          setAudio(silence);

          clearInterval(myInterval);

          document.getElementsByClassName("circles")[0].style.width = "50vmin";
          document.getElementsByClassName("circles")[0].style.height = "50vmin";
        }}
      >
        <source src={oi}></source>
      </audio>
    </div>
  );
}

function App() {
  return (
    <>
      <Jarvis />
      <Play />
    </>
  );
}

export default App;
