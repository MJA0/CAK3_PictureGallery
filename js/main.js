const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

let images = [];
let currentCategory = "all"; 
let currentSearch = ""; 

async function loadImages() {
  try {
    const res = await fetch("../data/images.json");
    if (!res.ok) throw new Error("Failed to load images.json");
    images = await res.json();
    renderGallery();
  } catch (err) {
    console.error(err);
    gallery.innerHTML = "<p>Failed to load images.</p>";
  }
}

function renderGallery() {
  gallery.innerHTML = "";

  const filtered = images.filter(img => {
    const matchCategory = currentCategory === "all" || img.category === currentCategory;
    const matchSearch = !currentSearch || img.tags.some(tag => tag.toLowerCase().includes(currentSearch.toLowerCase()));
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    gallery.innerHTML = "<p>No images match your search.</p>";
    return;
  }

  filtered.forEach(img => {
    const figure = document.createElement("figure");
    figure.classList.add("gallery-item");

    const imgEl = document.createElement("img");
    imgEl.src = img.thumbnail;
    imgEl.alt = img.title;
    imgEl.loading = "lazy";

    // Fixed fallback to prevent infinite loop
    imgEl.onerror = function () {
      if (imgEl.src !== "images/placeholder.jpg") {
        imgEl.src = "images/placeholder.jpg";
      }
    };

    figure.addEventListener("click", () => showModal(img.full, img.title));

    const caption = document.createElement("figcaption");
    caption.textContent = img.title;

    figure.appendChild(imgEl);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}

function showModal(src, alt) {
  modalImage.src = src;
  modalImage.alt = alt;
  modal.classList.remove("hidden");

  // fallback if full image fails to load
  modalImage.onerror = function() {
    modalImage.src = "images/placeholder.jpg";
  };
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalImage.src = "";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    modalImage.src = "";
  }
});

document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    renderGallery();
  });
});

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value;
  renderGallery();
});

loadImages();
