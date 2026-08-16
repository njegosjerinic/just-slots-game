import * as PIXI from "pixi.js";
import { AssetLoader } from "../utils/AssetLoader";

const SYMBOL_TEXTURES = [
  "symbol1.png",
  "symbol2.png",
  "symbol3.png",
  "symbol4.png",
  "symbol5.png",
];

const SPIN_SPEED = 50; // Pixels per frame
const SLOWDOWN_RATE = 0.95; // Rate at which the reel slows down

export class Reel {
  public container: PIXI.Container;
  private symbols: PIXI.Sprite[];
  private symbolSize: number;
  private symbolCount: number;
  private speed: number = 0;
  private isSpinning: boolean = false;

  constructor(symbolCount: number, symbolSize: number) {
    this.container = new PIXI.Container();
    this.symbols = [];
    this.symbolSize = symbolSize;
    this.symbolCount = symbolCount;

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
      const symbol = this.createRandomSymbol();
      symbol.x = i * this.symbolSize - 150;
      symbol.anchor.y = 0.5;
      symbol.y = this.symbolSize / 2;

      this.symbols.push(symbol);
      this.container.addChild(symbol);
    }
  }

  private createRandomSymbol(): PIXI.Sprite {
    const randomSymbol = AssetLoader.getTexture(
      SYMBOL_TEXTURES[Math.floor(Math.random() * SYMBOL_TEXTURES.length)],
    );

    const sprite = new PIXI.Sprite(randomSymbol);

    sprite.width = 140;

    sprite.height = 140;

    return sprite;
  }

  public update(delta: number): void {
    if (!this.isSpinning && this.speed === 0) return;

    const visibleWidth = this.symbolCount * this.symbolSize; // 900
    const trackWidth = (this.symbolCount + 1) * this.symbolSize; // 1050

    for (const symbol of this.symbols) {
      symbol.x += this.speed * delta;

      if (symbol.x >= visibleWidth) {
        symbol.x -= trackWidth;
      }
    }

    // If we're stopping, slow down the reel
    if (!this.isSpinning && this.speed > 0) {
      this.speed *= SLOWDOWN_RATE;

      // If speed is very low, stop completely and snap to grid
      if (this.speed < 0.5) {
        this.speed = 0;
        this.snapToGrid();
      }
    }
  }

  private snapToGrid(): void {
    const visibleWidth = this.symbolCount * this.symbolSize; // 900
    const trackWidth = (this.symbolCount + 1) * this.symbolSize; // 1050

    for (const symbol of this.symbols) {
      symbol.x = Math.round(symbol.x / this.symbolSize) * this.symbolSize;

      if (symbol.x >= visibleWidth) {
        symbol.x -= trackWidth;
      }
    }
  }

  public startSpin(): void {
    this.isSpinning = true;
    this.speed = SPIN_SPEED;
  }

  public stopSpin(): void {
    this.isSpinning = false;
    // The reel will gradually slow down in the update method
  }

  public get hasFullyStopped(): boolean {
    return !this.isSpinning && this.speed === 0;
  }
}
