document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const stamp = document.getElementById('stamp');
    const envelopeTitle = document.querySelector('.envelope-title'); // Add reference to envelope title
    const optionBoxes = document.querySelectorAll('.option-box');
    const pages = document.querySelectorAll('.page');
    const closeBtn = document.getElementById('close-btn');
    const popupContainer = document.getElementById('popup-container');
    const popupCloseBtn = document.getElementById('popup-close-btn');
    const rsvpForm = document.getElementById('rsvp-form');
    const plusOneToggle = document.getElementById('plus-one-toggle');
    const plusOneRow = document.getElementById('plus-one-row');
    const plusOneInput = document.getElementById('plus-one-name');

    // The Email Address to receive RSVP confirmations
    const RSVP_EMAIL = 'j.elghorab@gmail.com';

    // Open envelope when clicking the stamp
    stamp.addEventListener('click', () => {
        envelope.classList.add('open');
    });

    // Open envelope when clicking the title
    if (envelopeTitle) {
        envelopeTitle.addEventListener('click', () => {
            envelope.classList.add('open');
        });
    }

    // Close envelope when clicking the close button
    closeBtn.addEventListener('click', () => {
        envelope.classList.remove('open');
        popupContainer.classList.remove('active');
        document.querySelector('.letter-content').classList.remove('popup-active');
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

            // Hide scrollbar if countdown to prevent the gold scrollbar from appearing
            const pagesContainer = document.querySelector('.pages');
            if (targetId === 'countdown') {
                pagesContainer.style.overflow = 'hidden';
            } else {
                pagesContainer.style.overflow = '';
            }

            // Show popup
            popupContainer.classList.add('active');
            document.querySelector('.letter-content').classList.add('popup-active');
        });
    });

    // Close popup
    popupCloseBtn.addEventListener('click', () => {
        popupContainer.classList.remove('active');
        document.querySelector('.letter-content').classList.remove('popup-active');
    });

    // Show or hide the plus one input
    plusOneToggle.addEventListener('change', () => {
        plusOneRow.classList.toggle('hidden', !plusOneToggle.checked);
        if (!plusOneToggle.checked) {
            plusOneInput.value = '';
        }
    });

    // Submit RSVP form
    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const guestName = document.getElementById('guest-name').value.trim();
        const plusOneName = plusOneInput.value.trim();

        if (!guestName) {
            alert('Please enter your name before sending your RSVP.');
            return;
        }

        if (!RSVP_EMAIL || RSVP_EMAIL === 'your-email@gmail.com') {
            alert('Please update the RSVP_EMAIL value inside script.js with your Gmail address.');
            return;
        }

        const plusOneText = plusOneName ? plusOneName : (plusOneToggle.checked ? 'Yes' : 'No');
        const subject = encodeURIComponent('Wedding RSVP Confirmation');
        let bodyText = `Someone confirmed coming to your wedding!!\n\nName: ${guestName}`;
        bodyText += plusOneName ? `\nPlus one: ${plusOneName}` : (plusOneToggle.checked ? '\nPlus one: Yes' : '\nPlus one: No');
        const mailtoLink = `mailto:${RSVP_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
        window.location.href = mailtoLink;
        popupContainer.classList.remove('active');
    });

    // Countdown Timer Logic
    const targetDate = new Date('August 15, 2026 00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / (1000));

            const daysEl = document.getElementById('cd-days');
            if (daysEl) {
                daysEl.innerText = days < 10 ? '0' + days : days;
                document.getElementById('cd-hours').innerText = hours < 10 ? '0' + hours : hours;
                document.getElementById('cd-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
                document.getElementById('cd-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
            }
        } else {
            // Target date has passed
            const daysEl = document.getElementById('cd-days');
            if (daysEl) {
                daysEl.innerText = "00";
                document.getElementById('cd-hours').innerText = "00";
                document.getElementById('cd-minutes').innerText = "00";
                document.getElementById('cd-seconds').innerText = "00";
            }
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // initial call
});