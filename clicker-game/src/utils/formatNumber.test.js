import { describe, it, expect } from "vitest";
import format from "./formatNumber";

describe('format tests', () => {
  it('formats a number into 1dp', () => {
    expect(format(2.4921)).toBe(2.5);
    expect(format(4190284.192847)).toBe(4190284.2);
  });
});