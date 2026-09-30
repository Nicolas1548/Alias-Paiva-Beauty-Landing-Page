/* =====================================================
   Alias Paiva Beauty — script.js
   Protótipo 3: Hero tela cheia + cartões
   ===================================================== */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     1. WhatsApp links
     ───────────────────────────────────────────────── */
  var WA  = 'https://api.whatsapp.com/send/?phone=553180142400&text=';
  var MSG = {
    agendar : 'Olá! Vim pelo site e quero agendar um horário \uD83D\uDC9C',
    curso   : 'Olá! Vim pelo site e quero minha vaga no Curso VIP de Extensão de Cílios \uD83D\uDC9C'
  };

  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var key  = a.getAttribute('data-msg') || 'agendar';
    a.href   = WA + encodeURIComponent(MSG[key]);
    a.target = '_blank';
    a.rel    = 'noopener';
  });

  /* ─────────────────────────────────────────────────
     2. Navbar — adiciona classe "scrolled" ao rolar
     ───────────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ─────────────────────────────────────────────────
     3. Menu mobile
     ───────────────────────────────────────────────── */
  var hamBtn     = document.getElementById('hamBtn');
  var closeBtn   = document.getElementById('closeMenu');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Fecha ao clicar em qualquer link dentro do menu
  mobileMenu.querySelectorAll('.menu-link, .btn').forEach(function (el) {
    el.addEventListener('click', closeMenu);
  });

  // Fecha com a tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  /* ─────────────────────────────────────────────────
     4. Scroll Reveal com IntersectionObserver
     ───────────────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold  : 0.12,
      rootMargin : '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback para navegadores antigos
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ─────────────────────────────────────────────────
     5. Galeria — dots de navegação
     ───────────────────────────────────────────────── */
  var scroller = document.getElementById('galScroller');
  var dots     = document.querySelectorAll('#scrollerDots .dot');
  var tiles    = scroller ? scroller.querySelectorAll('.gal-tile') : [];

  if (scroller && dots.length) {

    function updateDots() {
      var scrollLeft = scroller.scrollLeft;
      var active = 0;
      var minDiff = Infinity;
      tiles.forEach(function (tile, i) {
        var diff = Math.abs((tile.offsetLeft - scroller.offsetLeft) - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          active = i;
        }
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === active);
      });
    }

    scroller.addEventListener('scroll', updateDots, { passive: true });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        if (tiles[i]) {
          scroller.scrollTo({
            left: tiles[i].offsetLeft - scroller.offsetLeft,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────
     6. Lightbox da Galeria (abrir fotos em tela cheia)
     ───────────────────────────────────────────────── */
  var lightbox  = document.getElementById('galLightbox');
  var lbImg     = document.getElementById('lbImg');
  var lbCounter = document.getElementById('lbCounter');
  var lbClose   = document.getElementById('lbClose');
  var lbPrev    = document.getElementById('lbPrev');
  var lbNext    = document.getElementById('lbNext');
  var curIndex  = 0;

  var galImages = [];
  tiles.forEach(function (tile, i) {
    var img = tile.querySelector('img');
    if (img) {
      galImages.push(img.src);
      tile.style.cursor = 'zoom-in';
      tile.addEventListener('click', function () {
        openLightbox(i);
      });
    }
  });

  function openLightbox(index) {
    if (!lightbox || !galImages.length) return;
    curIndex = (index + galImages.length) % galImages.length;
    showImage(curIndex);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    curIndex = (index + galImages.length) % galImages.length;
    if (lbImg) {
      lbImg.style.opacity = '0.3';
      lbImg.src = galImages[curIndex];
      lbImg.onload = function () {
        lbImg.style.opacity = '1';
      };
    }
    if (lbCounter) {
      lbCounter.textContent = (curIndex + 1) + ' / ' + galImages.length;
    }
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev)  lbPrev.addEventListener('click', function (e) { e.stopPropagation(); showImage(curIndex - 1); });
  if (lbNext)  lbNext.addEventListener('click', function (e) { e.stopPropagation(); showImage(curIndex + 1); });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.id === 'lbContent') {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(curIndex - 1);
    if (e.key === 'ArrowRight') showImage(curIndex + 1);
  });

  // Touch swipe para celulares
  var touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      var touchEndX = e.changedTouches[0].screenX;
      var diffX = touchEndX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) showImage(curIndex + 1);
        else showImage(curIndex - 1);
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────────
     7. FAQ — fecha outros itens ao abrir um
     ───────────────────────────────────────────────── */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

})();
