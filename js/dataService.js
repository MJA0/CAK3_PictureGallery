(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    // Node / Jest
    module.exports = factory();
  } else {
    // Browser
    root.dataService = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  async function fetchImages() {
    const response = await fetch("data/images.json");
    if (!response.ok) {
      throw new Error("Could not load image");
    }
    return response.json();
  }

  return { fetchImages };
});
