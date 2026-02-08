const { fetchImages } = require ("../js/dataService.js");

// Mock global fetch
global.fetch = jest.fn();

describe("dataService.fetchImages", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("returns JSON data when fetch succeeds", async () => {
    const mockData = [
      { title: "Animals 1", category: "Animals", tags: ["cat"] }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await fetchImages();

    expect(fetch).toHaveBeenCalledWith("data/images.json");
    expect(result).toEqual(mockData);
  });

  test("throws error with correct message when response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({})
    });

    await expect(fetchImages()).rejects.toThrow("Could not load image");
  });

  test("throws error when fetch fails completely", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchImages()).rejects.toThrow("Network error");
  });

  test("throws error if response.json throws", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      }
    });

    await expect(fetchImages()).rejects.toThrow("Invalid JSON");
  });
});
