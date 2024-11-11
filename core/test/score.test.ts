import {ScoreCalculator} from "../src/score.ts";

describe("score", () => {
    test("if  pin is knocked down, score is 1", () => {
        // Given
        const scoreCalculator = new ScoreCalculator();
        scoreCalculator.submitLastThrowResult(1);

        // When
        const actualScore = scoreCalculator.getCurrentScore();

        // Then
        expect(actualScore).toBe(1);
    })
})