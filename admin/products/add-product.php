<?php
require_once '../inc/db.php';

if (!$pdo) {
    echo "Database Error. The system does not have a connection to the database.";
    return;
}
// Create table if it doesn't exist
$stmt = $pdo->query("CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE,
    description TEXT,
    quantity INT,
    colors JSON,
    widths JSON,
    image_url VARCHAR(255),
    deleted TINYINT(1) DEFAULT 0
)");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $quantity = $_POST['quantity'];
    $colors = json_encode(explode(',', $_POST['colors']));
    $widths = json_encode(explode(',', $_POST['widths']));
    $image_url = $_POST['image_url'];

    // Check if product name already exists
    $stmt = $pdo->prepare("SELECT * FROM products WHERE name = :name AND deleted = 0");
    $stmt->execute([':name' => $name]);
    if ($stmt->fetch()) {
        echo "Product name already exists!";
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO products (name, description, quantity, colors, widths, image_url) VALUES (:name, :description, :quantity, :colors, :widths, :image_url)");
    $stmt->execute([
        ':name' => $name,
        ':description' => $description,
        ':quantity' => $quantity,
        ':colors' => $colors,
        ':widths' => $widths,
        ':image_url' => $image_url,
    ]);

    header('Location: ../index.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Product</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <style>
        body {
            padding: 20px;
        }
        .form-group {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>Add Product</h2>
                <form action="" method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea id="description" name="description" class="form-control" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="colors">Colors:</label>
                        <input type="text" id="colors" name="colors" class="form-control" placeholder="Comma separated values" required>
                    </div>
                    <div class="form-group">
                        <label for="widths">Widths:</label>
                        <input type="text" id="widths" name="widths" class="form-control" placeholder="Comma separated values" required>
                    </div>
                    <div class="form-group">
                        <label for="image_url">Image:</label>
                        <input type="file" id="image_url" name="image_url" class="form-control" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Product</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
