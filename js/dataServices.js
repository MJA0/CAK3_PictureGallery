async function fetchImages() {
  const response = await fetch("data/images.json");
  if (!response.ok) {
    throw new Error("Kunde inte ladda bilder");
  }
  return response.json();
}

module.exports = { fetchImages };
