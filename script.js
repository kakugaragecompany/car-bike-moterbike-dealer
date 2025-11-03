// Sample vehicle data
const vehiclesData = [
    {
        id: 1,
        type: 'car',
        name: 'Honda City',
        price: '₹12,50,000',
        year: 2023,
        mileage: '21 km/l',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 2,
        type: 'car',
        name: 'Hyundai Creta',
        price: '₹14,20,000',
        year: 2022,
        mileage: '18 km/l',
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 3,
        type: 'bike',
        name: 'Royal Enfield Classic 350',
        price: '₹1,90,000',
        year: 2023,
        mileage: '35 km/l',
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 4,
        type: 'bike',
        name: 'Yamaha R15',
        price: '₹1,70,000',
        year: 2022,
        mileage: '40 km/l',
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 5,
        type: 'scooter',
        name: 'Honda Activa 6G',
        price: '₹75,000',
        year: 2023,
        mileage: '55 km/l',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 6,
        type: 'scooter',
        name: 'TVS Jupiter',
        price: '₹70,000',
        year: 2022,
        mileage: '50 km/l',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1571325654970-60aa4a1e4fac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 7,
        type: 'car',
        name: 'Maruti Swift',
        price: '₹8,50,000',
        year: 2023,
        mileage: '23 km/l',
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 8,
        type: 'bike',
        name: 'Bajaj Pulsar NS200',
        price: '₹1,40,000',
        year: 2022,
        mileage: '40 km/l',
        transmission: 'Manual',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
        id: 9,
        type: 'scooter',
        name: 'Suzuki Access 125',
        price: '₹80,000',
        year: 2023,
        mileage: '52 km/l',
        transmission: 'Automatic',
        image: 'https://images.unsplash.com/photo-1565073624497-7e91b5cc3843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    }
];

// DOM Elements
const vehiclesContainer = document.getElementById('vehicles-container');
const vehicleTypeFilter = document.getElementById('vehicle-type');
const priceRangeFilter = document.getElementById('price-range');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.main-nav');
const contactForm = document.getElementById('contactForm');
const quickInquiryForm = document.getElementById('quickInquiryForm');
const sellForm = document.getElementById('sellVehicleForm');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display all vehicles initially
    displayVehicles(vehiclesData);
    
    // Setup event listeners
    setupEventListeners();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
});

// Display vehicles in the container
function displayVehicles(vehicles) {
    vehiclesContainer.innerHTML = '';
    
    if (vehicles.length === 0) {
        vehiclesContainer.innerHTML = '<p class="no-results">No vehicles found matching your criteria. Please try a different search.</p>';
        return;
    }
    
    vehicles.forEach(vehicle => {
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';
        
        vehicleCard.innerHTML = `
            <div class="vehicle-image">
                <img src="${vehicle.image}" alt="${vehicle.name}">
            </div>
            <div class="vehicle-details">
                <span class="vehicle-type">${capitalizeFirstLetter(vehicle.type)}</span>
                <h3 class="vehicle-title">${vehicle.name}</h3>
                <div class="vehicle-price">${vehicle.price}</div>
                <div class="vehicle-features">
                    <div class="vehicle-feature">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${vehicle.year}</span>
                    </div>
                    <div class="vehicle-feature">
                        <i class="fas fa-gas-pump"></i>
                        <span>${vehicle.mileage}</span>
                    </div>
                    <div class="vehicle-feature">
                        <i class="fas fa-cog"></i>
                        <span>${vehicle.transmission}</span>
                    </div>
                </div>
                <div class="vehicle-actions">
                    <a href="#contact" class="btn primary">Inquire Now</a>
                    <button class="btn secondary" onclick="showVehicleDetails(${vehicle.id})">Details</button>
                </div>
            </div>
        `;
        
        vehiclesContainer.appendChild(vehicleCard);
    });
}

// Filter vehicles based on selected criteria
function filterVehicles() {
    const selectedType = vehicleTypeFilter.value;
    const selectedPriceRange = priceRangeFilter.value;
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredVehicles = vehiclesData;
    
    // Filter by type
    if (selectedType !== 'all') {
        filteredVehicles = filteredVehicles.filter(vehicle => vehicle.type === selectedType);
    }
    
    // Filter by price range
    if (selectedPriceRange !== 'all') {
        filteredVehicles = filteredVehicles.filter(vehicle => {
            const price = parseInt(vehicle.price.replace(/[₹,]/g, ''));
            
            if (selectedPriceRange === 'budget' && price < 100000) return true;
            if (selectedPriceRange === 'mid' && price >= 100000 && price < 1000000) return true;
            if (selectedPriceRange === 'premium' && price >= 1000000) return true;
            
            return false;
        });
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredVehicles = filteredVehicles.filter(vehicle => 
            vehicle.name.toLowerCase().includes(searchTerm) || 
            vehicle.type.toLowerCase().includes(searchTerm)
        );
    }
    
    displayVehicles(filteredVehicles);
}

// Setup event listeners
function setupEventListeners() {
    // Filter change events
    vehicleTypeFilter.addEventListener('change', filterVehicles);
    priceRangeFilter.addEventListener('change', filterVehicles);
    
    // Search button click
    searchBtn.addEventListener('click', filterVehicles);
    
    // Search input enter key
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterVehicles();
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // In a real app, you would send this data to a server
            console.log('Contact form submitted:', formValues);
            
            // Show success message with contact info
            alert('Thank you! We will contact you soon. Phone: (+91) 93546-11065, Address: DWARKA SEC 3 NEW DELHI');
            const success = document.createElement('div');
            success.className = 'form-success';
            success.innerHTML = '<strong>Submitted.</strong> We will call you shortly.<br>Phone: (+91) 93546-11065 · Address: DWARKA SEC 3 NEW DELHI';
            contactForm.parentElement.appendChild(success);
            contactForm.reset();
        });
    }

    // Quick inquiry form
    if (quickInquiryForm) {
        quickInquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const hpq = document.getElementById('qi-website');
            if (hpq && hpq.value) return; // honeypot
            alert('Inquiry received! Call (+91) 93546-11065 or visit DWARKA SEC 3 NEW DELHI');
            const success = document.createElement('div');
            success.className = 'form-success';
            success.textContent = 'Inquiry submitted. We will reach out soon.';
            quickInquiryForm.parentElement.appendChild(success);
            quickInquiryForm.reset();
        });
    }

    // Sell vehicle form success
    if (sellForm) {
        sellForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const hp = document.getElementById('sell-website');
            if (hp && hp.value) return; // honeypot
            alert('Details submitted! Contact: (+91) 93546-11065 · Address: DWARKA SEC 3 NEW DELHI');
            const success = document.createElement('div');
            success.className = 'form-success';
            success.innerHTML = '<strong>Thank you.</strong> Our team will contact you.<br>Phone: (+91) 93546-11065 · Address: DWARKA SEC 3 NEW DELHI';
            sellForm.appendChild(success);
            sellForm.reset();
        });
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            
            // In a real app, you would send this data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            e.target.reset();
        });
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Show vehicle details (modal)
function showVehicleDetails(vehicleId) {
    const vehicle = vehiclesData.find(v => v.id === vehicleId);
    
    if (!vehicle) return;
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'vehicle-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>${vehicle.name}</h2>
                <div class="vehicle-price">${vehicle.price}</div>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                </div>
                <div class="modal-details">
                    <div class="detail-item">
                        <span class="detail-label">Type:</span>
                        <span class="detail-value">${capitalizeFirstLetter(vehicle.type)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Year:</span>
                        <span class="detail-value">${vehicle.year}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Mileage:</span>
                        <span class="detail-value">${vehicle.mileage}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Transmission:</span>
                        <span class="detail-value">${vehicle.transmission}</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#contact" class="btn primary">Contact Us About This Vehicle</a>
            </div>
        </div>
    `;
    
    // Add modal to the body
    document.body.appendChild(modal);
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .vehicle-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            
            .modal-content {
                background-color: white;
                border-radius: 5px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                font-size: 28px;
                cursor: pointer;
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-body {
                padding: 20px;
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
            }
            
            .modal-image {
                flex: 1;
                min-width: 300px;
            }
            
            .modal-image img {
                width: 100%;
                border-radius: 5px;
            }
            
            .modal-details {
                flex: 1;
                min-width: 300px;
            }
            
            .detail-item {
                margin-bottom: 15px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            
            .detail-label {
                font-weight: 600;
                margin-right: 10px;
            }
            
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #eee;
                text-align: center;
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Close modal when clicking on close button or outside the modal
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.vehicle-modal')) {
            document.body.removeChild(modal);
        }
    });
    
    // Close modal when clicking on "Contact Us" link
    const contactLink = modal.querySelector('.modal-footer a');
    contactLink.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Basic anti-spam: ignore submissions when honeypot fields are filled
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const hp = document.getElementById('website');
      if (hp && hp.value) {
        // Honeypot filled: likely bot
        e.preventDefault();
      }
    });
  }

  const sellForm = document.getElementById('sellVehicleForm');
  if (sellForm) {
    sellForm.addEventListener('submit', (e) => {
      const hp = document.getElementById('sell-website');
      if (hp && hp.value) {
        e.preventDefault();
      }
    });
  }
});