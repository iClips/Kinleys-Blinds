document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 0;

    const steps = document.querySelectorAll(".step");
    const stepContents = document.querySelectorAll(".step-content");

    const nextBtns = document.querySelectorAll(".next-btn");
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

    const blindTypes = [
        { name: "Roller", materials: ["Plastic", "Metal"], colors: ["White", "Black"] },
        { name: "Venetian", materials: ["Wood", "Metal"], colors: ["Oak", "Gray"] },
    ];

    // Populate blind types dynamically
    const blindTypesDiv = document.getElementById("blind-types");
    blindTypes.forEach((type) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${type.name}</h3>`;
        blindTypesDiv.appendChild(div);
    });

    const colorsDiv = document.getElementById("colors");
    blindTypes[0].colors.forEach((color) => {
        const div = document.createElement("div");
        div.innerText = color;
        colorsDiv.appendChild(div);
    });

    // Quote calculation
    const basePricePerSqUnit = 6.5;
    document.getElementById("download-pdf").addEventListener("click", () => {
        const width = parseFloat(document.getElementById("width").value);
        const height = parseFloat(document.getElementById("height").value);
        const area = width * height;
        const quote = area * basePricePerSqUnit;

        const doc = new jsPDF();
        doc.text(`Quote: R${quote.toFixed(2)}`, 10, 10);
        doc.save("quote.pdf");
    });
});
