import { Howl } from "howler";

const sounds = new Map<string, Howl>();

export const sound = {
  add: (alias: string, url: string): Promise<void> => {
    return new Promise((resolve) => {
      const howl = new Howl({
        src: [url],
        preload: true,
        onload: () => resolve(),
      });

      sounds.set(alias, howl);
    });
  },
  play: (alias: string): void => {
    sounds.get(alias)?.play();
  },
  stop: (alias: string): void => {
    sounds.get(alias)?.stop();
  },
};
