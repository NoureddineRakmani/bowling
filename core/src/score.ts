type Games<G> = Tuple<G, 3>;
type Frames<F> = Tuple<F, 10>;
type Bowls<B> = Tuple<B, 2>;
type PinNumber = number;

type GameState = Games<Frames<Bowls<PinNumber|undefined>>>;


export class ScoreCalculator {
    private gameState: GameState

    constructor() {
        this.gameState = this.initializeGameState()
    }

    private initializeGameState(): GameState {
        const makeFrame = () => [...Array(2)].map(() => undefined)
        const makeGame = () => [...Array(10)].map(() => makeFrame())
        const makeAllGames = () => [...Array(3)].map(() => makeGame())

        return makeAllGames() as GameState;
    }

    submitLastThrowResult(knockedDownPins: number): void {
        if (knockedDownPins < 0 || knockedDownPins > 10) {
            throw new Error("Pin number must be between 0 and 10")
        }
        this.gameState[0][0][0] = knockedDownPins
    }

    getCurrentScore(): number {
        return this.gameState[0][0][0] || 0;
    }
}