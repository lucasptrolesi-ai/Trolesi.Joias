// Menu mobile simples
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Fecha o menu ao clicar em um link
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });
}
// =========================
// CARREGAR CATEGORIAS
// =========================

fetch("products.json")
  .then(res => res.json())
  .then(data => {
    renderCategories(data);

    document.getElementById("categorySelect")
      .addEventListener("change", () => renderCategories(data));

    document.getElementById("materialSelect")
      .addEventListener("change", () => renderCategories(data));
  });

function renderCategories(data) {
  const categoryGrid = document.getElementById("categoryGrid");
  const categoryFilter = document.getElementById("categorySelect").value;
  const materialFilter = document.getElementById("materialSelect").value;

  categoryGrid.innerHTML = "";

  Object.keys(data).forEach(id => {
    const p = data[id];

    if ((categoryFilter === "all" || p.type === categoryFilter) &&
        (materialFilter === "all" || p.material === materialFilter)) {

      const card = document.createElement("div");
      card.classList.add("category-card");

      card.innerHTML = `
        <img src="${p.images[0] || 'img/default.jpg'}">
        <h3>${p.name}</h3>
        <span>${p.material}</span>
      `;

      card.addEventListener("click", () => {
        window.location.href = `product.html?id=${id}`;
      });

      categoryGrid.appendChild(card);
    }
  });
}
