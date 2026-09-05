// Lógica para la página de detalle de producto (Hermanos Jota)

function formatPrice(price) {
    return price.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    });
}

function getStoredCartCount() {
    const saved = localStorage.getItem("hj_cart_count");
    return saved !== null ? parseInt(saved, 10) : 0;
}

function updateCartUI(newCount) {
    localStorage.setItem("hj_cart_count", newCount);
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

function fetchProductById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const product = featuredProducts.find((item) => item.id === id);
            if (product) {
                resolve(product);
            } else {
                reject(new Error("Producto no encontrado"));
            }
        }, 350);
    });
}

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    const parsedId = parseInt(idParam, 10);
    return isNaN(parsedId) ? 1 : parsedId;
}

function renderProductDetail(product) {
    const container = document.getElementById("productDetailContainer");
    const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
    const pageTitle = document.getElementById("pageTitle");
    const metaDescription = document.getElementById("metaDescription");

    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;
    if (pageTitle) pageTitle.textContent = `${product.name} | Hermanos Jota`;
    if (metaDescription) metaDescription.setAttribute("content", product.description);

    const highlightsHtml = product.highlights
        ? product.highlights.map(h => `<li><span class="highlight-check">✦</span> ${h}</li>`).join("")
        : "";

    const specsEntries = product.specs ? Object.entries(product.specs) : [];
    const specsHtml = specsEntries.map(([key, value]) => `
        <div class="spec-card">
            <dt class="spec-card__term">${key}</dt>
            <dd class="spec-card__detail">${value}</dd>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="product-detail__grid">
            <div class="product-detail__gallery">
                <div class="product-detail__image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-detail__image">
                    <span class="product-detail__badge">Pieza de Autor · Hecho a mano</span>
                </div>
            </div>

            <div class="product-detail__info">
                <p class="product-detail__category">${product.category}</p>
                <h1 id="productTitle" class="product-detail__title">${product.name}</h1>
                <p class="product-detail__material">${product.material}</p>
                
                <div class="product-detail__price-box">
                    <span class="product-detail__price">${formatPrice(product.price)}</span>
                    <span class="product-detail__price-note">IVA incluido · Factura A o B</span>
                </div>

                <div class="product-detail__description">
                    <p>${product.description}</p>
                </div>

                ${highlightsHtml ? `
                    <ul class="product-detail__highlights">
                        ${highlightsHtml}
                    </ul>
                ` : ""}

                <div class="product-detail__actions">
                    <div class="quantity-control" aria-label="Seleccionar cantidad">
                        <button type="button" class="quantity-control__btn" id="qtyMinus" aria-label="Disminuir cantidad">−</button>
                        <input type="number" class="quantity-control__input" id="qtyInput" value="1" min="1" max="10" aria-label="Cantidad de unidades">
                        <button type="button" class="quantity-control__btn" id="qtyPlus" aria-label="Aumentar cantidad">+</button>
                    </div>

                    <button type="button" class="btn btn--primary product-detail__buy-btn" id="addToCartBtn">
                        <span aria-hidden="true">🛒</span> Agregar al carrito
                    </button>
                </div>

                <div class="product-detail__trust-badges">
                    <div class="trust-badge">
                        <span class="trust-badge__icon">🛡️</span>
                        <div>
                            <strong>Programa Herencia Viva</strong>
                            <p>10 años de garantía estructural y servicio de mantenimiento.</p>
                        </div>
                    </div>
                    <div class="trust-badge">
                        <span class="trust-badge__icon">🌿</span>
                        <div>
                            <strong>Madera Certificada FSC®</strong>
                            <p>Especies nativas sustentables y acabados libres de tóxicos.</p>
                        </div>
                    </div>
                    <div class="trust-badge">
                        <span class="trust-badge__icon">🚛</span>
                        <div>
                            <strong>Envío cuidadoso</strong>
                            <p>Embalaje 100% libre de plásticos y entrega con personal propio.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="crafting-section" aria-labelledby="craftingTitle">
            <div class="crafting-section__header">
                <span class="crafting-section__eyebrow">Oficio y Maestría</span>
                <h2 id="craftingTitle" class="crafting-section__title">Detalles de Fabricación</h2>
                <p class="crafting-section__narrative">${product.manufacturing}</p>
            </div>

            <dl class="specs-grid">
                ${specsHtml}
            </dl>
        </section>
    `;

    setupQuantityControls(product);
}

function renderNotFound() {
    const container = document.getElementById("productDetailContainer");
    const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = "Producto no encontrado";

    container.innerHTML = `
        <div class="product-detail__not-found">
            <h2>Pieza no encontrada</h2>
            <p>La pieza que estás buscando no se encuentra disponible o el enlace no es válido.</p>
            <a href="index.html" class="btn btn--primary">Volver al inicio</a>
        </div>
    `;
}

function renderRelatedProducts(currentProductId) {
    const relatedGrid = document.getElementById("relatedGrid");
    if (!relatedGrid) return;

    const related = featuredProducts.filter((p) => p.id !== currentProductId).slice(0, 3);
    relatedGrid.innerHTML = "";

    related.forEach((product) => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <a href="producto.html?id=${product.id}" class="product-card__image-wrap">
                <img class="product-card__image" src="${product.image}" alt="${product.name}" loading="lazy">
            </a>
            <div class="product-card__body">
                <p class="product-card__category">${product.category}</p>
                <h3 class="product-card__name">
                    <a href="producto.html?id=${product.id}">${product.name}</a>
                </h3>
                <p class="product-card__material">${product.material}</p>
                <div class="product-card__footer">
                    <span class="product-card__price">${formatPrice(product.price)}</span>
                    <a href="producto.html?id=${product.id}" class="btn btn--small btn--secondary">
                        Ver detalle
                    </a>
                </div>
            </div>
        `;

        relatedGrid.appendChild(card);
    });
}

function setupQuantityControls(product) {
    const minusBtn = document.getElementById("qtyMinus");
    const plusBtn = document.getElementById("qtyPlus");
    const qtyInput = document.getElementById("qtyInput");
    const addToCartBtn = document.getElementById("addToCartBtn");
    const cartButton = document.getElementById("cartButton");

    if (!minusBtn || !plusBtn || !qtyInput || !addToCartBtn) return;

    minusBtn.addEventListener("click", () => {
        let current = parseInt(qtyInput.value, 10) || 1;
        if (current > 1) {
            qtyInput.value = current - 1;
        }
    });

    plusBtn.addEventListener("click", () => {
        let current = parseInt(qtyInput.value, 10) || 1;
        if (current < 10) {
            qtyInput.value = current + 1;
        }
    });

    qtyInput.addEventListener("change", () => {
        let val = parseInt(qtyInput.value, 10);
        if (isNaN(val) || val < 1) qtyInput.value = 1;
        if (val > 10) qtyInput.value = 10;
    });

    addToCartBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        const currentCount = getStoredCartCount();
        const newCount = currentCount + qty;

        updateCartUI(newCount);

        if (cartButton) {
            cartButton.classList.add("cart-button--bounce");
            setTimeout(() => cartButton.classList.remove("cart-button--bounce"), 300);
        }

        const unitText = qty === 1 ? "unidad agregada" : "unidades agregadas";
        showToast(`¡${qty} ${unitText} de "${product.name}" al carrito!`);
    });
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

async function initProductDetailPage() {
    setupMobileNav();
    setupCartButton();

    // Inicializar contador desde localStorage
    const storedCount = getStoredCartCount();
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) {
        cartCountEl.textContent = storedCount;
    }

    const productId = getProductIdFromUrl();

    try {
        const product = await fetchProductById(productId);
        renderProductDetail(product);
        renderRelatedProducts(product.id);
    } catch (err) {
        renderNotFound();
    }
}

document.addEventListener("DOMContentLoaded", initProductDetailPage);
