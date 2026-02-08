(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    // Node / Jest
    module.exports = factory();
  } else {
    // Browser
    root.filterService = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  function filterByCategory(images, category) {
    if (category === "all") return images;
    return images.filter(img => img.category === category);
  }

  // Filter by search term (tags)
  function filterBySearch(images, query) {
    if (!query) return images;
    const q = query.toLowerCase();
    return images.filter(img =>
      img.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  // Combined filter
  function filterImages(images, category, query) {
    return filterBySearch(filterByCategory(images, category), query);
  }

  return {
    filterByCategory,
    filterBySearch,
    filterImages
  };
});
