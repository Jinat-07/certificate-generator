const nameInput = document.getElementById('nameInput');
const dateInput = document.getElementById('dateInput');
const displayName = document.getElementById('displayName');
const displayDate = document.getElementById('displayDate');
const downloadBtn = document.getElementById('downloadBtn');
const certificateBox = document.getElementById('certificateBox');

nameInput.addEventListener('input', (e) => {
    displayName.textContent = e.target.value || 'Participant Name';
});

dateInput.addEventListener('input', (e) => {
    displayDate.textContent = e.target.value || '5th September 2026';
});

downloadBtn.addEventListener('click', () => {
    if (!nameInput.value) {
        alert("Please enter a participant name first!");
        return;
    }

    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = "Generating...";
    downloadBtn.disabled = true;

    html2canvas(certificateBox, {
        scale: 2, 
        useCORS: true 
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        
        const fileName = `${nameInput.value.replace(/\s+/g, "_")}_Workshop_Certificate.png`;
        
        link.download = fileName;
        link.href = image;
        link.click();

        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    }).catch(err => {
        console.error("Error generating certificate:", err);
        alert("Something went wrong while generating the certificate.");
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
    });
});
