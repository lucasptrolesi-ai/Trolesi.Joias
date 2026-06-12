/* =========================================
   MENU MOBILE
========================================= */

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
  navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => navMenu.classList.remove("open")));
}


/* =========================================
   VARIÁVEIS E SELETORES
========================================= */
const filterType = document.getElementById("filterType");
const filterMaterial = document.getElementById("filterMaterial");
const productsGrid = document.getElementById("productsGrid");
const TROLESI_WHATSAPP = "5535998603736";


/* =========================================
   FILTROS DE PRODUTOS
   funciona mesmo se os selects não existirem
========================================= */
function filterProducts() {
  const typeValue = filterType ? (filterType.value || "all").toLowerCase() : "all";
  const materialValue = filterMaterial ? (filterMaterial.value || "all").toLowerCase() : "all";

  const products = document.querySelectorAll(".product-card");
  products.forEach(product => {
    const type = (product.getAttribute("data-categoria") || product.getAttribute("data-type") || "").toLowerCase();
    const material = (product.getAttribute("data-material") || "").toLowerCase();
    const matchesType = (typeValue === "all" || typeValue === type);
    const matchesMaterial = (materialValue === "all" || materialValue === material);
    product.style.display = (matchesType && matchesMaterial) ? "block" : "none";
  });
}

if (filterType) filterType.addEventListener("change", filterProducts);
if (filterMaterial) filterMaterial.addEventListener("change", filterProducts);


/* =========================================
   WHATSAPP: abre nova aba com mensagem pré-preenchida
========================================= */
function openWhatsAppForProduct(nome, codigo, categoria) {
  const text = `Olá! Tenho interesse no catálogo atacadista da Trolesi Joias. Gostaria de saber mais sobre: ${nome} / ${categoria || ''} / ${codigo || ''}`;
  const url = `https://api.whatsapp.com/send?phone=${TROLESI_WHATSAPP}&text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}


/* =========================================
   RENDERIZAÇÃO DINÂMICA DE PRODUTOS (products.json)
========================================= */
function renderDynamicProducts(productsData) {
  if (!productsGrid) return;
  productsGrid.innerHTML = "";

  if (!Array.isArray(productsData) || productsData.length === 0) {
    productsGrid.innerHTML = '<div class="card">Nenhum produto disponível no momento.</div>';
    return;
  }

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

    const btn = card.querySelector("button[data-whatsapp]");
    if (btn) btn.addEventListener("click", (e) => { e.preventDefault(); openWhatsAppForProduct(item.nome, item.codigo || item.id, item.categoria); });

    productsGrid.appendChild(card);
  });

  filterProducts();
}


// Fetch de produtos — só tenta quando existe o container
if (productsGrid) {
  fetch("products.json")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(data => renderDynamicProducts(data))
    .catch(err => {
      console.error("Erro ao carregar products.json:", err);
      if (productsGrid) productsGrid.innerHTML = '<div class="card">Não foi possível carregar o catálogo no momento. Tente novamente mais tarde.</div>';
    });
}
