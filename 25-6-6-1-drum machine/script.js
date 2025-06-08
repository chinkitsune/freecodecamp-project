// Constants for selectors and data
const drumPads = [
  { key: "Q", id: "Heater-1", name: "Heater 1", src: "Heater-1.mp3" },
  { key: "W", id: "Heater-2", name: "Heater 2", src: "Heater-2.mp3" },
  { key: "E", id: "Heater-3", name: "Heater 3", src: "Heater-3.mp3" },
  { key: "A", id: "Heater-4", name: "Heater 4", src: "Heater-4_1.mp3" },
  { key: "S", id: "Clap", name: "Clap", src: "Heater-6.mp3" },
  { key: "D", id: "Open-HH", name: "Open-HH", src: "Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", name: "Kick-n'-Hat", src: "Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", name: "Kick", src: "RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", name: "Closed-HH", src: "Cev_H2.mp3" }
];

const drumBank = document.getElementById("pad-bank");
const text = document.getElementById("display");
const powerText = document.getElementById("power-text");
const powerControlBtn = document.getElementById("power-control");
const volumeNum = document.getElementById("volume-num");
const volumeControl = document.getElementById("volume");

//set default check for the power control
checkPowerControl()

// if the power switch is off, remove all the play events
function checkPowerControl() {
  const isOn = powerControlBtn.checked;
  if (isOn){
    document.addEventListener("keydown", handleKey);
    drumBank.addEventListener("click", handleClick);
    powerText.textContent = "On";
  }
  else{
    document.removeEventListener("keydown", handleKey);
    drumBank.removeEventListener("click",handleClick);
    powerText.textContent = "Off";
    text.textContent = "Power is off";
  }
}

powerControlBtn.addEventListener("click", checkPowerControl);

  
// change volume when user slide the volume bar
function controlVol() {
  volumeNum.innerHTML = `${volumeControl.value}%` ;
  return volumeControl.value / 100;
}

volumeControl.addEventListener("input", controlVol)


  //play drum audio and show drum name
function playDrum(key) {

  const pad = drumPads.find(p => p.key === key);
  if (!pad) return; // If no pad found, exit

  const targetedAudio = document.getElementById(pad.key);
  if (!targetedAudio) return; // If no audio element found, exit

  targetedAudio.currentTime = 0;
  targetedAudio.play();
  targetedAudio.volume = controlVol();
  text.textContent = pad.name;
}


//when user clicks the key, start to play
function handleClick(e) {
  playDrum(e.target.id.slice(4).toUpperCase());
}

//when user press the corresponding keys, start to play
function handleKey(event) {
  playDrum(event.key.toUpperCase());
}



