const pages = document.querySelectorAll('.page');

function navigate(pageId) {
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    document.getElementById(pageId).classList.add('active-page');

    if (pageId === 'cart') renderCart();
    if (pageId === 'orders') renderOrders();
    if (pageId === 'payment') {
        renderPaymentSummary();
        document.querySelectorAll('.payment-method').forEach(method => {
            method.addEventListener('click', function() {
                document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }
}

const products = [{
        id: 1,
        title: 'Premium Watch',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200',
        description: 'Luxury premium watch for modern lifestyle.'
    },
    {
        id: 2,
        title: 'Running Shoes',
        price: 4599,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200',
        description: 'Comfortable and stylish running shoes.'
    },
    {
        id: 3,
        title: 'Wireless Headphones',
        price: 7999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200',
        description: 'Premium sound quality and noise cancellation.'
    },
    {
        id: 4,
        title: 'Modern Backpack',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200',
        description: 'Perfect backpack for daily use.'
    },
    {
        id: 5,
        title: 'Smartphone',
        price: 25999,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200',
        description: 'Latest generation smartphone.'
    },
    {
        id: 6,
        title: 'Gaming Laptop',
        price: 75999,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200',
        description: 'High performance gaming laptop.'
    }
];

const productsGrid = document.getElementById('productsGrid');

function renderProducts(items = products) {

    productsGrid.innerHTML = '';

    items.forEach(product => {

        productsGrid.innerHTML += `
      <div class="product-card">
        <img src="${product.image}">

        <div class="product-info">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="price">₹${product.price}</div>
          <button onclick="addToCart(${product.id})">Add To Cart</button>
        </div>
      </div>
    `;

    });
}

renderProducts();

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        alert('Please login first');
        navigate('login');
        return;
    }

    const product = products.find(item => item.id === id);

    cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));

    updateNavbar();

    alert('Added to cart');
}

function renderCart() {

    const container = document.getElementById('cartContainer');
    const totalEl = document.getElementById('cartTotal');

    container.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<h2>Your cart is empty</h2>';
        totalEl.innerText = 0;
        return;
    }

    cart.forEach((item, index) => {

        total += item.price;

        container.innerHTML += `
      <div class="cart-item">
        <div>
          <h3>${item.title}</h3>
          <p>₹${item.price}</p>
        </div>

        <button onclick="removeCart(${index})">Remove</button>
      </div>
    `;

    });

    totalEl.innerText = total;
}

function removeCart(index) {

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart();

    updateNavbar();
}

function register() {

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!name || !email || !password) {
        alert('Fill all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const exists = users.find(user => user.email === email);

    if (exists) {
        alert('Account already exists');
        return;
    }

    users.push({ name, email, password });

    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful');

    navigate('login');
}

function login() {

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(
        item => item.email === email && item.password === password
    );

    if (!user) {
        alert('Invalid credentials');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    alert(`Welcome ${user.name}`);

    updateNavbar();

    navigate('home');
}

function logout() {

    localStorage.removeItem('loggedInUser');

    updateNavbar();

    navigate('home');
}

function updateNavbar() {

    const navRight = document.getElementById('navRight');

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {

        navRight.innerHTML = `
      <span>Hello, ${user.name}</span>

      <button onclick="navigate('cart')">
        Cart (${cart.length})
      </button>

      <button class="primary-btn" onclick="logout()">
        Logout
      </button>
    `;

    } else {

        navRight.innerHTML = `
      <button onclick="navigate('login')">Login</button>
      <button class="primary-btn" onclick="navigate('register')">
        Register
      </button>
    `;

    }
}

updateNavbar();

function checkout() {

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        alert('Please login first');
        navigate('login');
        return;
    }

    if (cart.length === 0) {
        alert('Cart is empty');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push({
        id: Date.now(),
        email: user.email,
        items: cart,
        status: 'Processing',
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem('orders', JSON.stringify(orders));

    cart = [];

    localStorage.setItem('cart', JSON.stringify(cart));

    updateNavbar();

    renderCart();

    alert('Order placed successfully');

    navigate('orders');
}

function renderOrders() {

    const container = document.getElementById('ordersContainer');

    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        container.innerHTML = '<h2>Please login first</h2>';
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const myOrders = orders.filter(order => order.email === user.email);

    container.innerHTML = '';

    if (myOrders.length === 0) {
        container.innerHTML = '<h2>No Orders Found</h2>';
        return;
    }

    myOrders.forEach(order => {
        const statusClass = order.status === 'Confirmed' ? 'status-confirmed' : 'status-processing';
        container.innerHTML += `
      <div class="order-card">
        <h3>Order #${order.id}</h3>
        <p>
            <span>Date: ${order.date}</span>
            <span class="order-status ${statusClass}">${order.status}</span>
        </p>
        <p>Payment: ${order.paymentMethod || 'N/A'}</p>
        <p>Items: ${order.items.length}</p>
        <p><strong>Total: ₹${order.total || 0}</strong></p>
      </div>
    `;

    });
}

function searchProducts() {

    const value = document
        .getElementById('searchInput')
        .value
        .toLowerCase();

    const filtered = products.filter(product =>
        product.title.toLowerCase().includes(value)
    );

    renderProducts(filtered);
}

// ===== PAYMENT FUNCTIONS =====

function validatePayment() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
        alert('Please login first');
        navigate('login');
        return false;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return false;
    }

    return true;
}

function processPayment(paymentMethod) {
    if (!validatePayment()) {
        return;
    }

    // Simulate payment processing
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    alert(`Processing ${paymentMethod} payment of ₹${total}...`);

    // Create order
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push({
        id: Date.now(),
        email: user.email,
        items: cart,
        total: total,
        paymentMethod: paymentMethod,
        status: 'Confirmed',
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));

    updateNavbar();

    alert(`Payment successful! Order placed with ${paymentMethod}.`);

    navigate('orders');
}

function payWithCard() {
    processPayment('Credit/Debit Card');
}

function payWithUPI() {
    processPayment('UPI');
}

function payWithWallet() {
    processPayment('Digital Wallet');
}

function payOnDelivery() {
    processPayment('Cash on Delivery');
}

function placeOrder() {
    checkout();
}

function renderPaymentSummary() {
    const itemsContainer = document.getElementById('paymentCartItems');
    const subtotalEl = document.getElementById('paymentSubtotal');
    const totalEl = document.getElementById('paymentTotal');

    itemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        itemsContainer.innerHTML += `
            <div class="payment-item">
                <span class="payment-item-name">${item.title}</span>
                <span class="payment-item-price">₹${item.price}</span>
            </div>
        `;
    });

    subtotalEl.innerText = total;
    totalEl.innerText = total;
}

function completeCheckout() {
    const selected = document.querySelector('.payment-method.selected');
    if (!selected) {
        alert('Please select a payment method');
        return;
    }
    processPayment(selected.querySelector('.payment-info h4').innerText);
}
fetch('https://e-commerce-wd4p.onrender.com/api/projects')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));
