document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 0;

    const steps = document.querySelectorAll(".step");
    const stepContents = document.querySelectorAll(".step-content");
    const nextBtns = document.querySelectorAll(".next-btn");

    // Supplier prices (example data)
    const supplierPricing = {
        Roller: {
            Plastic: { White: 50, Black: 55 },
            Metal: { White: 70, Black: 75 },
        },
        Venetian: {
            Wood: { Oak: 80, Gray: 85 },
            Metal: { Oak: 90, Gray: 95 },
        },
    };

    const markupRate = 0.5; // 50% markup

    // Navigation between steps
    nextBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove("active");
                stepContents[currentStep].classList.remove("active");
                currentStep++;
                steps[currentStep].classList.add("active");
                stepContents[currentStep].classList.add("active");
            }
        })
    );

    // Populate blind types dynamically
    const blindTypesDiv = document.getElementById("blind-types");
    Object.keys(supplierPricing).forEach((type) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${type}</h3>`;
        div.addEventListener("click", () => {
            document.getElementById("selected-blind-type").value = type;
            populateMaterials(type);
        });
        blindTypesDiv.appendChild(div);
    });

    // Populate materials and colors dynamically
    function populateMaterials(blindType) {
        const materialsDiv = document.getElementById("colors");
        materialsDiv.innerHTML = ""; // Clear previous materials

        const materials = supplierPricing[blindType];
        Object.keys(materials).forEach((material) => {
            const materialDiv = document.createElement("div");
            materialDiv.innerHTML = `<h4>${material}</h4>`;
            materialDiv.addEventListener("click", () => {
                document.getElementById("selected-material").value = material;
                populateColors(blindType, material);
            });
            materialsDiv.appendChild(materialDiv);
        });
    }

    function populateColors(blindType, material) {
        const colorsDiv = document.getElementById("colors");
        colorsDiv.innerHTML = ""; // Clear previous colors

        const colors = supplierPricing[blindType][material];
        Object.keys(colors).forEach((color) => {
            const colorDiv = document.createElement("div");
            colorDiv.innerHTML = `<p>${color}</p>`;
            colorDiv.addEventListener("click", () => {
                document.getElementById("selected-color").value = color;
            });
            colorsDiv.appendChild(colorDiv);
        });
    }

    // Quote calculation and display
    document.getElementById("download-pdf").addEventListener("click", () => {
        const width = parseFloat(document.getElementById("width").value);
        const height = parseFloat(document.getElementById("height").value);
        const blindType = document.getElementById("selected-blind-type").value;
        const material = document.getElementById("selected-material").value;
        const color = document.getElementById("selected-color").value;

        const supplierPrice = supplierPricing[blindType][material][color];
        const markup = supplierPrice * markupRate;
        const costPerUnit = supplierPrice + markup;

        const area = width * height; // Area in cm²
        const finalQuote = (area / 10000) * costPerUnit; // Convert to m² and calculate

        // Display quote summary
        const quoteSummary = document.getElementById("quote-summary");
        quoteSummary.innerHTML = `
            <h3>Quote Summary</h3>
            <p>Blind Type: ${blindType}</p>
            <p>Material: ${material}</p>
            <p>Color: ${color}</p>
            <p>Supplier Cost per m²: R${supplierPrice.toFixed(2)}</p>
            <p>Markup (50%): R${markup.toFixed(2)}</p>
            <p>Total Cost per m²: R${costPerUnit.toFixed(2)}</p>
            <p>Area: ${area / 10000} m²</p>
            <h4>Final Quote: R${finalQuote.toFixed(2)}</h4>
        `;

        // Generate PDF
        const doc = new jsPDF();
        doc.text("Kinleys Blinds - Quote", 10, 10);
        doc.text(`Blind Type: ${blindType}`, 10, 20);
        doc.text(`Material: ${material}`, 10, 30);
        doc.text(`Color: ${color}`, 10, 40);
        doc.text(`Supplier Cost per m²: R${supplierPrice.toFixed(2)}`, 10, 50);
        doc.text(`Markup (50%): R${markup.toFixed(2)}`, 10, 60);
        doc.text(`Total Cost per m²: R${costPerUnit.toFixed(2)}`, 10, 70);
        doc.text(`Area: ${area / 10000} m²`, 10, 80);
        doc.text(`Final Quote: R${finalQuote.toFixed(2)}`, 10, 90);
        doc.save("quote.pdf");
    });
});
