(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    // Node / Jest
    module.exports = factory();
  } else {
    // Browser
    root.exerciseService = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  
  function renderGallery(container, images) {
    container.innerHTML = "";

    images.forEach(img => {
      const figure = document.createElement("figure");

      const image = document.createElement("img");
      image.src = img.thumbnail;
      image.alt = img.title;
      image.loading = "lazy";

      figure.appendChild(image);
      container.appendChild(figure);
    });
  }
});
