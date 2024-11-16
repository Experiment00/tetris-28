let audio: HTMLAudioElement | null = null;

function toggleAudio() {
  if (!audio) {
    audio = new Audio('C:\Users\khali\OneDrive\Рабочий стол\tetris-28\audio.mp4a');
    audio.loop = true;
    audio.play();
  } else {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
}

export { toggleAudio };
