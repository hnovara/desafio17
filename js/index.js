document.addEventListener('DOMContentLoaded', function() {
    const menuItems = [
        { id: 1, name: 'Hamburguesa', price: 6000 },
        { id: 2, name: 'Pizza', price: 12000 },
        { id: 3, name: 'Ensalada', price: 3500 },
        { id: 4, name: 'Milanesa', price: 4500 },
        { id: 5, name: 'Suprema', price: 4500 },
        { id: 6, name: 'Ñoquis', price: 3800 },
        { id: 7, name: 'Ravioles', price: 3800 },
        { id: 8, name: 'Rabas', price: 13500 },
    ];

    const orderForm = document.getElementById('sectionForm');

    orderForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const selectedItems = Array.from(document.getElementById('items').selectedOptions)
            .map(option => ({
                id: parseInt(option.value),
                quantity: parseInt(document.getElementById('quantities').value) || 1
            }));

        if (!name || !address || !phone || !email || selectedItems.length === 0) {
            alert('Debe completar todos los campos y seleccione elementos del menú.');
            return;
        }

        const selectedMenuItems = selectedItems.map(({ id, quantity }) => ({
            ...menuItems.find(item => item.id === id),
            quantity
        }));
        const orderDetails = {
            name,
            address,
            phone,
            email,
            items: selectedMenuItems,
            comments: document.getElementById('comments').value
        };

        const totalCost = selectedMenuItems.reduce((total, item) => total + item.price * item.quantity, 0);

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

        const confirmationMessage = `PEDIDO REALIZADO:\n\nNombre: ${orderDetails.name}\nDirección: ${orderDetails.address}\nTeléfono: ${orderDetails.phone}\nCorreo electrónico: ${orderDetails.email}\nComentarios: ${orderDetails.comments}\n\nElementos Seleccionados:\n${selectedMenuItems.map(item => `${item.name} (Cantidad: ${item.quantity})`).join('\n')}\n\nCOSTO TOTAL: $${totalCost.toFixed(2)}`;
        alert(confirmationMessage);
    });
});