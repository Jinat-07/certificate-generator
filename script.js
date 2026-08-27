// Get DOM elements
const nameInput = document.getElementById('nameInput');
const dateInput = document.getElementById('dateInput');
const displayName = document.getElementById('displayName');
const displayDate = document.getElementById('displayDate');
const downloadBtn = document.getElementById('downloadBtn');
const certificateBox = document.getElementById('certificateBox');

// Update preview live as you type
nameInput.addEventListener('input', (e) => {
    displayName.textContent = e.target.value || 'Student Name';
});

dateInput.addEventListener('input', (e) => {
    displayDate.textContent = e.target.value || 'August 27, 2026';
});

// Download logic
downloadBtn.addEventListener('click', () => {
    // Prevent downloading empty certificates
    if (!nameInput.value) {
        alert("Please enter a student name first!");
        return;
    }

    // Change button text while processing
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = "Generating...";
    downloadBtn.disabled = true;

    // Use html2canvas to take a snapshot of the certificate div
    html2canvas(certificateBox, {
        scale: 2, // High resolution
        useCORS: true // Allows loading external fonts/images
    }).then(canvas => {
        // Create an image and a fake link to trigger download
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        
        // Clean up the file name (e.g., "John_Doe_Certificate.png")
        const fileName = `${nameInput.value.replace(/\s+/g, "_")}_Certificate.png`;
        
        link.download = fileName;
        link.href = image;
        link.click();

        // Reset button
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error("Error generating certificate:", err);
        alert("Something went wrong while generating the certificate.");
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    });
});
