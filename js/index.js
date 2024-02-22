document.addEventListener('DOMContentLoaded', function() {
    const menuItems = [
        { id: 1, name: 'Hamburguesa', price: 6000 },
        { id: 2, name: 'Pizza', price: 12000 },
        { id: 3, name: 'Ensalada', price: 3500 },
        { id: 4, name: 'Milanesa', price: 4500 },
        { id: 5, name: 'Suprema', price: 4500 },
        { id: 6, name: 'Ñoquis', price: 3800 },
        { id: 7, name: 'Ravioles', price: 3800 },
    ];

    const orderForm = document.getElementById( 'sectionForm');

    orderForm.addEventListener('submit', function (event) { 
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const selectedItems = Array.from(document.getElementById('items').selectedOptions)  
        .map(option => parseInt(option.value)); 

    if (!name || !address || !phone || !email || selectedItems.length === 0) {
        alert('Falta completar sus datos y/o seleccionar artículos en el menú.');
        return;
    }

    const selectedMenuItems = menuItems.filter(item => selectedItems.includes(item.id));
        const orderDetails = {
            name,
            address,
            phone,
            email,
            items: selectedMenuItems,
            comments: document.getElementById('comments').value
        };
    
    const totalCost = selectedMenuItems.reduce((total, item) => total + item.price, 0);

    fetch('/api/realizar-pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar el pedido:', error);
    });  

    const confirmationMessage = `PEDIDO CONFIRMADO:\n\nNombre: ${orderDetails.name}\nDirección: ${orderDetails.address}\nTeléfono: ${orderDetails.phone}\nCorreo electrónico: ${orderDetails.email}\n\nCOSTO TOTAL: $${totalCost.toFixed(2)}`;
    alert(confirmationMessage);

    })
})