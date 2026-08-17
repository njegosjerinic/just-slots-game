import { describe, expect, it } from "vitest";
import { RGS } from "./rgs";

describe("RGS", () => {
  it("returns reels and initial stop positions", () => {
    const rgs = new RGS();

    const result = rgs.init();

    expect(result.reels).toHaveLength(4);
    expect(result.stopPositions).toEqual([0, 0, 0, 0]);
  });

  it("returns one stop position for every reel", () => {
    const rgs = new RGS();

    const result = rgs.spin();

    expect(result.stopPositions).toHaveLength(result.reels.length);
  });

  it("returns only valid stop positions", () => {
    const rgs = new RGS();

    const result = rgs.spin();

    result.stopPositions.forEach((stopPosition, reelIndex) => {
      const reel = result.reels[reelIndex];

      expect(stopPosition).toBeGreaterThanOrEqual(0);
      expect(stopPosition).toBeLessThan(reel.length);
    });
  });

  it("returns reels with every spin result", () => {
    const rgs = new RGS();

    const initialResult = rgs.init();
    const spinResult = rgs.spin();

    expect(spinResult.reels).toEqual(initialResult.reels);
  });
});
