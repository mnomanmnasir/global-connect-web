// Global variables
let currentPath = '';
let currentPage = '';
let isHomePage = false;
let isAboutUsPage = false;
let isContactPage = false;
const aboutUsSubpages = [
    'about-us.html',
    'about-ceo.html',
    'projects.html',
    'major-clients.html',
    'strategic-partners.html'
];

// Get all navigation links
const navLinks = document.querySelectorAll('.navbar .nav__item-link');

// Initialize the navigation
function initNavigation() {
    // Get current page info
    currentPath = window.location.pathname;
    currentPage = currentPath.split('/').pop() || 'index.html';
    isHomePage = currentPage === 'index.html' || currentPage === '';
    isAboutUsPage = aboutUsSubpages.includes(currentPage);
    isContactPage = currentPage === 'contact-us.html';

    // Initialize mobile menu
    setupMobileMenu();

    // Set up active states
    setupActiveStates();
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileBreakpoint = 991;
    const dropdownToggles = document.querySelectorAll('.navbar .has-dropdown > .dropdown-toggle');
    const mobileMenuToggler = document.querySelector('.mobile-nav-toggler');
    const mobileNavContainer = document.querySelector('.mobile-nav__container');

    function closeOtherDropdowns(exceptDropdown = null) {
        document.querySelectorAll('.has-dropdown').forEach(dropdown => {
            if (dropdown !== exceptDropdown) {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                const arrow = dropdown.querySelector('.dropdown-arrow');
                if (menu) menu.classList.remove('show');
                if (arrow) {
                    arrow.classList.remove('active');
                    arrow.classList.remove('rotate-180');
                }
            }
        });
    }

    // Handle dropdown toggle click
    function handleDropdownToggle(e) {
        const toggle = e.currentTarget;
        const dropdown = toggle.closest('.has-dropdown');
        if (!dropdown) return;

        const menu = dropdown.querySelector('.dropdown-menu');
        const arrow = toggle.querySelector('.dropdown-arrow');
        const isMobile = window.innerWidth <= mobileBreakpoint;

        // Only prevent default if it's a dropdown toggle with a menu
        if (menu) {
            e.preventDefault();
            e.stopPropagation();

            const isActive = dropdown.classList.contains('active');

            // On mobile, close other dropdowns when opening a new one
            if (!isActive || !isMobile) {
                closeOtherDropdowns(isActive ? null : dropdown);
            }

            // Toggle current dropdown
            if (!isActive) {
                // Close any open dropdown first on mobile
                if (isMobile) {
                    const currentlyOpen = document.querySelector('.has-dropdown.active');
                    if (currentlyOpen && currentlyOpen !== dropdown) {
                        const openMenu = currentlyOpen.querySelector('.dropdown-menu');
                        const openArrow = currentlyOpen.querySelector('.dropdown-arrow');
                        if (openMenu) openMenu.classList.remove('show');
                        if (openArrow) {
                            openArrow.style.transform = 'rotate(0deg)';
                            openArrow.textContent = '▼';
                            openArrow.style.backgroundColor = 'transparent';
                            openArrow.style.color = '#f5a623';
                        }
                        currentlyOpen.classList.remove('active');
                    }
                }

                // Open current dropdown
                dropdown.classList.add('active');
                menu.classList.add('show');
                if (arrow) {
                    arrow.classList.add('active');
                    // Enhanced arrow behavior for mobile
                    if (window.innerWidth <= mobileBreakpoint) {
                        arrow.textContent = '▲'; // Up arrow when open
                        arrow.style.transform = 'rotate(0deg)';
                        arrow.style.backgroundColor = '#f5a623';
                        arrow.style.color = '#fff';
                        arrow.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                        arrow.style.transition = 'all 0.3s ease-in-out';
                    } else {
                        arrow.style.transform = 'rotate(180deg)';
                        arrow.style.transition = 'all 0.3s ease-in-out';
                    }
                }
            } else {
                // Close current dropdown
                dropdown.classList.remove('active');
                menu.classList.remove('show');
                if (arrow) {
                    arrow.classList.remove('active');
                    // Reset arrow for mobile when closed
                    if (window.innerWidth <= mobileBreakpoint) {
                        arrow.textContent = '▼'; // Down arrow when closed
                        arrow.style.backgroundColor = 'transparent';
                        arrow.style.color = '#f5a623';
                        arrow.style.transform = 'rotate(0deg)';
                        arrow.style.boxShadow = 'none';
                        arrow.style.transition = 'all 0.3s ease-in-out';
                    } else {
                        arrow.style.transform = 'rotate(0deg)';
                        arrow.style.transition = 'all 0.3s ease-in-out';
                    }
                }
            }
        }

        // Prevent default link behavior on mobile
        if (isMobile) {
            e.preventDefault();
            return false;
        }
    }
    // If it's a regular link (no dropdown menu), let it navigate normally
}

// Initialize dropdown toggles
function initDropdownToggles() {
    // Remove existing event listeners to prevent duplicates
    dropdownToggles.forEach(toggle => {
        // Clone the node to remove all event listeners
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);

        // Add click event for both mobile and desktop
        newToggle.addEventListener('click', handleDropdownToggle);

        // Add hover for desktop
        if (window.innerWidth > mobileBreakpoint) {
            newToggle.addEventListener('mouseenter', handleDesktopHover);
        }

        // Make sure regular links in dropdowns work on mobile
        const parentLi = newToggle.closest('li');
        if (parentLi) {
            const links = parentLi.querySelectorAll('a:not(.dropdown-toggle)');
            links.forEach(link => {
                link.addEventListener('click', function (e) {
                    // Don't prevent default on regular links
                    e.stopPropagation();
                });
            });
        }
    });
}

// Initialize everything
function init() {
    // Initialize dropdown toggles
    initDropdownToggles();

    // Add mouseleave for desktop
    document.querySelectorAll('.has-dropdown').forEach(dropdown => {
        dropdown.removeEventListener('mouseleave', handleDesktopLeave);
        dropdown.addEventListener('mouseleave', handleDesktopLeave);
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initDropdownToggles();
        }, 250);
    });

    // Close dropdowns when clicking outside
    document.removeEventListener('click', handleDocumentClick);
    document.addEventListener('click', handleDocumentClick);
}

// Initialize the mobile menu
init();

// Set up active states for navigation
function setupActiveStates() {
    const navLinks = document.querySelectorAll('.navbar .nav__item-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPath === 'index.html' || currentPath === '';

    // First, remove active class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Function to set active link
    function setActiveLink(link) {
        // Remove active class from all links first
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to the clicked link
        link.classList.add('active');
        
        // If this is a dropdown item, also activate parent
        const parentDropdown = link.closest('.dropdown-menu');
        if (parentDropdown) {
            const parentNavItem = parentDropdown.closest('.has-dropdown');
            if (parentNavItem) {
                const parentLink = parentNavItem.querySelector('.dropdown-toggle');
                if (parentLink) {
                    parentLink.classList.add('active');
                }
            }
        }
        
        // Save to localStorage
        localStorage.setItem('activeNavLink', link.getAttribute('href'));
    }

    navLinks.forEach(link => {
        // Handle hover for dropdown items
        if (link.closest('.dropdown-menu')) {
            const dropdownItem = link.closest('.nav__item');
            if (dropdownItem) {
                link.addEventListener('mouseenter', function() {
                    const menu = this.closest('.dropdown-menu');
                    if (menu) menu.classList.add('show');
                    const parentDropdown = this.closest('.has-dropdown');
                    if (parentDropdown) {
                        parentDropdown.classList.add('hovered');
                    }
                });

                link.addEventListener('mouseleave', function() {
                    const parentDropdown = this.closest('.has-dropdown');
                    if (parentDropdown && !parentDropdown.classList.contains('active')) {
                        const menu = this.closest('.dropdown-menu');
                        if (menu) menu.classList.remove('show');
                        parentDropdown.classList.remove('hovered');
                    }
                });
            }
        }

        // Set active state based on current page or saved state
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            const linkPath = linkHref.split('?')[0];
            const savedLink = localStorage.getItem('activeNavLink');
            
            // Check if current page matches the link or matches saved link
            const isCurrentPage = (!isHomePage && linkPath === currentPath) ||
                                (isHomePage && (linkPath === 'index.html' || linkPath === '' || linkPath === '/'));
            
            const isSavedLink = savedLink && (savedLink === linkHref || 
                             (isHomePage && (savedLink === 'index.html' || savedLink === '' || savedLink === '/')));
            
            if (isCurrentPage || isSavedLink) {
                setActiveLink(link);
            }
        }

        // Update active state on click
        link.addEventListener('click', function(e) {
            const isDropdownToggle = this.classList.contains('dropdown-toggle') ||
                this.closest('.has-dropdown')?.querySelector('.dropdown-toggle') === this;
            
            if (!isDropdownToggle) {
                // Remove active class from all links first
                document.querySelectorAll('.navbar .nav__item-link').forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // If this is a dropdown item, also activate parent
                const parentDropdown = this.closest('.dropdown-menu');
                if (parentDropdown) {
                    const parentNavItem = parentDropdown.closest('.has-dropdown');
                    if (parentNavItem) {
                        const parentLink = parentNavItem.querySelector('.dropdown-toggle');
                        if (parentLink) {
                            parentLink.classList.add('active');
                        }
                    }
                }
                
                // Save to localStorage
                localStorage.setItem('activeNavLink', this.getAttribute('href'));
            }
        });
    });
}

// Initialize navigation when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
} else {
    initNavigation();
}

// Handle document click to close dropdowns
function handleDocumentClick(e) {
    const clickedElement = e.target;
    const isDropdownToggle = clickedElement.closest('.dropdown-toggle');

    // Only close dropdowns if clicking outside both the dropdown and its toggle
    if (!clickedElement.closest('.has-dropdown') && !isDropdownToggle) {
        closeOtherDropdowns();
    }
}

// Handle desktop hover leave
function handleDesktopLeave(e) {
    if (window.innerWidth > 991) {
        const dropdown = e.currentTarget;
        dropdown.classList.remove('active');
        const menu = dropdown.querySelector('.dropdown-menu');
        const arrow = dropdown.querySelector('.dropdown-arrow');
        if (menu) menu.classList.remove('show');
        if (arrow) arrow.classList.remove('active');
    }
}

// Handle desktop hover
function handleDesktopHover(e) {
    if (window.innerWidth > 991) {
        const toggle = e.currentTarget;
        const dropdown = toggle.closest('.has-dropdown');
        const menu = dropdown.querySelector('.dropdown-menu');
        const arrow = toggle.querySelector('.dropdown-arrow');

        if (menu) {
            dropdown.classList.add('active');
            menu.classList.add('show');
            if (arrow) arrow.classList.add('active');
        }
    }
}

// Helper function to check if this is the home link
function isHomeLink(link) {
    // Don't activate home link if we're on a project page, SafeCitylahore page, or not on home page
    if (currentPath.includes('/projects/') || currentPath.endsWith('project/SafeCitylahore.html') || !isHomePage) {
        return false;
    }

    if (!link) return false;
    const href = link.getAttribute('href');
    if (!href) return false;

    // Only activate home link if we're exactly on the home page
    const normalizedHref = href.split('?')[0];
    return (normalizedHref === 'index.html' ||
        normalizedHref === '/' ||
        normalizedHref === '' ||
        normalizedHref.endsWith('/index.html'));
}

// Helper function to check if this is the about us link
function isAboutUsLink(link) {
    if (!link) return false;
    const href = link.getAttribute('href');
    if (!href) return false;

    // Check if this is the main about us link or any of its subpages
    const normalizedHref = href.split('?')[0];
    return normalizedHref === 'about-us.html' ||
        normalizedHref.endsWith('/about-us.html') ||
        (link.closest('.has-dropdown') &&
            link.closest('.has-dropdown').querySelector('.dropdown-toggle') === link);
}

// Helper function to check if this is the contact us link
function isContactUsLink(link) {
    if (!link) return false;
    const href = link.getAttribute('href');
    if (!href) return false;

    const normalizedHref = href.split('?')[0];
    return normalizedHref === 'contact-us.html' ||
        normalizedHref.endsWith('/contact-us.html');
}

// Helper function to check if paths match exactly
function isExactMatch(link) {
    const href = link.getAttribute('href');
    if (!href) return false;

    try {
        const url = new URL(href, window.location.origin);
        const urlPath = url.pathname.split('/').pop();
        return urlPath === currentPage;
    } catch (e) {
        const linkPath = href.split('?')[0];
        return linkPath === currentPage && linkPath !== '';
    }
}

// Helper function to check if this is the careers link
function isCareersLink(link) {
    if (!link) return false;
    const href = link.getAttribute('href');
    if (!href) return false;

    const normalizedHref = href.split('?')[0];
    return normalizedHref === 'careers.html' ||
        normalizedHref.endsWith('/careers.html');
}

function isLinkActive(link) {
    // Don't activate any links on project pages
    if (currentPath.includes('/projects/') || currentPath.endsWith('project/SafeCitylahore.html') ||
        currentPath.includes('/projects/')) {
        return false;
    }

    // Don't activate home link if no route matches or we're in the projects folder
    const isHomeLinkCheck = isHomeLink(link);
    if ((isHomeLinkCheck && !isHomePage) ||
        currentPath.includes('/projects/') ||
        currentPath.includes('/projects/')) {
        return false;
    }

    // Check if this is a dropdown toggle link
    const isDropdownToggle = link.classList.contains('dropdown-toggle') ||
        link.closest('.has-dropdown')?.querySelector('.dropdown-toggle') === link;

    // Only activate home link if we're exactly on the home page
    if (isHomePage) {
        return isHomeLink(link);
    }

    // For contact page
    if (isContactPage) {
        return isContactUsLink(link);
    }

    // For careers page
    if (currentPage === 'careers.html') {
        return isCareersLink(link);
    }

    // For all about us subpages, only activate exact matches
    if (isAboutUsPage) {
        // For the main About Us page
        if (currentPage === 'about-us.html') {
            return isExactMatch(link);
        }

        // For all other subpages (about-ceo, projects, major-clients, strategic-partners)
        if (aboutUsSubpages.includes(currentPage)) {
            return isExactMatch(link);
        }
        // Fallback for any other cases
        return isAboutUsLink(link);
    }

    // For project pages in the /projects/ directory
    if (currentPath.includes('/projects/') || currentPath.endsWith('/projects') || currentPath.endsWith('/project')) {
        const href = link.getAttribute('href');
        return href && (href.endsWith('projects.html') || href.endsWith('/projects.html'));
    }

    // For all other pages, only activate if it's an exact match
    const href = link.getAttribute('href');
    if (!href) return false;
    if (isHomeLink(link)) return false;

    // Skip main dropdown toggle links unless we're on their subpage
    if (isDropdownToggle) {
        // Check if any of the dropdown items match the current page
        const dropdownMenu = link.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
            const subItems = dropdownMenu.querySelectorAll('a');
            for (const subItem of subItems) {
                const subHref = subItem.getAttribute('href');
                if (subHref) {
                    const subPath = subHref.split('?')[0];
                    if (subPath === currentPage) {
                        return true; // Activate parent if subitem matches
                    }
                }
            }
        }
        return false; // Don't activate main dropdown toggle by default
    }

    // Handle both absolute and relative URLs
    try {
        const url = new URL(href, window.location.origin);
        const urlPath = url.pathname.split('/').pop();
        return urlPath === currentPage;
    } catch (e) {
        // Handle relative URLs
        const linkPath = href.split('?')[0];
        return linkPath === currentPage && linkPath !== '';
    }
}

// This is now handled in setupActiveStates()

// Add click handler to update active state when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Don't update active state for dropdown toggle links
        const isDropdownToggle = this.classList.contains('dropdown-toggle') ||
            this.closest('.has-dropdown')?.querySelector('.dropdown-toggle') === this;

        if (!isDropdownToggle) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // If this is a dropdown item, also activate parent
            const parentDropdown = this.closest('.dropdown-menu');
            if (parentDropdown) {
                const parentNavItem = parentDropdown.closest('.has-dropdown');
                if (parentNavItem) {
                    const parentLink = parentNavItem.querySelector('.dropdown-toggle');
                    if (parentLink) {
                        parentLink.classList.add('active');
                    }
                }
            }

            // Save active state in localStorage for page reloads
            localStorage.setItem('activeNavLink', this.getAttribute('href'));
        }
    });

    // Restore active state from localStorage on page load
    const savedActiveLink = localStorage.getItem('activeNavLink');
    if (savedActiveLink && link.getAttribute('href') === savedActiveLink) {
        link.classList.add('active');
    }
});



// Navigation Active State Management
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar .nav__item-link');
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');
    const mobileBreakpoint = 991;

    // Set active link function
    function setActiveLink(clickedLink) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // If this is a dropdown item, also activate parent
        const parentDropdown = clickedLink.closest('.dropdown-menu');
        if (parentDropdown) {
            const parentNavItem = parentDropdown.closest('.has-dropdown');
            if (parentNavItem) {
                const parentLink = parentNavItem.querySelector('.dropdown-toggle');
                if (parentLink) {
                    parentLink.classList.add('active');
                    // Keep parent dropdown open on mobile when child is selected
                    if (window.innerWidth <= mobileBreakpoint) {
                        parentNavItem.classList.add('open');
                        const menu = parentNavItem.querySelector('.dropdown-menu');
                        if (menu) {
                            menu.style.maxHeight = menu.scrollHeight + 'px';
                            menu.style.opacity = '1';
                        }
                    }
                }
            }
        }
        
        // Save to localStorage
        if (clickedLink.getAttribute('href')) {
            localStorage.setItem('activeNavLink', clickedLink.getAttribute('href'));
        }
    }

    // Toggle dropdown with slide animation
    function toggleDropdown(button) {
        const parent = button.closest('.has-dropdown');
        const menu = parent.querySelector('.dropdown-menu');
        
        if (window.innerWidth <= mobileBreakpoint) {
            if (menu.style.maxHeight && !parent.classList.contains('has-active-child')) {
                // Close dropdown only if it doesn't have an active child
                menu.style.maxHeight = null;
                menu.style.opacity = '0';
                parent.classList.remove('open');
            } else {
                // Close other dropdowns first
                document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                    if (dropdown !== parent) {
                        const otherMenu = dropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.maxHeight = null;
                            otherMenu.style.opacity = '0';
                            dropdown.classList.remove('open');
                            dropdown.classList.remove('has-active-child');
                        }
                    }
                });
                
                // Open this dropdown
                menu.style.maxHeight = menu.scrollHeight + 'px';
                menu.style.opacity = '1';
                parent.classList.add('open');
            }
        }
    }

    // Handle dropdown toggle clicks
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= mobileBreakpoint) {
                e.preventDefault();
                e.stopPropagation();
                toggleDropdown(this);
            }
        });
    });

    // Handle submenu item clicks
    document.querySelectorAll('.dropdown-menu .nav__item-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= mobileBreakpoint) {
                const parentDropdown = this.closest('.has-dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.add('has-active-child');
                }
                setActiveLink(this);
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= mobileBreakpoint) {
            if (!e.target.closest('.has-dropdown')) {
                document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.maxHeight = null;
                        menu.style.opacity = '0';
                        dropdown.classList.remove('open');
                        dropdown.classList.remove('has-active-child');
                    }
                });
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > mobileBreakpoint) {
            // Reset all dropdowns on desktop
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.maxHeight = '';
                menu.style.opacity = '';
                const parent = menu.closest('.has-dropdown');
                if (parent) {
                    parent.classList.remove('open', 'has-active-child');
                }
            });
        }
    });

    // Add CSS for dropdown animations and arrow positioning
    const style = document.createElement('style');
    style.textContent = `
        /* Mobile dropdown styles */
        @media (max-width: 991px) {
            .has-dropdown {
                position: relative;
                padding-right: 25px;
            }
            
            .has-dropdown > .dropdown-toggle {
                position: relative;
                padding-right: 20px;
            }
            
            .has-dropdown > .dropdown-toggle:after {
                content: "\\f107";
                font-family: 'Font Awesome 5 Free';
                font-weight: 900;
                border: none;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                transition: transform 0.3s ease;
            }
            
            .has-dropdown.open > .dropdown-toggle:after,
            .has-dropdown.has-active-child > .dropdown-toggle:after {
                transform: rotate(180deg);
                top: auto;
                bottom: 10px;
            }
            
            .dropdown-menu {
                max-height: 0;
                opacity: 0;
                overflow: hidden;
                transition: max-height 0.3s ease, opacity 0.3s ease;
                display: block !important;
                padding: 0;
                margin: 0;
                background-color: #f9f9f9;
            }
            
            .has-dropdown.open > .dropdown-menu,
            .has-dropdown.has-active-child > .dropdown-menu {
                max-height: 1000px;
                opacity: 1;
                padding: 10px 0;
            }
            
            .dropdown-menu .nav__item {
                padding: 0;
            }
            
            .dropdown-menu .nav__item-link {
                padding: 10px 25px;
                display: block;
                color: #333 !important;
                border-bottom: 1px solid #eee;
            }
            
            .dropdown-menu .nav__item-link:hover {
                background-color: #f0f0f0;
            }
            
            .dropdown-menu .nav__item-link.active {
                color: #BF3646 !important;
                font-weight: 600;
            }
        }
    `;
    document.head.appendChild(style);

    // Set initial active state
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    let activeLinkSet = false;

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref) {
            const linkPath = linkHref.split('?')[0].split('/').pop();
            if (linkPath === currentPage) {
                setActiveLink(link);
                activeLinkSet = true;
            }
        }
    });

    // If no link matches the current page, try to find a partial match
    if (!activeLinkSet) {
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && currentPath.includes(linkHref.split('?')[0])) {
                setActiveLink(link);
            }
        });
    }
});

// Handle dropdown toggle clicks
document.addEventListener('click', function(e) {
    const toggle = e.target.closest('.dropdown-toggle');
    if (toggle && window.innerWidth <= 991) {
        e.preventDefault();
        const parent = toggle.closest('.has-dropdown');
        if (parent) {
            const wasOpen = parent.classList.contains('open');
            
            // Close all other dropdowns
            document.querySelectorAll('.has-dropdown').forEach(dropdown => {
                if (dropdown !== parent) {
                    dropdown.classList.remove('open', 'has-active-child');
                    const menu = dropdown.querySelector('.dropdown-menu');
                    if (menu) {
                        menu.style.maxHeight = null;
                        menu.style.opacity = '0';
                        setTimeout(() => {
                            menu.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // Toggle current dropdown
            if (!wasOpen) {
                parent.classList.add('open');
                const menu = parent.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'block';
                    setTimeout(() => {
                        menu.style.maxHeight = menu.scrollHeight + 'px';
                        menu.style.opacity = '1';
                    }, 10);
                }
            } else {
                parent.classList.remove('open');
                const menu = parent.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.maxHeight = null;
                    menu.style.opacity = '0';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                }
            }
        }
    }
});

// Handle submenu item clicks
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
            const parentNav = this.closest('.has-dropdown');
            if (parentNav) {
                parentNav.classList.add('has-active-child');
                const menu = parentNav.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'block';
                    menu.style.maxHeight = menu.scrollHeight + 'px';
                    menu.style.opacity = '1';
                }
            }
        }
    });
});