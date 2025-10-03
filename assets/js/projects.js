document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and projects
    const filterButtons = document.querySelectorAll('.services-list li a');
    const projects = Array.from(document.querySelectorAll('[data-category]'));
    const allButton = document.querySelector('.services-list li a[href="projects.html"]');
    const projectsContainer = document.getElementById('projects-container');
    
    // Function to set active tab based on URL hash
    function setActiveTabFromHash() {
        const hash = window.location.hash.substring(1);
        console.log('Current hash:', hash);
        
        // Remove active class from all tabs
        document.querySelectorAll('.services-list li').forEach(item => {
            item.classList.remove('active');
        });
        
        if (hash) {
            // Try to find a matching tab with the hash
            const activeLink = document.querySelector(`.services-list a[data-filter="${hash}"]`);
            if (activeLink && activeLink.parentElement) {
                activeLink.parentElement.classList.add('active');
                console.log('Activated tab for hash:', hash);
                filterProjects(hash);
                return;
            }
        }
        
        // If no valid hash or matching tab found, activate 'All' tab
        console.log('No valid hash, activating All tab');
        if (allButton && allButton.parentElement) {
            allButton.parentElement.classList.add('active');
            filterProjects('all');
        }
    }
    
    // Initial setup based on URL hash
    if (window.location.hash) {
        // If there's a hash in the URL, process it after a small delay to ensure DOM is ready
        setTimeout(() => {
            const hash = window.location.hash.substring(1);
            console.log('Initial page load with hash:', hash);
            updateActiveTab(hash);
            filterProjects(hash);
        }, 100);
    } else {
        // No hash, default to 'All' tab
        setActiveTabFromHash();
    }
    
    // Handle browser back/forward button
    window.addEventListener('popstate', function() {
        setActiveTabFromHash();
        // Force a reflow to ensure the active tab is visible
        document.body.offsetHeight;
    });

    // Function to filter and display projects
    function filterProjects(category) {
        let hasMatches = false;
        
        // Reset projects container
        if (projectsContainer) {
            projectsContainer.innerHTML = '';
            projects.forEach(p => projectsContainer.appendChild(p));
        }
        
        if (category === 'all') {
            // Show all projects
            projects.forEach(project => {
                project.style.display = 'block';
                hasMatches = true;
            });
        } else if (category === 'smart-surveillance') {
            // Special handling for Smart Surveillance - only show specific cards
            const allowedTitles = [
                'SIDCL',
                'National Highway Authority',
                'ZTBL Bank',
                'Safe City Lahore',
                'SMTA'
            ];
            
            projects.forEach(project => {
                const projectCategory = project.getAttribute('data-category');
                const title = project.querySelector('.product-title')?.textContent.trim();
                
                if (projectCategory && projectCategory.includes('smart-surveillance') && allowedTitles.includes(title)) {
                    project.style.display = 'block';
                    hasMatches = true;
                } else {
                    project.style.display = 'none';
                }
            });
        } else {
            // For other categories, show all matching projects
            projects.forEach(project => {
                const projectCategories = project.getAttribute('data-category')?.split(' ') || [];
                if (projectCategories.includes(category)) {
                    project.style.display = 'block';
                    hasMatches = true;
                } else {
                    project.style.display = 'none';
                }
            });
        }
        
        // Show message if no projects found
        if (!hasMatches && projectsContainer) {
            projectsContainer.innerHTML = `
                <div class="col-12 text-center py-5">
                    <h3>No projects found in this category</h3>
                    <p>Please check back later for new additions.</p>
                </div>
            `;
        }
    }

    // Function to update active tab
    function updateActiveTab(activeFilter) {
        console.log('Updating active tab for filter:', activeFilter);
        
        // Remove active class from all tabs
        const allTabs = document.querySelectorAll('.services-list li');
        allTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to the clicked tab
        if (activeFilter === 'all' || !activeFilter) {
            const allTab = document.querySelector('.services-list li:first-child');
            if (allTab) {
                allTab.classList.add('active');
                console.log('Activated All tab');
            }
        } else {
            const activeTab = document.querySelector(`.services-list a[data-filter="${activeFilter}"]`);
            if (activeTab && activeTab.parentElement) {
                activeTab.parentElement.classList.add('active');
                console.log('Activated tab for filter:', activeFilter);
            } else {
                console.warn('Could not find tab for filter:', activeFilter);
            }
        }
    }

    // Function to handle tab click
    function handleTabClick(e) {
        e.preventDefault();
        const button = this;
        console.log('Tab clicked:', button.textContent.trim());
        
        let filterValue;
        
        // Handle 'All' button
        if (button.getAttribute('href') === 'projects.html') {
            filterValue = 'all';
            // Update URL without page reload
            window.history.pushState({}, '', 'projects.html');
        } else {
            // Get the filter value from data-filter attribute
            filterValue = button.getAttribute('data-filter');
            if (filterValue) {
                // Update URL with hash for other filters
                window.history.pushState({}, '', `#${filterValue}`);
            }
        }
        
        console.log('Setting active tab for:', filterValue);
        // Update active tab and filter projects
        updateActiveTab(filterValue);
        filterProjects(filterValue);
    }

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        // Remove any existing event listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add new click event listener
        newButton.addEventListener('click', handleTabClick);
    });
    
    // Also handle clicks on the arrow spans
    document.querySelectorAll('.services-list li a span').forEach(span => {
        span.addEventListener('click', function(e) {
            e.stopPropagation();
            this.parentElement.click();
        });
    });
});

// Function to update active tab
function updateActiveTab(activeFilter) {
    // Remove active class from all tabs
    document.querySelectorAll('.services-list li').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to the clicked tab
    if (activeFilter === 'all') {
        const allTab = document.querySelector('.services-list a[href="projects.html"]');
        if (allTab && allTab.parentElement) {
            allTab.parentElement.classList.add('active');
        }
    } else {
        const activeTab = document.querySelector(`.services-list a[data-filter="${activeFilter}"]`);
        if (activeTab && activeTab.parentElement) {
            activeTab.parentElement.classList.add('active');
        }
    }
}

