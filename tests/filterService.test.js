const { filterByCategory, filterBySearch, filterImages } = require("../js/filterService.js");

const images = [
  { title: "Animals 1", category: "Animals", tags: ["cat", "pet"] },
  { title: "Food 1", category: "Food", tags: ["pizza", "meal"] },
  { title: "Art 1", category: "Art", tags: ["painting", "abstract"] },
  { title: "BlackWhite 1", category: "BlackWhite", tags: ["monochrome", "portrait"] }
];

describe("Gallery filtering functions", () => {

  test("filterByCategory returns only images of the selected category", () => {
    const animals = filterByCategory(images, "Animals");
    expect(animals).toHaveLength(1);
    expect(animals[0].category).toBe("Animals");
  });

  test("filterByCategory returns all images when category is 'all'", () => {
    const all = filterByCategory(images, "all");
    expect(all).toHaveLength(images.length);
  });

  test("filterBySearch returns images matching tags (case-insensitive)", () => {
    const search = filterBySearch(images, "pizza");
    expect(search).toHaveLength(1);
    expect(search[0].title).toBe("Food 1");

    const search2 = filterBySearch(images, "PET");
    expect(search2).toHaveLength(1);
    expect(search2[0].title).toBe("Animals 1");
  });

  test("filterBySearch returns all images if query is empty", () => {
    const result = filterBySearch(images, "");
    expect(result).toHaveLength(images.length);
  });

  test("filterBySearch returns empty array when no tags match", () => {
    const result = filterBySearch(images, "nonexistent");
    expect(result).toEqual([]);
  });

  test("filterImages combines category and search filters correctly", () => {
    const result = filterImages(images, "Food", "pizza");
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("Food");
    expect(result[0].tags).toContain("pizza");

    const result2 = filterImages(images, "Animals", "pizza");
    expect(result2).toHaveLength(0);
  });
});
