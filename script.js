document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const bookingForm = document.getElementById('booking-form');
    const selectedDateElem = document.getElementById('selected-date');
    const onlineBtn = document.getElementById('online-btn');
    const physicalBtn = document.getElementById('physical-btn');
    const timeSlot = document.getElementById('time-slot');
    const emailLink = document.getElementById('email-link');
    let selectedDate = null;

    const disableDays = [5, 6];  // Friday and Saturday (5 = Friday, 6 = Saturday)

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    // Generate calendar for a specific month
    const generateCalendar = (month) => {
        calendar.innerHTML = ''; // Clear the previous month
        const daysInMonth = new Date(currentYear, month + 1, 0).getDate();  // Get the total days in the selected month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentYear, month, i);
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;

            // Disable past days, Fridays, and Saturdays
            if (disableDays.includes(date.getDay()) || (month === currentMonth && i < currentDate)) {
                day.classList.add('disabled');
            }

            day.addEventListener('click', () => {
                if (!day.classList.contains('disabled')) {
                    selectedDate = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                    selectedDateElem.textContent = `Selected Date: ${selectedDate}`;
                    bookingForm.classList.remove('hidden');
                }
            });

            calendar.appendChild(day);
        }
    };

    // Initialize the month tabs
    const monthButtons = document.getElementsByClassName('month-btn');
    for (let btn of monthButtons) {
        btn.addEventListener('click', function () {
            const selectedMonth = parseInt(this.getAttribute('data-month'));
            if (selectedMonth >= currentMonth) {
                generateCalendar(selectedMonth);
            } else {
                calendar.innerHTML = `<p style="color:red;">Cannot select past months!</p>`;
            }
        });
    }

    // Book an online meeting
    onlineBtn.addEventListener('click', () => {
        if (selectedDate) {
            bookMeeting('Online Meeting');
        }
    });

    // Book a physical meeting
    physicalBtn.addEventListener('click', () => {
        if (selectedDate) {
            bookMeeting('Physical Meeting');
        }
    });

    // Function to handle meeting booking
    const bookMeeting = (meetingType) => {
        const dayDivs = calendar.getElementsByClassName('day');
        for (let dayDiv of dayDivs) {
            if (dayDiv.textContent === selectedDate.split('-')[2]) {
                dayDiv.classList.add('booked');
                bookingForm.classList.add('hidden');
                
                // Show email link and populate it with mailto data
                emailLink.classList.remove('hidden');
                emailLink.href = `mailto:bassem@grandsolution.net?subject=${meetingType} Request on ${selectedDate}&body=I would like to request a ${meetingType.toLowerCase()} on ${selectedDate} at ${timeSlot.value}.`;
            }
        }
    };
});