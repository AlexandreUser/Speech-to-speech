import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import oi from "./audio/oi.mp3";
import name from "./audio/apresentação.mp3";
import creator from "./audio/criador.mp3";
import silence from "./audio/out.mp3";
import help from "./audio/ajuda_2.mp3";
import opinion from "./audio/pergunta_opinião.mp3";
import naoSei from "./audio/nao_sei.mp3";
import sim from "./audio/sim.mp3";

import annyang from "annyang";
function Play() {
  const [audio, setAudio] = useState(silence);
  function HearVoice() {
    if (annyang) {
      annyang.setLanguage("pt-BR");

      // Let's define a command.
      annyang.debug();
      var commands = {
        oi: function () {
          setAudio(oi);
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
        onEnded={() => {
          let audioEl = document.getElementsByClassName("audio-element")[0];
          audioEl.src = audio;

          audioEl.play();
          setAudio(silence);
        }}
      >
        <source src={oi}></source>
      </audio>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Play />
    </div>
  );
}

export default App;
