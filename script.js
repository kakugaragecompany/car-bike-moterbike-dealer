const scriptURL = "https://api.web3forms.com/submit";

// VEHICLE DATA
const vehicles = [
    { id: 1, type: "car", name: "Audi A4 1.8", price: "₹3,00,000", year: 2013, transmission: "Automatic", fuel: "Petrol", owner: "2nd owner", image: "images/KGC_WEBSITE_AUDI.jpg" },
    { id: 2, type: "car", name: "Hyundai Grand i10", price: "₹3,60,000", year: 2018, image: "images/KGC_WEBSITE_I10.jpg" },
    { id: 3, type: "car", name: "Maruti WagnoR LXI", price: "₹4,30,000", year: 2022, image: "images/KGC_WEBSITE_WAGNOR.jpg" },
    { id: 4, type: "car", name: "Hyundai i10", price: "₹1,60,000", year: 2013, transmission: "Manual", image: "images/KGC_WEBSITE_I10_GOURAV.jpg" },
    { id: 5, type: "bike", name: "Apache 160 RTR", price: "₹49,000", year: 2018, image: "images/KGC_WEBSITE_APACHI.jpg" },
    { id: 6, type: "bike", name: "Apache 160 4V", price: "₹95,000", year: 2023, image: "images/KGC_WEBSITE_1L_APACHI.jpg" },
    { id: 7, type: "scooter", name: "Mestro Edge", price: "₹30,000", year: 2017, image: "images/KGC_WEBSITE_MESTRO.jpg" },
    { id: 8, type: "scooter", name: "TVS Ntorq 125", price: "₹42,000", year: 2020, image: "images/KGC_WEBSITE_NTORQ.jpg" }
];

// DOM ELEMENTS
const vehiclesContainer = document.getElementById("vehicles-container");
const vehicleTypeFilter = document.getElementById("vehicle-type");
const priceRangeFilter = document.getElementById("price-range");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const showSoldCheckbox = document.getElementById("show-sold-checkbox");

// WHEN PAGE LOADS → SHOW VEHICLES
document.addEventListener("DOMContentLoaded", () => {
    displayVehicles(vehicles);
});

// DISPLAY VEHICLES FUNCTION
function displayVehicles(list) {
    vehiclesContainer.innerHTML = "";

    if (list.length === 0) {
        vehiclesContainer.innerHTML = `<p class="no-results">No vehicles found.</p>`;
        return;
    }

    list.forEach(v => {
        const card = document.createElement("div");
        card.className = "vehicle-card";

        card.innerHTML = `
            <div class="vehicle-image">
                <img src="${v.image}" alt="${v.name}">
            </div>
            <div class="vehicle-details">
                <h3 class="vehicle-title">${v.name}</h3>
                <div class="vehicle-price">${v.price}</div>
                <div class="vehicle-features">
                    <span>${v.year}</span>
                    ${v.transmission ? `<span>${v.transmission}</span>` : ""}
                </div>
            </div>
        `;

        vehiclesContainer.appendChild(card);
    });
}

// FILTER FUNCTION
function filterVehicles() {
    let list = [...vehicles];

    const type = vehicleTypeFilter.value;
    if (type !== "all") {
        list = list.filter(v => v.type === type);
    }

    const priceRange = priceRangeFilter.value;
    if (priceRange !== "all") {
        list = list.filter(v => {
            const p = parseInt(v.price.replace(/[₹,]/g, ""));

            if (priceRange === "budget") return p < 100000;
            if (priceRange === "mid") return p >= 100000 && p < 1000000;
            if (priceRange === "premium") return p >= 1000000;
        });
    }

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        list = list.filter(v =>
            v.name.toLowerCase().includes(searchTerm) ||
            v.type.toLowerCase().includes(searchTerm)
        );
    }

    displayVehicles(list);
}

// FILTER EVENTS
vehicleTypeFilter.addEventListener("change", filterVehicles);
priceRangeFilter.addEventListener("change", filterVehicles);
searchBtn.addEventListener("click", filterVehicles);
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") filterVehicles();
});
