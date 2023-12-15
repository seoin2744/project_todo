// index.js
let date = new Date();

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    const dates = prevDates.concat(thisDates, nextDates);
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    const datesContainer = document.querySelector('.dates');
    datesContainer.innerHTML = ''; // Clear previous dates

    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1
            ? 'this'
            : 'other';

        const dateElement = document.createElement('div');
        dateElement.className = `date ${condition}`;
        dateElement.textContent = date;

        if (condition === 'this') {
            const today = new Date();
            if (viewMonth === today.getMonth() && viewYear === today.getFullYear() && +date === today.getDate()) {
                dateElement.classList.add('today');
            }
        }

        datesContainer.appendChild(dateElement);
    });
};

renderCalendar();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};
