// Sample vehicle data
const vehiclesData = [
   // New listing: Audi 2013, 2nd owner, Petrol, MH registration
    {
        id: 1,
        type: 'car',
        name: 'Audi A4 1.8',
        price: '₹3,00,000',
        year: 2013,
        transmission: 'Automatic',
        fuel: 'Petrol',
        owner: '2nd owner',
        image: 'images/KGC_WEBSITE_AUDI.jpg'
    },   
    {
        id: 2,
        type: 'car',
        name: 'Hyundai Grand i10',
        price: '₹3,60,000',
        year: 2018,
        image: 'images/KGC_WEBSITE_I10.jpg'
    },
    {
        id: 3,
        type: 'car',
        name: 'Maruti WagnoR LXI',
        price: '₹4,30,000',
        year: 2022,
        image: 'images/KGC_WEBSITE_WAGNOR.jpg'
    },
    {
        id: 4,
        type: 'car',
        name: 'Hyundai i10',
        price: '₹1,60,000',
        year: 2013,
        transmission: 'Manual',
        image: 'images/KGC_WEBSITE_I10_GOURAV.jpg'
    },
    {
        id: 5,
        type: 'bike',
        name: 'apache 160rtr',
        price: '₹49,000',
        year: 2018,
        image: 'images/KGC_WEBSITE_APACHI.jpg'
    },
    {
        id: 6,
        type: 'bike',
        name: 'apache 160 4v',
        price: '₹95,000',
        year: 2023,
        image: 'images/KGC_WEBSITE_1L_APACHI.jpg',
    },
    {
        id: 7,
        type: 'scooter',
        name: 'Mestro Eage',
        price: '₹30,000',
        year: 2017,
        image: 'images/KGC_WEBSITE_MESTRO.jpg'
    },
    {
        id: 8,
        type: 'scooter',
        name: 'TVS Ntorq 125cc caption america edition',
        price: '₹42,000',
        year: 2020,
        image: 'images/KGC_WEBSITE_NTORQ.jpg'
    },
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
    
    const showSold = document.getElementById('show-sold-checkbox').checked;

    vehicles.forEach(vehicle => {
        if (!showSold && vehicle.sold) {
            return;
        }
        const vehicleCard = document.createElement('div');
        vehicleCard.className = 'vehicle-card';

        vehicleCard.innerHTML = `
            <div class="vehicle-image">
                ${vehicle.sold ? '<div class="sold-badge">Sold</div>' : ''}
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
                <div class="vehicle-meta">
                    ${vehicle.owner ? `<span class="meta-pill">${vehicle.owner}</span>` : ''}
                    ${vehicle.fuel ? `<span class="meta-pill">${vehicle.fuel}</span>` : ''}
                    ${vehicle.registration ? `<span class="meta-pill">${vehicle.registration}</span>` : ''}
                    ${vehicle.condition ? `<div class="meta-note">${vehicle.condition}</div>` : ''}
                </div>
                <div class="vehicle-actions">
                    ${vehicle.sold ? '<span class="btn secondary disabled">Sold</span>' : '<a href="#contact" class="btn primary">Inquire Now</a>'}
                    <button class="btn secondary details-btn" data-id="${vehicle.id}">Details</button>
                </div>
            </div>
        `;

        vehiclesContainer.appendChild(vehicleCard);
        const detailsBtn = vehicleCard.querySelector('.details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', () => {
                showVehicleDetails(vehicle.id);
            });
        }
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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Honeypot
            const hp = document.getElementById('website');
            if (hp && hp.value) return;
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            formValues._subject = 'New Contact Inquiry - KAKU GARAGE COMPANY';
            formValues._template = 'table';
            formValues.form_name = 'Contact Form';
            try {
                const resp = await fetch('https://formsubmit.co/ajax/kakugarage@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formValues)
                });
                if (resp.ok) {
                    const success = document.createElement('div');
                    success.className = 'form-success';
                    success.innerHTML = '<strong>Submitted.</strong> We will call you shortly.<br>Phone: (+91) 93546-11065 · Address: DWARKA SEC 3 NEW DELHI';
                    contactForm.parentElement.appendChild(success);
                    alert('Thank you! Your message was sent successfully.');
                    contactForm.reset();
                } else {
                    alert('Sorry, we could not send your message right now. Please call (+91) 93546-11065.');
                }
            } catch (err) {
                alert('Network error while sending message. Please try again or call us.');
                console.error('Contact form error:', err);
            }
        });
    }

    // Quick inquiry form
    if (quickInquiryForm) {
        quickInquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const hpq = document.getElementById('qi-website');
            if (hpq && hpq.value) return; // honeypot
            const formData = new FormData(quickInquiryForm);
            const formValues = Object.fromEntries(formData.entries());
            formValues._subject = 'Quick Inquiry - KAKU GARAGE COMPANY';
            formValues._template = 'table';
            formValues.form_name = 'Quick Inquiry';
            try {
                const resp = await fetch('https://formsubmit.co/ajax/kakugarage@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formValues)
                });
                if (resp.ok) {
                    const success = document.createElement('div');
                    success.className = 'form-success';
                    success.textContent = 'Inquiry submitted. We will reach out soon.';
                    quickInquiryForm.parentElement.appendChild(success);
                    alert('Inquiry received! We will contact you shortly.');
                    quickInquiryForm.reset();
                } else {
                    alert('Sorry, inquiry could not be sent. Please call (+91) 93546-11065.');
                }
            } catch (err) {
                alert('Network error while sending inquiry. Please try again or call us.');
                console.error('Quick inquiry error:', err);
            }
        });
    }

    // Sell vehicle form submission
    if (sellForm) {
        sellForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const hp = document.getElementById('sell-website');
            if (hp && hp.value) return; // honeypot
            const formData = new FormData(sellForm);
            const formValues = Object.fromEntries(formData.entries());
            formValues._subject = 'Sell Vehicle Details - KAKU GARAGE COMPANY';
            formValues._template = 'table';
            formValues.form_name = 'Sell Vehicle Form';
            try {
                const resp = await fetch('https://formsubmit.co/ajax/kakugarage@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(formValues)
                });
                if (resp.ok) {
                    const success = document.createElement('div');
                    success.className = 'form-success';
                    success.innerHTML = '<strong>Thank you.</strong> Our team will contact you.<br>Phone: (+91) 93546-11065 · Address: DWARKA SEC 3 NEW DELHI';
                    sellForm.appendChild(success);
                    alert('Details submitted! We will contact you soon.');
                    sellForm.reset();
                } else {
                    alert('Sorry, we could not submit your details. Please call (+91) 93546-11065.');
                }
            } catch (err) {
                alert('Network error while submitting details. Please try again or call us.');
                console.error('Sell form error:', err);
            }
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
                    ${vehicle.owner ? `
                    <div class="detail-item">
                        <span class="detail-label">Owner:</span>
                        <span class="detail-value">${vehicle.owner}</span>
                    </div>` : ''}
                    ${vehicle.fuel ? `
                    <div class="detail-item">
                        <span class="detail-label">Fuel:</span>
                        <span class="detail-value">${vehicle.fuel}</span>
                    </div>` : ''}
                    ${vehicle.registration ? `
                    <div class="detail-item">
                        <span class="detail-label">Registration:</span>
                        <span class="detail-value">${vehicle.registration}</span>
                    </div>` : ''}
                    ${vehicle.condition ? `
                    <div class="detail-item">
                        <span class="detail-label">Condition:</span>
                        <span class="detail-value">${vehicle.condition}</span>
                    </div>` : ''}
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

  // Register service worker for PWA installability (respects CSP by using external script)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .catch((err) => console.error('Service worker registration failed:', err));
  }
  const showSoldCheckbox = document.getElementById('show-sold-checkbox');
  showSoldCheckbox.addEventListener('change', filterVehicles);
});

// Show sold vehicles checkbox
const showSoldCheckbox = document.getElementById('show-sold-checkbox');
showSoldCheckbox.addEventListener('change', () => {
    // Re-run filters to respect current selections and sold visibility
    filterVehicles();
});

// Delegate Details button clicks (robust to dynamic re-renders)
if (vehiclesContainer) {
    vehiclesContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.details-btn');
        if (btn) {
            const id = parseInt(btn.dataset.id, 10);
            if (!Number.isNaN(id)) {
                showVehicleDetails(id);
            }
        }
    });

}






