document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const stamp = document.getElementById('stamp');
    const optionBoxes = document.querySelectorAll('.option-box');
    const pages = document.querySelectorAll('.page');
    const closeBtn = document.getElementById('close-btn');
    const popupContainer = document.getElementById('popup-container');
    const popupCloseBtn = document.getElementById('popup-close-btn');

    // Open envelope when clicking the stamp
    stamp.addEventListener('click', () => {
        envelope.classList.add('open');
    });

    // Close envelope when clicking the close button
    closeBtn.addEventListener('click', () => {
        envelope.classList.remove('open');
    });

    // Handle option box clicks
    optionBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Remove active class from all pages
            pages.forEach(p => p.classList.remove('active'));

            // Find and show the target page
            const targetId = box.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Show popup
            popupContainer.classList.add('active');
        });
    });

    // Close popup
    popupCloseBtn.addEventListener('click', () => {
        popupContainer.classList.remove('active');
    });
});
