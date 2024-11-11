type Games<G> = Tuple<G, 3>;
type Frames<F> = Tuple<F, 10>;
type Bowls<B> = Tuple<B, 2>;
type PinNumber = number;

type GameState = Games<Frames<Bowls<PinNumber | undefined>>>;

export class ScoreCalculator {
  private gameState: GameState;
  private currentBowlIndex: number;
  private currentFrameIndex: number;

  constructor() {
    this.gameState = this.initializeGameState();
    this.currentBowlIndex = -1;
    this.currentFrameIndex = 0;
  }

  private initializeGameState(): GameState {
    const makeFrame = () => [...Array(2)].map(() => undefined);
    const makeGame = () => [...Array(10)].map(() => makeFrame());
    const makeAllGames = () => [...Array(3)].map(() => makeGame());

    return makeAllGames() as GameState;
  }

  submitLastThrowResult(knockedDownPins: number): void {
    if (knockedDownPins < 0 || knockedDownPins > 10) {
      throw new Error("Pin number must be between 0 and 10");
    }

    // Handle bowl / frame index update
    if (this.currentBowlIndex == 1) {
      this.currentBowlIndex = 0;
      this.currentFrameIndex = this.currentFrameIndex + 1;
    } else {
      this.currentBowlIndex = this.currentBowlIndex + 1;
    }

    this.gameState[0][this.currentFrameIndex][this.currentBowlIndex] =
      knockedDownPins;
  }

  private getKnockedDownPinAt(
    gameIndex: number,
    frameIndex: number,
    bowlIndex: number,
  ): number {
    return this.gameState[0][frameIndex][bowlIndex] || 0;
  }

  private getFrameScore(gameIndex: number, frameIndex: number): number {
    return (
      this.getKnockedDownPinAt(
        gameIndex,
        frameIndex,
        this.currentBowlIndex - 1,
      ) + this.getKnockedDownPinAt(gameIndex, frameIndex, this.currentBowlIndex)
    );
  }

  getCurrentScore(): number {
    return [...Array(this.currentFrameIndex + 1)]
      .map((_, index) => {
        return this.getFrameScore(0, index);
      })
      .reduce((acc, newValue) => {
        return acc + newValue;
      }, 0);
  }
}
