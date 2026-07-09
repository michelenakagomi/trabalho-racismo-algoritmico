const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const promptCards = document.querySelectorAll('.prompt-card');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    promptCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

document.querySelectorAll('.image-compare img').forEach((img) => {
  img.addEventListener('click', () => {
    if (!modal || !modalImage || !modalCaption) return;
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    const cardTitle = img.closest('.prompt-card')?.querySelector('h3')?.textContent ?? 'Imagem gerada por IA';
    const platform = img.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
    modalCaption.textContent = `${cardTitle} • ${platform}`;
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    }
  });
});

if (modalClose && modal) {
  modalClose.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {
      // O site continua funcionando normalmente sem service worker.
    });
  });
}
