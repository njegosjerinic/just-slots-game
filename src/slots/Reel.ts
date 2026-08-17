import * as PIXI from "pixi.js";
import { AssetLoader } from "../utils/AssetLoader";

const SPIN_SPEED = 50; // Pixels per frame
const SLOWDOWN_RATE = 0.95; // Rate at which the reel slows down
const LANDING_SPEED = 18;

export class Reel {
  public container: PIXI.Container;
  private symbols: PIXI.Sprite[];
  private symbolSize: number;
  private symbolCount: number;
  private speed: number = 0;
  private isSpinning: boolean = false;
  private reelStrip: string[];
  private stopPosition: number;
  private currentPosition: number;
  private offset = 0;
  private distanceUntilStop: number | null = null;

  constructor(
    symbolCount: number,
    symbolSize: number,
    reelStrip: string[],
    stopPosition: number,
  ) {
    this.container = new PIXI.Container();
    this.symbols = [];
    this.symbolSize = symbolSize;
    this.symbolCount = symbolCount;
    this.reelStrip = reelStrip;
    this.stopPosition = stopPosition;
    this.currentPosition = stopPosition;

    this.createSymbols();

    const mask = new PIXI.Graphics();

    mask.beginFill(0xffffff);
    mask.drawRect(0, 0, this.symbolCount * this.symbolSize, this.symbolSize);
    mask.endFill();

    this.container.addChild(mask);
    this.container.mask = mask;
  }

  private createSymbols(): void {
    // Create symbols for the reel, arranged horizontally
    for (let i = 0; i <= this.symbolCount; i++) {
      const symbol = this.createSymbol(this.reelStrip[0]);
      symbol.anchor.y = 0.5;
      symbol.y = this.symbolSize / 2;

      this.symbols.push(symbol);
      this.container.addChild(symbol);
    }

    this.renderSymbols();
  }

  private createSymbol(symbolName: string): PIXI.Sprite {
    const texture = AssetLoader.getTexture(symbolName);
    const sprite = new PIXI.Sprite(texture);

    sprite.width = 140;
    sprite.height = 140;

    return sprite;
  }

  public update(delta: number): void {
    if (!this.isSpinning) return;

    if (this.distanceUntilStop !== null) {
      this.speed = Math.max(
        LANDING_SPEED,
        this.speed * Math.pow(SLOWDOWN_RATE, delta),
      );
    }

    let movement = this.speed * delta;

    if (this.distanceUntilStop !== null) {
      movement = Math.min(movement, this.distanceUntilStop);
      this.distanceUntilStop -= movement;
    }

    this.move(movement);

    if (this.distanceUntilStop !== null && this.distanceUntilStop <= 0) {
      this.currentPosition = this.stopPosition;
      this.offset = 0;
      this.distanceUntilStop = null;
      this.speed = 0;
      this.isSpinning = false;
      this.renderSymbols();
    }
  }

  private move(distance: number): void {
    this.offset += distance;

    while (this.offset >= this.symbolSize) {
      this.offset -= this.symbolSize;
      this.currentPosition = this.mod(
        this.currentPosition - 1,
        this.reelStrip.length,
      );
    }

    this.renderSymbols();
  }

  private renderSymbols(): void {
    for (let i = 0; i < this.symbols.length; i++) {
      this.symbols[i].x = (i - 1) * this.symbolSize + this.offset;
      const position = this.mod(
        this.currentPosition + i - 1,
        this.reelStrip.length,
      );
      this.symbols[i].texture = AssetLoader.getTexture(
        this.reelStrip[position],
      );
    }
  }

  private mod(value: number, divisor: number): number {
    return ((value % divisor) + divisor) % divisor;
  }

  public startSpin(): void {
    this.isSpinning = true;
    this.speed = SPIN_SPEED;
    this.distanceUntilStop = null;
  }

  public stopSpin(reelStrip: string[], stopPosition: number): void {
    this.reelStrip = reelStrip;
    this.stopPosition = stopPosition;

    const stepsToTarget = this.mod(
      this.currentPosition - this.stopPosition,
      this.reelStrip.length,
    );
    const landingSteps =
      stepsToTarget === 0 ? this.reelStrip.length : stepsToTarget;

    this.distanceUntilStop = landingSteps * this.symbolSize - this.offset;
  }

  public get hasFullyStopped(): boolean {
    return !this.isSpinning && this.speed === 0;
  }

  public getVisibleSymbols(): string[] {
    const visibleSymbols: string[] = [];

    for (let i = 0; i < this.symbolCount; i++) {
      const position = (this.currentPosition + i) % this.reelStrip.length;

      visibleSymbols.push(this.reelStrip[position]);
    }

    return visibleSymbols;
  }
}
