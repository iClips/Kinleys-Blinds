<?php
require_once './inc/db.php';

$products = [];
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$limit = 5;

// Get total number of products
$stmt = $pdo->query("SELECT COUNT(*) FROM products");
$totalProducts = $stmt->fetchColumn();

// Calculate total number of pages
$totalPages = ceil($totalProducts / $limit);

// Calculate offset
$offset = ($page - 1) * $limit;

// Get products for current page
$stmt = $pdo->prepare("SELECT * FROM products ORDER BY id LIMIT :limit OFFSET :offset");
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

// Check if query was successful
if ($stmt->rowCount() > 0) {
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    // Handle case where no products are found
    $noProductsMessage = '
        <div class="alert alert-info">
            <h4>No products found!</h4>
            <p>To add a new product, click the "Add New Product" button above.</p>
        </div>
    ';
}

?>
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
    <script src="script.js"></script>
</body>
</html>
