// Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .lash-divider').forEach((el) => observer.observe(el));

// Lightbox Modal Implementation
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

if (lightbox && galleryItems.length > 0) {
  const galleryData = galleryItems.map((item) => {
    const img = item.querySelector('img');
    return {
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : '',
      element: item
    };
  });

  let currentIndex = 0;
  let lastFocusedItem = null;

  function preloadImage(src) {
    if (!src) return;
    const img = new Image();
    img.src = src;
  }

  function renderLightbox(index) {
    currentIndex = (index + galleryData.length) % galleryData.length;
    const current = galleryData[currentIndex];

    lightboxImg.classList.add('switching');

    // Atualiza imagem e contador
    setTimeout(() => {
      lightboxImg.src = current.src;
      lightboxImg.alt = current.alt;
      lightboxCounter.textContent = `${currentIndex + 1} / ${galleryData.length}`;
      lightboxImg.classList.remove('switching');
    }, 90);

    // Pré-carrega as imagens adjacente para navegação instantânea
    const nextIndex = (currentIndex + 1) % galleryData.length;
    const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    preloadImage(galleryData[nextIndex].src);
    preloadImage(galleryData[prevIndex].src);
  }

  function openLightbox(index) {
    lastFocusedItem = document.activeElement;
    renderLightbox(index);

    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    } else {
      lightbox.setAttribute('open', '');
    }

    document.body.classList.add('lightbox-open');
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (typeof lightbox.close === 'function') {
      lightbox.close();
    } else {
      lightbox.removeAttribute('open');
    }
    document.body.classList.remove('lightbox-open');

    if (lastFocusedItem && typeof lastFocusedItem.focus === 'function') {
      lastFocusedItem.focus();
    }
  }

  // Eventos de clique e acessibilidade nos itens da galeria
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  // Botões do Lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLightbox(currentIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      renderLightbox(currentIndex + 1);
    });
  }

  // Navegação por teclado global
  window.addEventListener('keydown', (e) => {
    if (!lightbox.open) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      renderLightbox(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      renderLightbox(currentIndex - 1);
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Fecha ao clicar fora do conteúdo (backdrop click)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
  });

  // Suporte a gestos touch (Swipe) em dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Apenas considera swipe horizontal se a variação for maior que o movimento vertical
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        renderLightbox(currentIndex + 1); // deslizar para esquerda -> próxima
      } else {
        renderLightbox(currentIndex - 1); // deslizar para direita -> anterior
      }
    }
  }, { passive: true });
}
