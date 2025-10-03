document.addEventListener('DOMContentLoaded', function() {
    // Select all dropdown toggles and their menus
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Function to close all dropdowns
    function closeAllDropdowns(except = null) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== except) {
                menu.classList.remove('show');
                menu.closest('.has-dropdown')?.classList.remove('show');
            }
        });
    }

    // Handle dropdown toggle clicks on mobile
    function handleDropdownToggle(e) {
        if (window.innerWidth > 991) return; // Only for mobile
        
        const toggle = e.currentTarget;
        const dropdown = toggle.closest('.has-dropdown');
        const menu = dropdown?.querySelector('.dropdown-menu');
        
        if (!menu) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = menu.classList.contains('show');
        
        // Close all other dropdowns first
        closeAllDropdowns(menu);
        
        // Toggle current dropdown
        if (isOpen) {
            menu.classList.remove('show');
            dropdown.classList.remove('show');
        } else {
            menu.classList.add('show');
            dropdown.classList.add('show');
            
            // Scroll the dropdown into view if needed
            setTimeout(() => {
                const rect = menu.getBoundingClientRect();
                if (rect.bottom > window.innerHeight) {
                    menu.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 50);
        }
    }
    
    // Add click event to dropdown toggles
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', handleDropdownToggle);
        
        // Make sure dropdown toggle is clickable on mobile
        toggle.style.pointerEvents = 'auto';
    });
    
    // Handle clicks on dropdown menu items
    document.querySelectorAll('.dropdown-menu a').forEach(menuItem => {
        menuItem.addEventListener('click', function(e) {
            // Allow default behavior for links
            if (this.getAttribute('href') !== '#') {
                return;
            }
            e.stopPropagation();
        });
    });
    
    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            if (!e.target.closest('.navbar-collapse') && !e.target.closest('.has-dropdown')) {
                closeAllDropdowns();
            }
        }
    });
    
    // Close all dropdowns when mobile menu is closed
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                if (!navbarCollapse.classList.contains('show')) {
                    closeAllDropdowns();
                }
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991) {
            closeAllDropdowns();
        }
    });
    
    // Initialize dropdowns on page load for mobile
    if (window.innerWidth <= 991) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.has-dropdown');
            const menu = dropdown?.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.display = 'none'; // Hide initially
                dropdown.addEventListener('click', function(e) {
                    if (e.target === this) {
                        e.stopPropagation();
                    }
                });
            }
        });
    }
});
