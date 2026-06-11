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

// Número de contato (formato internacional, sem +)
const TROLESI_WHATSAPP = "5535998603736";

// Função principal de filtragem — tolerante à ausência de selects
function filterProducts() {
  const typeValue = filterType ? filterType.value : "all";
  const materialValue = filterMaterial ? filterMaterial.value : "all";

  const products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    const type = (product.getAttribute("data-categoria") || "").toLowerCase();
    const material = (product.getAttribute("data-material") || "").toLowerCase();

    const matchesType = (typeValue === "all" || typeValue.toLowerCase() === type);
    const matchesMaterial = (materialValue === "all" || materialValue.toLowerCase() === material);

    product.style.display = (matchesType && matchesMaterial) ? "block" : "none";
  });
}

if (filterType) filterType.addEventListener("change", filterProducts);
if (filterMaterial) filterMaterial.addEventListener("change", filterProducts);


/* =========================================
   CARREGAMENTO DINÂMICO DE PRODUTOS (products.json)
   Só roda quando existe o container #productsGrid
========================================= */

function openWhatsAppForProduct(nome, codigo, categoria) {
  const text = `Olá! Tenho interesse no catálogo atacadista da Trolesi Joias. Gostaria de saber mais sobre: ${nome} / ${categoria || ''} / ${codigo || ''}`;
  const url = `https://api.whatsapp.com/send?phone=${TROLESI_WHATSAPP}&text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

function renderDynamicProducts(productsData) {
  if (!productsGrid) return;
  productsGrid.innerHTML = ""; // limpa antes de preencher

  productsData.forEach(item => {
    const imgSrc = (item.imagens && item.imagens.length) ? item.imagens[0] : "img/product-placeholder.jpg";

    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-categoria", (item.categoria || "").toLowerCase());
    card.setAttribute("data-material", (item.material || "").toLowerCase());

    card.innerHTML = `
      <a class="product-link" href="product.html?id=${encodeURIComponent(item.id)}" aria-label="Ver ${item.nome}">
        <div class="product-img-placeholder">
          <img src="${imgSrc}" alt="${item.nome}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" loading="lazy" />
        </div>
      </a>

      <h3 class="product-name">${item.nome}</h3>
      <p class="product-material">${item.material} • ${item.categoria}</p>
      <p class="product-code">Código: <strong>${item.codigo || item.id}</strong></p>
      <div style="margin-top:10px;">
        <button class="btn btn-outline" data-whatsapp="${item.codigo || item.id}">Consultar no WhatsApp</button>
      </div>
    `;

    // botão WhatsApp
    const btn = card.querySelector("button[data-whatsapp]");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openWhatsAppForProduct(item.nome, item.codigo || item.id, item.categoria);
      });
    }

    productsGrid.appendChild(card);
  });

  // aplicar filtros iniciais se existirem
  filterProducts();
}

// Fetch dos produtos apenas quando houver grid
if (productsGrid) {
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data)) {
        renderDynamicProducts(data);
      } else {
        console.error("products.json deveria ser um array de produtos.", data);
      }
    })
    .catch(err => console.error("Erro ao carregar produtos:", err));
}


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
