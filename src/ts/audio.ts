let audio: HTMLAudioElement | null = null;

function toggleAudio() {
  if (!audio) {
    // Указываем относительный путь к файлу
    audio = new Audio('./audio/your-audio-file.m4a');
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
