export class RGS {
  private reels = [
    [
      "symbol1.png",
      "symbol3.png",
      "symbol2.png",
      "symbol5.png",
      "symbol1.png",
      "symbol4.png",
    ],
    [
      "symbol4.png",
      "symbol2.png",
      "symbol1.png",
      "symbol3.png",
      "symbol5.png",
      "symbol2.png",
    ],
    [
      "symbol2.png",
      "symbol5.png",
      "symbol3.png",
      "symbol1.png",
      "symbol4.png",
      "symbol3.png",
    ],
    [
      "symbol5.png",
      "symbol1.png",
      "symbol4.png",
      "symbol2.png",
      "symbol3.png",
      "symbol1.png",
    ],
  ];

  init(): { reels: string[][]; stopPositions: number[] } {
    return {
      reels: this.reels,
      stopPositions: [0, 0, 0, 0],
    };
  }

  spin(): { reels: string[][]; stopPositions: number[] } {
    const stopPositions: number[] = [];

    for (const reel of this.reels) {
      const randomPosition = Math.floor(Math.random() * reel.length);
      stopPositions.push(randomPosition);
    }

    return {
      reels: this.reels,
      stopPositions,
    };
  }
}
