const CART_STORAGE_KEY = "hermanosJota.cartCount";

function fetchFeaturedProducts() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(featuredProducts), 800);
    });
}

function formatPrice(price) {
    return price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    });
}

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
        <div class="product-card__image-wrap">
            <img class="product-card__image" src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-card__body">
            <p class="product-card__category">${product.category}</p>
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__material">${product.material}</p>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__footer">
                <span class="product-card__price">${formatPrice(product.price)}</span>
                <button type="button" class="btn btn--small btn--primary" data-product-id="${product.id}">
                    Agregar
                </button>
            </div>
        </div>
    `;

    return card;
}

async function renderFeaturedProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const loadingMessage = document.getElementById("productsLoading");

    try {
        const products = await fetchFeaturedProducts();

        if (loadingMessage) {
            loadingMessage.remove();
        }

        products.forEach((product) => {
            grid.appendChild(createProductCard(product));
        });

        grid.addEventListener("click", handleAddToCartClick);
    } catch (error) {
        if (loadingMessage) {
            loadingMessage.textContent = "No se pudieron cargar los productos. Intentá nuevamente más tarde.";
        }
    }
}

function handleAddToCartClick(event) {
    const button = event.target.closest("[data-product-id]");
    if (!button) return;

    incrementCartCount();
}

/* ---------- Carrito simulado (compartido entre páginas) ---------- */
function readStoredCartCount() {
    try {
        return Number(localStorage.getItem(CART_STORAGE_KEY)) || 0;
    } catch (error) {
        return 0;
    }
}

function writeStoredCartCount(count) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, String(count));
    } catch (error) {
        /* Navegación privada o storage bloqueado: el contador vive solo en la página. */
    }
}

function paintCartCount(count) {
    const cartCountEl = document.getElementById("cartCount");
    if (!cartCountEl) return;

    cartCountEl.textContent = count;
}

function renderCartCount() {
    paintCartCount(readStoredCartCount());
}

function incrementCartCount() {
    const newCount = readStoredCartCount() + 1;
    writeStoredCartCount(newCount);
    paintCartCount(newCount);
}

function setupCartButton() {
    const cartButton = document.getElementById("cartButton");
    if (!cartButton) return;

    cartButton.addEventListener("click", () => {
        cartButton.classList.add("cart-button--bounce");
        setTimeout(() => cartButton.classList.remove("cart-button--bounce"), 300);
    });
}

function setupMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");
    if (!navToggle || !mainNav) return;

    navToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("main-nav--open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCartCount();
    renderFeaturedProducts();
    setupCartButton();
    setupMobileNav();
});
