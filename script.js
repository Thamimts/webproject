
        // Product Data
        const products = [
            {
                id: "p1",
                name: "Minimal Desk Lamp",
                description: "A sleek and modern desk lamp with adjustable brightness and color temperature.",
                price: 89,
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Lighting",
            },
            {
                id: "p2",
                name: "Ceramic Coffee Set",
                description: "Handcrafted ceramic coffee set including 4 cups and a matching pour-over dripper.",
                price: 65,
                image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Kitchenware",
            },
            {
                id: "p3",
                name: "Linen Throw Pillow",
                description: "Soft linen throw pillow with minimalist pattern design.",
                price: 45,
                image: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Home Decor",
            },
            {
                id: "p4",
                name: "Wooden Wall Clock",
                description: "Modern wooden wall clock with silent movement.",
                price: 79,
                image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Home Decor",
            },
            {
                id: "p5",
                name: "Concrete Planter",
                description: "Minimalist concrete planter perfect for succulents.",
                price: 34,
                image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Plants",
            },
            {
                id: "p6",
                name: "Glass Vase Set",
                description: "Set of 3 minimalist glass vases in varying sizes.",
                price: 55,
                image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Home Decor",
            },
            {
                id: "p7",
                name: "Bamboo Organizer",
                description: "Desk organizer made from sustainable bamboo.",
                price: 42,
                image: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Office",
            },
            {
                id: "p9",
                name: "Marble Coasters",
                description: "Set of 4 marble coasters with cork backing.",
                price: 38,
                image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Kitchenware",
            },
            {
                id: "p10",
                name: "Brass Bookends",
                description: "Modern geometric brass bookends, set of 2.",
                price: 68,
                image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Office",
            },
            {
                id: "p11",
                name: "Ceramic Plant Pot",
                description: "Handmade ceramic plant pot with drainage hole.",
                price: 48,
                image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Plants",
            },
            {
                id: "p12",
                name: "Wall Mirror",
                description: "Round wall mirror with minimal metal frame.",
                price: 120,
                image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                category: "Home Decor",
            },
        ];

        const categories = ["All", "Lighting", "Kitchenware", "Home Decor", "Plants", "Office"];

        // State
        let cart = [];
        let selectedProduct = null;
        let isSearchOpen = false;
        let selectedCategory = "All";
        let searchQuery = "";

        // DOM Elements
        const productGrid = document.getElementById("productGrid");
        const topBar = document.getElementById("topBar");
        const categoriesContainer = document.getElementById("categoriesContainer");
        const searchBtn = document.getElementById("searchBtn");
        const searchInput = document.getElementById("searchInput");
        const cartBtn = document.getElementById("cartBtn");
        const cartBadge = document.getElementById("cartBadge");
        const modalOverlay = document.getElementById("modalOverlay");
        const productModal = document.getElementById("productModal");
        const cartOverlay = document.getElementById("cartOverlay");
        const cartDrawer = document.getElementById("cartDrawer");

        // Initialize
        function init() {
            renderCategories();
            renderProductGrid();
            attachEventListeners();
        }

        // Render categories
        function renderCategories() {
            categoriesContainer.innerHTML = categories
                .map(
                    (cat) =>
                        `<button class="category-btn ${cat === "All" ? "active" : ""}" data-category="${cat}">${cat}</button>`
                )
                .join("");

            categoriesContainer.addEventListener("click", (e) => {
                if (e.target.classList.contains("category-btn")) {
                    document.querySelectorAll(".category-btn").forEach((btn) => btn.classList.remove("active"));
                    e.target.classList.add("active");
                    selectedCategory = e.target.dataset.category;
                    renderProductGrid();
                }
            });
        }

        // Filter products
        function getFilteredProducts() {
            let filtered = products;

            if (selectedCategory !== "All") {
                filtered = filtered.filter((p) => p.category === selectedCategory);
            }

            if (searchQuery) {
                filtered = filtered.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            return filtered;
        }

        // Render product grid
        function renderProductGrid() {
            const filtered = getFilteredProducts();

            productGrid.innerHTML = filtered
                .map(
                    (product) =>
                        `<div class="product-card" data-id="${product.id}">
                    <div class="product-image-container">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-details">
                            <p class="product-price">$${product.price}</p>
                            <p class="product-category">${product.category}</p>
                        </div>
                    </div>
                </div>`
                )
                .join("");

            productGrid.addEventListener("click", (e) => {
                const card = e.target.closest(".product-card");
                if (card) {
                    const productId = card.dataset.id;
                    selectedProduct = products.find((p) => p.id === productId);
                    showProductModal();
                }
            });
        }

        // Show product modal
        function showProductModal() {
            if (!selectedProduct) return;

            productModal.innerHTML = `
                <div class="product-modal-content">
                    <div class="product-modal-image">
                        <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
                        <button class="modal-close-btn" onclick="closeProductModal()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="product-modal-details">
                        <div class="modal-header">
                            <div class="modal-title-section">
                                <h2>${selectedProduct.name}</h2>
                                <p class="modal-category">${selectedProduct.category}</p>
                            </div>
                            <p class="modal-price">$${selectedProduct.price}</p>
                        </div>
                        <p class="modal-description">${selectedProduct.description}</p>
                        <div class="modal-details-list">
                            <p class="modal-detail-item">SKU: ${selectedProduct.id}</p>
                            <p class="modal-detail-item">Stock: Available</p>
                        </div>
                        <div class="modal-actions">
                            <button class="add-to-cart-btn" onclick="addToCartFromModal()">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;

            modalOverlay.classList.remove("hidden");
            productModal.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        }

        // Close product modal
        function closeProductModal() {
            modalOverlay.classList.add("hidden");
            productModal.classList.add("hidden");
            selectedProduct = null;
            document.body.style.overflow = "auto";
        }

        // Add to cart from modal
        function addToCartFromModal() {
            if (selectedProduct) {
                addToCart(selectedProduct);
                closeProductModal();
                openCartDrawer();
            }
        }

        // Add to cart
        function addToCart(product, quantity = 1) {
            const existing = cart.find((item) => item.id === product.id);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push({ ...product, quantity });
            }
            updateCartUI();
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter((item) => item.id !== productId);
            updateCartUI();
            if (cart.length === 0) {
                closeCartDrawer();
            } else {
                renderCartDrawer();
            }
        }

        // Update cart UI
        function updateCartUI() {
            if (cart.length > 0) {
                cartBadge.textContent = cart.length;
                cartBadge.classList.remove("hidden");
            } else {
                cartBadge.classList.add("hidden");
            }
        }

        // Render cart drawer
        function renderCartDrawer() {
            if (cart.length === 0) {
                cartDrawer.innerHTML = `
                    <div class="cart-header">
                        <h2>Shopping Cart</h2>
                        <button class="btn-icon" onclick="closeCartDrawer()">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="cart-items">
                        <div class="cart-empty">Your cart is empty</div>
                    </div>
                `;
                return;
            }

            const cartItemsHTML = cart
                .map(
                    (item) =>
                        `<div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-content">
                        <div class="cart-item-header">
                            <h3 class="cart-item-name">${item.name}</h3>
                            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <p class="cart-item-qty">Qty: ${item.quantity}</p>
                        <p class="cart-item-price">$${item.price * item.quantity}</p>
                    </div>
                </div>`
                )
                .join("");

            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

            cartDrawer.innerHTML = `
                <div class="cart-header">
                    <h2>Shopping Cart</h2>
                    <button class="btn-icon" onclick="closeCartDrawer()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="cart-items">
                    ${cartItemsHTML}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span class="cart-total-label">Total</span>
                        <span class="cart-total-amount">$${total}</span>
                    </div>
                    <button class="checkout-btn">Checkout</button>
                </div>
            `;
        }

        // Open cart drawer
        function openCartDrawer() {
            renderCartDrawer();
            cartOverlay.classList.remove("hidden");
            cartDrawer.classList.remove("hidden");
            document.body.style.overflow = "hidden";

            cartOverlay.addEventListener("click", closeCartDrawer);
        }

        // Close cart drawer
        function closeCartDrawer() {
            cartOverlay.classList.add("hidden");
            cartDrawer.classList.add("hidden");
            document.body.style.overflow = "auto";
        }

        // Attach event listeners
        function attachEventListeners() {
            // Search
            searchBtn.addEventListener("click", () => {
                isSearchOpen = !isSearchOpen;
                if (isSearchOpen) {
                    searchInput.classList.add("open");
                    searchInput.focus();
                } else {
                    searchInput.classList.remove("open");
                    searchInput.value = "";
                    searchQuery = "";
                    renderProductGrid();
                }
            });

            searchInput.addEventListener("input", (e) => {
                searchQuery = e.target.value;
                renderProductGrid();
            });

            searchInput.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    isSearchOpen = false;
                    searchInput.classList.remove("open");
                    searchInput.value = "";
                    searchQuery = "";
                    renderProductGrid();
                }
            });

            // Cart
            cartBtn.addEventListener("click", openCartDrawer);

            // Modal overlay
            modalOverlay.addEventListener("click", closeProductModal);

            // Scroll effect
            window.addEventListener("scroll", () => {
                if (window.scrollY > 10) {
                    topBar.classList.add("scrolled");
                } else {
                    topBar.classList.remove("scrolled");
                }
            });
        }

        // Start
        init();
