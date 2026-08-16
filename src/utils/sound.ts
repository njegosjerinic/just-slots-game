import { Howl } from "howler";

const sounds = new Map<string, Howl>();

export const sound = {
  add: (alias: string, url: string): void => {
    sounds.set(
      alias,
      new Howl({
        src: [url],
      }),
    );
  },
  play: (alias: string): void => {
    sounds.get(alias)?.play();
  },
  stop: (alias: string): void => {
    sounds.get(alias)?.stop();
  },
};
