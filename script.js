// ========== NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 30px rgba(220, 20, 60, 0.5)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 20px rgba(220, 20, 60, 0.3)';
    }
});

// ========== SMOOTH SCROLLING FOR NAVBAR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// ========== PRICELIST FILTER & SEARCH ==========
// Declare variables once at the top
const filterButtons = document.querySelectorAll('.filter-btn');
const priceItems = document.querySelectorAll('.price-item');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const searchResultInfo = document.getElementById('searchResultInfo');

// ========== FILTER FUNCTIONALITY ==========
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // If there's active search, clear it first
        if (searchInput && searchInput.value.trim() !== '') {
            clearSearchInput();
        }

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter items
        priceItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ========== SEARCH FUNCTIONALITY ==========
if (searchInput) {
    // Search function
    function searchPricelist() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;
        let noResultsDiv = document.getElementById('noResultsMessage');

        // Show/hide clear button
        if (searchTerm.length > 0) {
            clearSearch.style.display = 'flex';
        } else {
            clearSearch.style.display = 'none';
        }

        // If search is empty, show all items based on current filter
        if (searchTerm === '') {
            searchResultInfo.textContent = '';
            searchResultInfo.classList.remove('active');
            
            // Remove no results message if exists
            if (noResultsDiv) {
                noResultsDiv.remove();
            }

            // Show items based on active filter
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            priceItems.forEach(item => {
                if (activeFilter === 'all' || item.getAttribute('data-category') === activeFilter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.display = 'none';
                }
            });
            return;
        }

        // Search through items
        priceItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const category = item.getAttribute('data-category').toLowerCase();
            
            if (title.includes(searchTerm) || category.includes(searchTerm)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
                item.classList.add('search-highlight');
                setTimeout(() => {
                    item.classList.remove('search-highlight');
                }, 500);
                visibleCount++;
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Update result info
        if (visibleCount > 0) {
            searchResultInfo.textContent = `Ditemukan ${visibleCount} layanan untuk "${searchTerm}"`;
            searchResultInfo.classList.add('active');
            
            // Remove no results message if exists
            if (noResultsDiv) {
                noResultsDiv.remove();
            }
        } else {
            searchResultInfo.textContent = `Tidak ada hasil untuk "${searchTerm}"`;
            searchResultInfo.classList.add('active');
            
            // Show no results message
            if (!noResultsDiv) {
                const container = document.getElementById('pricelistContainer');
                noResultsDiv = document.createElement('div');
                noResultsDiv.id = 'noResultsMessage';
                noResultsDiv.className = 'col-12 no-results-message';
                noResultsDiv.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>Maaf, layanan "${searchTerm}" tidak ditemukan.</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Coba kata kunci lain atau hubungi admin untuk info lebih lanjut.</p>
                `;
                container.appendChild(noResultsDiv);
            }
        }

        // Reset filter buttons when searching
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');
    }

    // Clear search
    function clearSearchInput() {
        searchInput.value = '';
        clearSearch.style.display = 'none';
        searchResultInfo.textContent = '';
        searchResultInfo.classList.remove('active');
        
        // Remove no results message if exists
        const noResultsDiv = document.getElementById('noResultsMessage');
        if (noResultsDiv) {
            noResultsDiv.remove();
        }

        // Show all items based on active filter
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        priceItems.forEach(item => {
            if (activeFilter === 'all' || item.getAttribute('data-category') === activeFilter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            }
        });

        searchInput.focus();
    }

    // Event listeners
    searchInput.addEventListener('input', searchPricelist);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Escape') {
            clearSearchInput();
        }
    });
    clearSearch.addEventListener('click', clearSearchInput);

    // Make clearSearchInput available globally for filter buttons
    window.clearSearchInput = clearSearchInput;
}

// ========== TESTIMONI IMAGE MODAL ==========
const testimoniCards = document.querySelectorAll('.testimoni-card');
const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
const modalImage = document.getElementById('modalImage');

testimoniCards.forEach(card => {
    card.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        modalImage.setAttribute('src', imgSrc);
        imageModal.show();
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== ANIMATION ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .price-card, .testimoni-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========== ACTIVE NAVBAR LINK ON SCROLL ==========
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========== PREVENT EMPTY LINKS ==========
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// ========== LOADING ANIMATION ==========
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

