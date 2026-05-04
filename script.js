document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const stamp = document.getElementById('stamp');
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const closeBtn = document.getElementById('close-btn');

    // Open envelope when clicking the stamp
    stamp.addEventListener('click', () => {
        envelope.classList.add('open');
    });

    // Close envelope when clicking the close button
    closeBtn.addEventListener('click', () => {
        envelope.classList.remove('open');
    });

    // Handle tab navigation within the letter
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and pages
            navButtons.forEach(b => b.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Find and show the target page
            const targetId = btn.getAttribute('data-target');
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });
});
