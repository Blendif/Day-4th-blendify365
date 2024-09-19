<!-- Add pagination controls to the frontend -->
<div id="pagination-controls" class="mt-4">
    <button class="neumorphic-button" id="prev-page-btn">Previous</button>
    <span id="page-info"></span>
    <button class="neumorphic-button" id="next-page-btn">Next</button>
</div>

<script>
    let currentPage = 1;

    // Load products with pagination
    function loadProducts(page = 1) {
        fetch(`/products?page=${page}&limit=10`)
            .then(response => response.json())
            .then(data => {
                const productList = document.getElementById('product-list');
                productList.innerHTML = ''; // Clear previous content

                data.products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <p class="text-lg">${product.title}</p>
                        <p class="text-md">$${product.price}</p>
                    `;
                    productList.appendChild(productCard);
                });

                document.getElementById('page-info').innerText = `Page ${data.currentPage} of ${data.totalPages}`;
                currentPage = data.currentPage;

                document.getElementById('prev-page-btn').disabled = currentPage === 1;
                document.getElementById('next-page-btn').disabled = currentPage === data.totalPages;
            });
    }

    document.getElementById('prev-page-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            loadProducts(currentPage - 1);
        }
    });

    document.getElementById('next-page-btn').addEventListener('click', () => {
        loadProducts(currentPage + 1);
    });

    // Initial load
    loadProducts();
</script>
