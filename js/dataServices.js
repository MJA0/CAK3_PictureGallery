async function fetchImages() {
  const response = await fetch("data/images.json");
  if (!response.ok) {
    throw new Error("Could not load image");
  }
  return response.json();
}

module.exports = { fetchImages };
