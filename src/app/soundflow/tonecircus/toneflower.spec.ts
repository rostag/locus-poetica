import { ToneFlower } from "./toneflower.class";
import { FlowerModel, LeafModel } from "./toneflower.model";
import { IC, IDNS } from "./toneflower.constants";

// Spec: openspec/changes/tonecircus-numerology-rules/specs/flower-rendering/spec.md

describe("flower-rendering — ToneFlower.seed()", () => {
  function makeFlowerModel(leafCount: number): FlowerModel {
    const leaves: LeafModel[] = [];
    for (let i = 0; i < leafCount; i++) {
      leaves.push({
        leafOrder: i,
        leafIdn: IDNS[i % IDNS.length],
        leafNum: i + 1,
      });
    }
    return {
      flowerX: 100,
      flowerY: 200,
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
      leaves,
    };
  }

  it("seeded leaves array length matches input length", () => {
    const flower = new ToneFlower();
    flower.seed(makeFlowerModel(5));
    expect(flower.leaves).toHaveLength(5);
  });

  it("seeded leaves preserve leafOrder indices", () => {
    const flower = new ToneFlower();
    flower.seed(makeFlowerModel(4));
    expect(flower.leaves.map((l) => l.leafOrder)).toEqual([0, 1, 2, 3]);
  });

  it("seed sets cx and cy from flowerModel coordinates", () => {
    const flower = new ToneFlower();
    flower.seed(makeFlowerModel(1));
    expect(flower.cx).toEqual(100);
    expect(flower.cy).toEqual(200);
  });

  it("burn() clears the leaves array", () => {
    const flower = new ToneFlower();
    flower.seed(makeFlowerModel(3));
    flower.burn();
    expect(flower.leaves).toHaveLength(0);
  });

  it("default baseRadius and leafWidth from IC constants", () => {
    const flower = new ToneFlower();
    expect(flower.baseRadius).toEqual(IC.flowerButtSize);
    expect(flower.leafWidth).toEqual(IC.flowerLeafWidth);
  });
});

describe("flower-rendering — ring geometry formulas", () => {
  // From toneflower.component.ts drawFlower():
  //   const radius = flower.baseRadius + flower.leafWidth * index;
  //   addArc(..., index === 0 ? 0 : radius, radius + flower.leafWidth, ...)
  //
  // So per leafOrder N:
  //   - center disc (N=0): innerRadius=0, outerRadius = baseRadius + leafWidth
  //   - ring N (>0): innerRadius = baseRadius + leafWidth × N, outerRadius = innerRadius + leafWidth

  const baseRadius = IC.flowerButtSize; // 12
  const leafWidth = IC.flowerLeafWidth; // 10

  function ringRadii(leafOrder: number): { inner: number; outer: number } {
    const radius = baseRadius + leafWidth * leafOrder;
    const inner = leafOrder === 0 ? 0 : radius;
    const outer = radius + leafWidth;
    return { inner, outer };
  }

  it("leafOrder 0 (center disc): innerRadius=0, outerRadius=22", () => {
    expect(ringRadii(0)).toEqual({ inner: 0, outer: 22 });
  });

  it("leafOrder 1: innerRadius=22, outerRadius=32", () => {
    expect(ringRadii(1)).toEqual({ inner: 22, outer: 32 });
  });

  it("leafOrder 2: innerRadius=32, outerRadius=42", () => {
    expect(ringRadii(2)).toEqual({ inner: 32, outer: 42 });
  });

  it("ring width is constant = leafWidth", () => {
    for (let i = 1; i < 6; i++) {
      const { inner, outer } = ringRadii(i);
      expect(outer - inner).toEqual(leafWidth);
    }
  });
});

describe("flower-rendering — getSectionData (leafNum → sectors)", () => {
  // Mirrors the private getSectionData() in toneflower.component.ts:
  //   const sections = new Array(leafNum);
  //   const s = 360 / leafNum;
  //   sections.fill(s, 0, leafNum);
  function getSectionData(leafNum: number): number[] {
    const sections = new Array(leafNum);
    const s = 360 / leafNum;
    sections.fill(s, 0, leafNum);
    return sections;
  }

  it("leafNum=1 → one 360° sector", () => {
    expect(getSectionData(1)).toEqual([360]);
  });

  it("leafNum=3 → three 120° sectors", () => {
    expect(getSectionData(3)).toEqual([120, 120, 120]);
  });

  it("leafNum=4 → four 90° sectors", () => {
    expect(getSectionData(4)).toEqual([90, 90, 90, 90]);
  });

  it("leafNum=12 → twelve 30° sectors", () => {
    expect(getSectionData(12)).toHaveLength(12);
    expect(getSectionData(12).every((d) => d === 30)).toBe(true);
  });
});
