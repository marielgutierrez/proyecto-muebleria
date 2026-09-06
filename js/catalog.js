// Lógica interactiva del Catálogo de Productos (Hermanos Jota)

function formatPrice(price) {
    return price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    });
}

const CART_STORAGE_KEY = "hj_cart_count";
const LEGACY_CART_STORAGE_KEY = "hermanosJota.cartCount";

function getStoredCartCount() {
    try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved !== null) {
            return parseInt(saved, 10) || 0;
        }
        const legacy = localStorage.getItem(LEGACY_CART_STORAGE_KEY);
        if (legacy !== null) {
            return parseInt(legacy, 10) || 0;
        }
        return 0;
    } catch (error) {
        return 0;
    }
}

function updateCartUI(newCount) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, String(newCount));
    } catch (error) {
        /* storage bloqueado */
    }
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = newCount;
    }
}

function showToast(message) {
    const toast = document.getElementById("toastNotification");
    const toastMessage = document.getElementById("toastMessage");
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add("toast-notification--visible");

    if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
    }

    window.toastTimeout = setTimeout(() => {
        toast.classList.remove("toast-notification--visible");
    }, 3200);
}

function fetchCatalogProducts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(featuredProducts);
        }, 300);
    });
}

// Normalización para búsquedas sin importar tildes ni mayúsculas
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Estado del catálogo
const catalogState = {
    products: [],
    selectedCategory: "all",
    searchQuery: "",
    sortBy: "featured"
};

function createCatalogProductCard(product) {
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
                    <a href="producto.html?id=${product.id}" class="btn btn--small btn--secondary" title="Leer detalles de fabricación de ${product.name}">
                        Ver detalles
                    </a>
                    <button type="button" class="btn btn--small btn--primary" data-product-id="${product.id}" aria-label="Agregar ${product.name} al carrito">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

function filterAndSortProducts() {
    let filtered = [...catalogState.products];

    // 1. Filtrar por categoría
    if (catalogState.selectedCategory !== "all") {
        filtered = filtered.filter((p) => p.category.toLowerCase() === catalogState.selectedCategory.toLowerCase());
    }

    // 2. Filtrar por búsqueda
    if (catalogState.searchQuery.trim() !== "") {
        const query = normalizeText(catalogState.searchQuery.trim());
        filtered = filtered.filter((p) => {
            const nameNorm = normalizeText(p.name);
            const descNorm = normalizeText(p.description);
            const matNorm = normalizeText(p.material);
            const catNorm = normalizeText(p.category);
            return nameNorm.includes(query) || descNorm.includes(query) || matNorm.includes(query) || catNorm.includes(query);
        });
    }

    // 3. Ordenamiento
    switch (catalogState.sortBy) {
        case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
        case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "featured":
        default:
            filtered.sort((a, b) => a.id - b.id);
            break;
    }

    return filtered;
}

function renderCatalog() {
    const grid = document.getElementById("catalogProductsGrid");
    const resultsCountEl = document.getElementById("resultsCount");
    if (!grid) return;

    const filtered = filterAndSortProducts();
    grid.innerHTML = "";

    // Actualizar indicador de resultados
    const total = catalogState.products.length;
    const count = filtered.length;

    if (resultsCountEl) {
        if (count === total) {
            resultsCountEl.textContent = `Mostrando todas las piezas (${total})`;
        } else if (count === 1) {
            resultsCountEl.textContent = `Mostrando 1 pieza de ${total}`;
        } else {
            resultsCountEl.textContent = `Mostrando ${count} de ${total} piezas`;
        }
    }

    // Mostrar estado vacío si no hay coincidencias
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="catalog-empty">
                <span class="catalog-empty__icon">🔍</span>
                <h3 class="catalog-empty__title">No encontramos piezas que coincidan</h3>
                <p class="catalog-empty__text">
                    No hay resultados para tu criterio de búsqueda o categoría seleccionada.
                </p>
                <button type="button" class="btn btn--secondary" id="resetFiltersBtn">
                    Restablecer filtros
                </button>
            </div>
        `;

        const resetBtn = document.getElementById("resetFiltersBtn");
        if (resetBtn) {
            resetBtn.addEventListener("click", resetAllFilters);
        }
        return;
    }

    // Renderizar tarjetas
    filtered.forEach((product) => {
        grid.appendChild(createCatalogProductCard(product));
    });
}

function resetAllFilters() {
    catalogState.selectedCategory = "all";
    catalogState.searchQuery = "";
    catalogState.sortBy = "featured";

    const searchInput = document.getElementById("catalogSearchInput");
    const clearBtn = document.getElementById("clearSearchBtn");
    const sortSelect = document.getElementById("catalogSortSelect");

    if (searchInput) searchInput.value = "";
    if (clearBtn) clearBtn.hidden = true;
    if (sortSelect) sortSelect.value = "featured";

    // Actualizar pills de categoría
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach((pill) => {
        pill.classList.toggle("category-pill--active", pill.dataset.category === "all");
    });

    renderCatalog();
}

function setupCatalogInteractions() {
    // 1. Buscador en tiempo real
    const searchInput = document.getElementById("catalogSearchInput");
    const clearBtn = document.getElementById("clearSearchBtn");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            catalogState.searchQuery = e.target.value;
            if (clearBtn) {
                clearBtn.hidden = e.target.value.length === 0;
            }
            renderCatalog();
        });
    }

    if (clearBtn && searchInput) {
        clearBtn.addEventListener("click", () => {
            searchInput.value = "";
            catalogState.searchQuery = "";
            clearBtn.hidden = true;
            searchInput.focus();
            renderCatalog();
        });
    }

    // 2. Filtros por categoría
    const pillsContainer = document.getElementById("categoryPills");
    if (pillsContainer) {
        pillsContainer.addEventListener("click", (e) => {
            const pill = e.target.closest(".category-pill");
            if (!pill) return;

            const category = pill.dataset.category;
            catalogState.selectedCategory = category;

            document.querySelectorAll(".category-pill").forEach((p) => {
                p.classList.toggle("category-pill--active", p === pill);
            });

            renderCatalog();
        });
    }

    // 3. Ordenamiento
    const sortSelect = document.getElementById("catalogSortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            catalogState.sortBy = e.target.value;
            renderCatalog();
        });
    }

    // 4. Agregar al carrito desde el catálogo
    const grid = document.getElementById("catalogProductsGrid");
    if (grid) {
        grid.addEventListener("click", (e) => {
            const addBtn = e.target.closest("[data-product-id]");
            if (!addBtn) return;

            const productId = parseInt(addBtn.dataset.productId || addBtn.getAttribute("data-product-id"), 10);
            const product = catalogState.products.find((p) => p.id === productId);

            const currentCount = getStoredCartCount();
            const newCount = currentCount + 1;
            updateCartUI(newCount);

            const cartButton = document.getElementById("cartButton");
            if (cartButton) {
                cartButton.classList.add("cart-button--bounce");
                setTimeout(() => cartButton.classList.remove("cart-button--bounce"), 300);
            }

            const productName = product ? product.name : "Pieza";
            showToast(`¡Se agregó "${productName}" al carrito!`);
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

function setupCartButton() {
    const cartButton = document.getElementById("cartButton");
    if (cartButton) {
        cartButton.addEventListener("click", () => {
            cartButton.classList.add("cart-button--bounce");
            setTimeout(() => cartButton.classList.remove("cart-button--bounce"), 300);
        });
    }
}

async function initCatalog() {
    setupMobileNav();
    setupCartButton();

    // Inicializar contador de carrito
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = getStoredCartCount();
    }

    setupCatalogInteractions();

    try {
        const products = await fetchCatalogProducts();
        catalogState.products = products;
        renderCatalog();
    } catch (error) {
        const grid = document.getElementById("catalogProductsGrid");
        if (grid) {
            grid.innerHTML = `<p class="products-grid__loading">No se pudieron cargar las piezas. Por favor, intentá nuevamente.</p>`;
        }
    }
}

window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY || event.key === LEGACY_CART_STORAGE_KEY) {
        const cartCountEl = document.getElementById("cartCount");
        if (cartCountEl) {
            cartCountEl.textContent = getStoredCartCount();
        }
    }
});

document.addEventListener("DOMContentLoaded", initCatalog);
