type Games<G> = Tuple<G, 3>;
type Frames<F> = Tuple<F, 10>;
type Bowls<B> = Tuple<B, 2>;
type PinNumber = number;

type GameState = Games<Frames<Bowls<PinNumber|undefined>>>;


export class ScoreCalculator {
    private gameState: GameState
    private currentBowlIndex: number

    constructor() {
        this.gameState = this.initializeGameState()
        this.currentBowlIndex = -1;
    }

    private initializeGameState(): GameState {
        const makeFrame = () => [...Array(2)].map(() => undefined)
        const makeGame = () => [...Array(10)].map(() => makeFrame())
        const makeAllGames = () => [...Array(3)].map(() => makeGame())

        return makeAllGames() as GameState;
    }

    submitLastThrowResult(knockedDownPins: number): void {
        if (knockedDownPins < 0 || knockedDownPins > 10) {
            throw new Error("Pin number must be between 0 and 10");
        }
        this.currentBowlIndex = this.currentBowlIndex + 1;
        this.gameState[0][0][this.currentBowlIndex] = knockedDownPins;
    }

    private getKnockedDownPinAt(gameIndex: number, frameIndex: number, bowlIndex: number): number {
        return this.gameState[0][0][bowlIndex] || 0;
    }

    getCurrentScore(): number {
        return this.getKnockedDownPinAt(0, 0, this.currentBowlIndex - 1) + this.getKnockedDownPinAt(0, 0, this.currentBowlIndex);
    }
}