<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Products</h1>
        <a href="add-product.php" class="btn btn-primary">Add New Product</a>
        <?php if (!empty($products)) : ?>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Colors</th>
                    <th>Widths</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($products as $product) : ?>
                <tr>
                    <td><img src="<?php echo $product['image_url']; ?>" alt="<?php echo $product['name']; ?>"></td>
                    <td><?php echo $product['name']; ?></td>
                    <td><?php echo $product['description']; ?></td>
                    <td><?php echo $product['quantity']; ?></td>
                    <td><?php echo $product['colors']; ?></td>
                    <td><?php echo $product['widths']; ?></td>
                    <td>
                        <a href="edit-product.php?id=<?php echo $product['id']; ?>" class="btn btn-sm btn-primary">Edit</a>
                        <a href="delete-product.php?id=<?php echo $product['id']; ?>" class="btn btn-sm btn-danger">Delete</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <ul class="pagination">
            <?php for ($i = 1; $i <= $totalPages; $i++) : ?>
            <li class="page-item <?php echo $i == $page ? 'active' : ''; ?>">
                <a href="?page=<?php echo $i; ?>" class="page-link"><?php echo $i; ?></a>
            </li>
            <?php endfor; ?>
        </ul>
        <?php else : ?>
        <?php echo $noProductsMessage; ?>
        <?php endif; ?>
    </div>
    <script>
        const productsDiv = document.getElementById('products');
        const paginationDiv = document.getElementById('pagination');
        
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 1;
        
        fetch(`products.php?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const productsHtml = data.products.map(product => `
                    <tr>
                        <td><img src="${product.image_url}" alt="${product.name}"></td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>${product.quantity}</td>
                        <td>${product.colors}</td>
                        <td>${product.widths}</td>
                        <td>
                            <a href="edit-product.php?id=${product.id}" class="btn btn-sm btn-primary">Edit</a>
                            <a href="delete-product.php?id=${product.id}" class="btn btn-sm btn-danger">Delete</a>
                        </td>
                    </tr>
                `).join('');
        
                const paginationHtml = data.pagination.map(page => `
                    <li class="page-item ${page.active ? 'active' : ''}">
                        <a href="?page=${page.number}" class="page-link">${page.number}</a>
                    </li>
                `).join('');
        
                productsDiv.innerHTML = `
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Colors</th>
                                <th>Widths</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productsHtml}
                        </tbody>
                    </table>
                `;
        
                paginationDiv.innerHTML = paginationHtml;
            })
            .catch(error => console.error(error));

    </script>
</body>
</html>
