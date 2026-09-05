
function getStoredCartCount() {
    const saved = localStorage.getItem("hj_cart_count");
    return saved !== null ? parseInt(saved, 10) : 0;
}

function initCartCount() {
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = getStoredCartCount();
    }
}

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
        <a href="producto.html?id=${product.id}" class="product-card__image-wrap" aria-label="Ver detalles de ${product.name}">
            <img class="product-card__image" src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        <div class="product-card__body">
            <p class="product-card__category">${product.category}</p>
            <h3 class="product-card__name">
                <a href="producto.html?id=${product.id}">${product.name}</a>
            </h3>
            <p class="product-card__material">${product.material}</p>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__footer">
                <span class="product-card__price">${formatPrice(product.price)}</span>
                <div class="product-card__actions">
                    <a href="producto.html?id=${product.id}" class="btn btn--small btn--secondary">
                        Detalle
                    </a>
                    <button type="button" class="btn btn--small btn--primary" data-product-id="${product.id}">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

async function renderFeaturedProducts() {
    const grid = document.getElementById("productsGrid");
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

function incrementCartCount() {
    const current = getStoredCartCount();
    const newCount = current + 1;
    localStorage.setItem("hj_cart_count", newCount);

    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = newCount;
    }

    const cartButton = document.getElementById("cartButton");
    if (cartButton) {
        cartButton.classList.add("cart-button--bounce");
        setTimeout(() => cartButton.classList.remove("cart-button--bounce"), 300);
    }
}

function setupCartButton() {
    const cartButton = document.getElementById("cartButton");
    if (cartButton) {
        cartButton.addEventListener("click", () => {
            cartButton.classList.add("cart-button--bounce");
            setTimeout(() => cartButton.classList.remove("cart-button--bounce"), 300);
        });
    }
}

function setupMobileNav() {
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("main-nav--open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initCartCount();
    renderFeaturedProducts();
    setupCartButton();
    setupMobileNav();
});
