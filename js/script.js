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
