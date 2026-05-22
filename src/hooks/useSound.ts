'use client';

const SOUNDS = {
  click: 'https://www.myinstants.com/media/sounds/click2.mp3',
  error: 'https://www.myinstants.com/media/sounds/erro.mp3',
  close: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3',
};

export function playSound(name: keyof typeof SOUNDS) {
  try {
    const audio = new Audio(SOUNDS[name]);
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch {}
}
