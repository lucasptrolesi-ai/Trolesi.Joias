/* =========================================
   MENU MOBILE
========================================= */

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Fecha o menu ao clicar em qualquer link
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });
}


/* =========================================
   FILTROS DE PRODUTOS
========================================= */

const filterType = document.getElementById("filterType");
const filterMaterial = document.getElementById("filterMaterial");
const productsGrid = document.getElementById("productsGrid");

// Função principal de filtragem
function filterProducts() {
  const typeValue = filterType.value;
  const materialValue = filterMaterial.value;

  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const type = product.getAttribute("data-type");
    const material = product.getAttribute("data-material");

    const matchesType = (typeValue === "all" || typeValue === type);
    const matchesMaterial = (materialValue === "all" || materialValue === material);

    product.style.display = (matchesType && matchesMaterial) ? "block" : "none";
  });
}

// Eventos de filtro
filterType.addEventListener("change", filterProducts);
filterMaterial.addEventListener("change", filterProducts);


/* =========================================
   BACKEND FUTURO (JSON)
   Preparado p/ substituir o conteúdo estático
========================================= */

// DESATIVEI o fetch para evitar erro enquanto o backend não está pronto
// Quando você tiver products.json, basta DESCOMENTAR ↓↓↓

/*
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    renderDynamicProducts(data);
    filterProducts(); 
  })
  .catch(err => console.error("Erro ao carregar produtos:", err));
*/


// RENDERIZAÇÃO DINÂMICA (API/JSON futuro)
function renderDynamicProducts(productsData) {
  productsGrid.innerHTML = ""; // limpa antes de preencher

  productsData.forEach(item => {
    const card = `
      <div class="product-card" 
           data-type="${item.tipo}" 
           data-material="${item.material}">
        
        <div class="product-img-placeholder">
          <span>Imagem</span>
        </div>

        <h3 class="product-name">${item.nome}</h3>
        <p class="product-material">${item.material}</p>
      </div>
    `;

    productsGrid.insertAdjacentHTML("beforeend", card);
  });
}
