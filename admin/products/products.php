?php
require_once './inc/db.php';

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
header('Content-Type: application/json');

if ($stmt->rowCount() > 0) {
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $pagination = [];
    for ($i = 1; $i <= $totalPages; $i++) {
        $pagination[] = [
            'number' => $i,
            'active' => $i == $page
        ];
    }
    
    echo json_encode([
        'products' => $products,
        'pagination' => $pagination,
        'error' => null
    ]);

    
} else {
    // Handle case where no products are found
    $noProductsMessage = '
        <div class="alert alert-info">
            <h4>No products found!</h4>
            <p>To add a new product, click the "Add New Product" button above.</p>
        </div>
    ';
        echo json_encode([
        'products' => null,
        'pagination' => null,
        'error' => $noProductsMessage
    ]);
}
?>
