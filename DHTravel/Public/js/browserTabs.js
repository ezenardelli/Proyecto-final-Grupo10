window.addEventListener('load', () => {

        const defaultTitle = 'Home';
        const dinamic = window.location.pathname;
        
        const titles = {
            'register': 'Register',
            'login': 'Login',
            'profile': 'Profile',
            'cart': 'Shopping Cart',
            'detail': 'Cart Detail',
            'products/listall': 'Products',
            'product/create': 'Product Create',
            'product/:id/detail': 'Product Detail',
            'product/:id/edit': 'Edit Product',
            'users/listall': 'Users List',
            'user/:id': 'User Detail',
            'user/:id/edit': 'Edit User',
            'profile/edit': 'Edit Profile',
            'you-shall-not-pass!': 'Not permission',
            'Terms': 'Terms',
            'Q&A': 'Q&A',
            'Contact': 'Contact',
            'About-us': 'About us',
            'HHRR': 'HHRR',
            'Payment-method': 'Payment method'
        };
        const dinamicRoute = dinamic.slice(1).split('.')[0];
        
        const actualTitle = titles[dinamicRoute] || defaultTitle;
        
        document.title = `DHTravel - ${actualTitle}`;
    
})