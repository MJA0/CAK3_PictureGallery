export function renderGallery(container, images) {
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
