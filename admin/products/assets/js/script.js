document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Prevent default form submission behavior
            event.preventDefault();
    
            // Get form data
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const quantity = document.getElementById('quantity').value;
            const colors = document.getElementById('colors').value;
            const widths = document.getElementById('widths').value;
            const image_url = document.getElementById('image_url').value;
    
            // Validate form data
            if (name === '' || description === '' || quantity === '' || colors === '' || widths === '' || image_url === '') {
                alert('Please fill in all fields!');
                return;
            }
    
            // Submit form data to server
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('quantity', quantity);
            formData.append('colors', colors);
            formData.append('widths', widths);
            formData.append('image_url', image_url);
    
            fetch('', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        });
    }        
});
