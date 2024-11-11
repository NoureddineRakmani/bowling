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

    test("if two pins are knocked down, score is 2", () => {
        // Given
        const scoreCalculator = new ScoreCalculator();
        scoreCalculator.submitLastThrowResult(2);

        // When
        const actualScore = scoreCalculator.getCurrentScore();

        // Then
        expect(actualScore).toBe(2);
    })

    test("if pin number is invalid, throw an error - 1", () => {
        // Given
        const scoreCalculator = new ScoreCalculator();
        const submit = () => scoreCalculator.submitLastThrowResult(-1);

        // Then
        expect(submit).toThrow();
    })

    test("if pin number is invalid, throw an error - 2", () => {
        // Given
        const scoreCalculator = new ScoreCalculator();
        const submit = () => scoreCalculator.submitLastThrowResult(11);

        // Then
        expect(submit).toThrow();
    })
})