window.addEventListener('load', () => {

        const defaultTitle = 'Home';
        const dinamic = window.location.pathname;
        
        const titles = {
            'register': 'Register',
            'login': 'Login',
            'profile': 'Profile',
            'carrito': 'Shopping Cart',
            'detalle': 'Cart Detail',
            'products/listall': 'Products',
            'product/create': 'Product Create',
            'product/:id': 'Product Detail',
            'product/:id/edit': 'Edit Product',
            'users/listall': 'Users List',
            'user/:id': 'User Detail',
            'user/:id/edit': 'Edit User',
            'profile/edit': 'Edit Profile',
            'admin-home': 'Admin Home'

        };
        const dinamicRoute = dinamic.slice(1).split('.')[0];
        
        const actualTitle = titles[dinamicRoute] || defaultTitle;
        
        document.title = `DHTravel - ${actualTitle}`;
    
})