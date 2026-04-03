import { describe, it, expect } from "vitest";
import { calculateScore, getResultLabel } from "../scoring";

describe("calculateScore", () => {
  it("returns 10 points for exact score match", () => {
    const result = calculateScore(
      { homeScore: 2, awayScore: 1 },
      { homeScore: 2, awayScore: 1 }
    );
    expect(result.points).toBe(10);
    expect(result.type).toBe("exact");
  });

  it("returns 10 points for exact 0-0 draw", () => {
    const result = calculateScore(
      { homeScore: 0, awayScore: 0 },
      { homeScore: 0, awayScore: 0 }
    );
    expect(result.points).toBe(10);
    expect(result.type).toBe("exact");
  });

  it("returns 5 points for correct goal difference", () => {
    const result = calculateScore(
      { homeScore: 3, awayScore: 2 },
      { homeScore: 2, awayScore: 1 }
    );
    expect(result.points).toBe(5);
    expect(result.type).toBe("difference");
  });

  it("returns 5 points for correct draw difference (not exact)", () => {
    const result = calculateScore(
      { homeScore: 1, awayScore: 1 },
      { homeScore: 2, awayScore: 2 }
    );
    expect(result.points).toBe(5);
    expect(result.type).toBe("difference");
  });

  it("returns 3 points for correct result (home win)", () => {
    const result = calculateScore(
      { homeScore: 3, awayScore: 0 },
      { homeScore: 1, awayScore: 0 }
    );
    expect(result.points).toBe(3);
    expect(result.type).toBe("result");
  });

  it("returns 3 points for correct result (away win)", () => {
    const result = calculateScore(
      { homeScore: 0, awayScore: 3 },
      { homeScore: 1, awayScore: 2 }
    );
    expect(result.points).toBe(3);
    expect(result.type).toBe("result");
  });

  it("returns 0 points for wrong prediction", () => {
    const result = calculateScore(
      { homeScore: 2, awayScore: 0 },
      { homeScore: 0, awayScore: 1 }
    );
    expect(result.points).toBe(0);
    expect(result.type).toBe("wrong");
  });

  it("returns 0 points when match not finished (null scores)", () => {
    const result = calculateScore(
      { homeScore: 2, awayScore: 1 },
      { homeScore: null, awayScore: null }
    );
    expect(result.points).toBe(0);
    expect(result.type).toBe("wrong");
  });

  it("returns 0 points for predicting win but actual draw", () => {
    const result = calculateScore(
      { homeScore: 2, awayScore: 0 },
      { homeScore: 1, awayScore: 1 }
    );
    expect(result.points).toBe(0);
    expect(result.type).toBe("wrong");
  });
});

describe("getResultLabel", () => {
  it("returns home win label", () => {
    expect(getResultLabel(2, 1)).toBe("主勝");
  });

  it("returns away win label", () => {
    expect(getResultLabel(0, 3)).toBe("客勝");
  });

  it("returns draw label", () => {
    expect(getResultLabel(1, 1)).toBe("平手");
  });

  it("returns draw label for 0-0", () => {
    expect(getResultLabel(0, 0)).toBe("平手");
  });
});
