const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');
const header = document.querySelector('[data-header]');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 80);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelector('[data-year]').textContent = new Date().getFullYear();

const scheduleList = document.querySelector('[data-schedule-list]');

const formatWorkshopDate = (date) => {
  const value = new Date(`${date}T12:00:00`);
  return {
    month: new Intl.DateTimeFormat('en', { month: 'long' }).format(value),
    day: new Intl.DateTimeFormat('en', { day: 'numeric' }).format(value),
    weekday: new Intl.DateTimeFormat('en', { weekday: 'long' }).format(value),
  };
};

const formatWorkshopTime = (date, time) => new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
}).format(new Date(`${date}T${time}:00`));

const renderSchedule = () => {
  if (!scheduleList) return;

  const schedule = window.WORKSHOP_SCHEDULE ?? [];
  scheduleList.replaceChildren(...schedule.map(({ date, slots }) => {
    const formattedDate = formatWorkshopDate(date);
    const article = document.createElement('article');
    article.className = 'schedule-day';

    const dateBlock = document.createElement('div');
    dateBlock.className = 'schedule-date';
    const dateTime = document.createElement('time');
    dateTime.dateTime = date;
    dateTime.innerHTML = `<span>${formattedDate.month}</span><strong>${formattedDate.day}</strong><small>${formattedDate.weekday}</small>`;
    dateBlock.append(dateTime);

    const slotList = document.createElement('ul');
    slots.forEach(({ time, spots }) => {
      const item = document.createElement('li');
      const slotTime = document.createElement('time');
      slotTime.dateTime = `${date}T${time}`;
      slotTime.textContent = formatWorkshopTime(date, time);
      const availability = document.createElement('strong');
      availability.textContent = spots === 1 ? '1 spot remaining' : `${spots} spots remaining`;
      item.append(slotTime, availability);
      slotList.append(item);
    });

    article.append(dateBlock, slotList);
    return article;
  }));
};

renderSchedule();
