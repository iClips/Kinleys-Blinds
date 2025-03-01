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
