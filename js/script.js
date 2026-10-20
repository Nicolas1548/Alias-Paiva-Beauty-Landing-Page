(function () {
  'use strict';

  /* ─────────────────────────────────────────────────
     1. WhatsApp links
     ───────────────────────────────────────────────── */
  var WA = 'https://api.whatsapp.com/send/?phone=553180142400&text=';
  var MSG = {
    agendar: 'Olá! Vim pelo site e quero agendar um horário \uD83D\uDC9C',
    curso: 'Olá! Vim pelo site e quero minha vaga no Curso VIP de Extensão de Cílios \uD83D\uDC9C',
    duvida: 'Olá! Vim pelo site e gostaria de tirar uma dúvida \uD83D\uDC9C'
  };

  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var key = a.getAttribute('data-msg') || 'agendar';
    var msgText = MSG[key] || MSG.agendar;
    a.href = WA + encodeURIComponent(msgText);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  /* ─────────────────────────────────────────────────
     0. Smooth Scroll com Lenis
     ───────────────────────────────────────────────── */
  var lenis = null;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2
    });

    function raf(time) {
      if (!document.hidden) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Suporte suave aos links âncora (#about, #services, etc.)
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href && href.length > 1) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            // Fecha o menu ANTES de rolar: com o menu aberto o Lenis
            // está parado (lenis.stop()) e ignoraria o scrollTo.
            if (mobileMenu && mobileMenu.classList.contains('open')) {
              closeMenu(false);
            }
            lenis.scrollTo(target, { offset: -70 });
          }
        }
      });
    });
  }

  /* ─────────────────────────────────────────────────
     2. Navbar — adiciona classe "scrolled" ao rolar
     ───────────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  /* ─────────────────────────────────────────────────
     3. Menu mobile
     ───────────────────────────────────────────────── */
  var hamBtn = document.getElementById('hamBtn');
  var closeBtn = document.getElementById('closeMenu');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu(restoreFocus) {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    if (restoreFocus !== false && hamBtn) hamBtn.focus();
  }

  /* ─────────────────────────────────────────────────
     Parallax suave no Hero e na seção Sobre
     ───────────────────────────────────────────────── */
  var heroBg = document.getElementById('heroBg');
  var heroContent = document.querySelector('.hero-content');
  var heroSection = document.getElementById('hero');
  var aboutSection = document.getElementById('about');
  var fcR = document.querySelector('.float-card.fc-r');
  var fcE = document.querySelector('.float-card.fc-e');
  var aboutImg = document.querySelector('.photo-placeholder img');

  var vh = window.innerHeight;
  var heroHeight = heroSection ? heroSection.offsetHeight : vh;

  function cacheDimensions() {
    vh = window.innerHeight;
    if (heroSection) {
      heroHeight = heroSection.offsetHeight || vh;
    }
  }

  window.addEventListener('resize', cacheDimensions, { passive: true });

  function updateParallax() {
    var scrollY = window.scrollY || window.pageYOffset || 0;

    // 1. Hero Parallax: imagem desliza e ganha zoom suave, conteúdo sobe com fade out
    if (heroSection && heroHeight > 0) {
      if (scrollY <= heroHeight + 50) {
        if (heroBg) {
          var bgY = scrollY * 0.32;
          var bgScale = 1 + (scrollY / heroHeight) * 0.07;
          heroBg.style.transform = 'translate3d(0, ' + bgY.toFixed(1) + 'px, 0) scale(' + bgScale.toFixed(3) + ')';
        }
        if (heroContent) {
          var contentY = scrollY * 0.18;
          var opacity = Math.max(0, 1 - (scrollY / (heroHeight * 0.72)));
          heroContent.style.transform = 'translate3d(0, ' + contentY.toFixed(1) + 'px, 0)';
          heroContent.style.opacity = opacity.toFixed(2);
        }
      } else {
        if (heroContent) heroContent.style.opacity = '0';
      }
    }

    // 2. Parallax Diferencial nos cards flutuantes da seção Sobre
    if (aboutSection) {
      var rect = aboutSection.getBoundingClientRect();
      if (rect.top < vh && rect.bottom > 0) {
        var centerOffset = (rect.top + rect.height / 2) - (vh / 2);
        var factor = centerOffset / vh;

        // Card superior (5.0 ★) sobe levemente mais rápido
        if (fcR) {
          var rY = factor * 32;
          fcR.style.transform = 'translate3d(0, ' + rY.toFixed(1) + 'px, 0)';
        }
        // Card inferior (+5 anos) flutua em sentido oposto
        if (fcE) {
          var eY = factor * -28;
          fcE.style.transform = 'translate3d(0, ' + eY.toFixed(1) + 'px, 0)';
        }
        // Foto com sutil profundidade interna
        if (aboutImg) {
          var imgY = factor * -12;
          var imgScale = 1.04 - Math.abs(factor) * 0.02;
          aboutImg.style.transform = 'translate3d(0, ' + imgY.toFixed(1) + 'px, 0) scale(' + imgScale.toFixed(3) + ')';
        }
      }
    }
  }

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 60);
    }
    if (!prefersReducedMotion) {
      updateParallax();
    }
  }

  if (lenis) {
    lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (!prefersReducedMotion) {
    cacheDimensions();
    updateParallax();
  }

  hamBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', function () { closeMenu(true); });

  // Fecha ao clicar em qualquer link dentro do menu
  mobileMenu.querySelectorAll('.menu-link, .btn').forEach(function (el) {
    el.addEventListener('click', function () { closeMenu(false); });
  });

  // Fecha com a tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu(true);
    }
  });

  /* ─────────────────────────────────────────────────
     4. Split-Text Mask Reveal & Scroll Reveal
     ───────────────────────────────────────────────── */
  var titles = document.querySelectorAll('.section-title, .course-left h2');
  if (!prefersReducedMotion) {
    titles.forEach(function (t) {
      if (t.dataset.split) return;
      t.dataset.split = 'true';
      var plainText = t.textContent.replace(/\s+/g, ' ').trim();
      if (plainText) {
        t.setAttribute('aria-label', plainText);
      }
      var lines = t.innerHTML.split(/<br\s*\/?>/i);
      if (lines.length > 1) {
        t.innerHTML = lines.map(function (line, i) {
          return '<span class="mask-line" aria-hidden="true"><span class="mask-inner" style="transition-delay:' + (i * 0.12) + 's">' + line.trim() + '</span></span>';
        }).join('');
      } else {
        t.innerHTML = '<span class="mask-line" aria-hidden="true"><span class="mask-inner">' + t.innerHTML.trim() + '</span></span>';
      }
    });
  }

  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) { observer.observe(el); });
    titles.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback para navegadores antigos ou prefers-reduced-motion
    reveals.forEach(function (el) { el.classList.add('visible'); });
    titles.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ─────────────────────────────────────────────────
     5. Galeria & Avaliações — Dots, Drag-to-Scroll e Efeito de Foco
     ───────────────────────────────────────────────── */
  var scroller = document.getElementById('galScroller');
  var tiles = scroller ? scroller.querySelectorAll('.gal-tile') : [];
  var hasMoved = false;

  function initHorizontalScroller(scrollerEl, dotsSelector, itemSelector, onDragStateChange) {
    if (!scrollerEl) return;
    var dotsList = document.querySelectorAll(dotsSelector);
    var items = scrollerEl.querySelectorAll(itemSelector);
    if (!dotsList.length || !items.length) return;

    var itemOffsets = [];
    var prevActiveDot = -1;

    function cacheItemOffsets() {
      var baseLeft = scrollerEl.offsetLeft;
      itemOffsets = [];
      items.forEach(function (item) {
        itemOffsets.push(item.offsetLeft - baseLeft);
      });
    }

    cacheItemOffsets();
    window.addEventListener('resize', cacheItemOffsets, { passive: true });

    function updateDots() {
      if (!itemOffsets.length) cacheItemOffsets();
      var scrollLeft = scrollerEl.scrollLeft;
      var active = 0;
      var minDiff = Infinity;
      for (var i = 0; i < itemOffsets.length; i++) {
        var diff = Math.abs(itemOffsets[i] - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          active = i;
        }
      }
      if (active === prevActiveDot) return;
      prevActiveDot = active;

      dotsList.forEach(function (dot, idx) {
        dot.classList.toggle('active', idx === active);
      });
      items.forEach(function (item, idx) {
        item.classList.toggle('is-centered', idx === active);
      });
    }

    scrollerEl.addEventListener('scroll', updateDots, { passive: true });
    updateDots();

    dotsList.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        if (items[i]) {
          if (!itemOffsets.length) cacheItemOffsets();
          scrollerEl.scrollTo({
            left: itemOffsets[i],
            behavior: 'smooth'
          });
        }
      });
    });

    // Arrasto com mouse (Drag & Momentum) para Desktop
    var isDragging = false;
    var startX, scrollLeftVal, cachedScrollerLeft = 0;

    scrollerEl.addEventListener('mousedown', function (e) {
      isDragging = true;
      if (onDragStateChange) onDragStateChange(false);
      cachedScrollerLeft = scrollerEl.offsetLeft;
      startX = e.pageX - cachedScrollerLeft;
      scrollLeftVal = scrollerEl.scrollLeft;
      scrollerEl.style.cursor = 'grabbing';
      scrollerEl.style.scrollBehavior = 'auto';
      scrollerEl.style.scrollSnapType = 'none';
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var x = e.pageX - cachedScrollerLeft;
      var walk = (x - startX) * 1.3;
      if (Math.abs(walk) > 4 && onDragStateChange) onDragStateChange(true);
      scrollerEl.scrollLeft = scrollLeftVal - walk;
    });

    window.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      scrollerEl.style.cursor = '';
      scrollerEl.style.scrollBehavior = 'smooth';
      scrollerEl.style.scrollSnapType = 'x mandatory';
      if (onDragStateChange) {
        setTimeout(function () { onDragStateChange(false); }, 80);
      }
    });

    // Rolagem horizontal natural com a roda do mouse
    scrollerEl.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollerEl.scrollLeft += e.deltaY * 0.9;
      }
    }, { passive: false });
  }

  initHorizontalScroller(scroller, '#scrollerDots .dot', '.gal-tile', function (moved) {
    hasMoved = moved;
  });

  var testiScroller = document.getElementById('testiScroller');
  initHorizontalScroller(testiScroller, '#testiDots .dot', '.testi-card', null);

  /* ─────────────────────────────────────────────────
     6. Curso VIP — Storytelling e Highlight com Scroll
     ───────────────────────────────────────────────── */
  var courseItems = document.querySelectorAll('.course-list li');
  var coursePills = document.querySelectorAll('.course-pills .c-pill');
  var courseCard = document.querySelector('.course-card');

  if (courseItems.length && coursePills.length && 'IntersectionObserver' in window) {
    var courseObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          courseItems.forEach(function (item) { item.classList.remove('active'); });
          entry.target.classList.add('active');

          var idx = Array.prototype.indexOf.call(courseItems, entry.target);
          coursePills.forEach(function (p, pi) {
            p.classList.toggle('active', pi === idx);
          });
          if (courseCard) {
            courseCard.classList.add('highlight');
          }
        }
      });
    }, {
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.15
    });

    courseItems.forEach(function (li) {
      courseObserver.observe(li);
    });
  }

  /* ─────────────────────────────────────────────────
     7. Lightbox da Galeria (abrir fotos em tela cheia)
     ───────────────────────────────────────────────── */
  var lightbox = document.getElementById('galLightbox');
  var lbImg = document.getElementById('lbImg');
  var lbCounter = document.getElementById('lbCounter');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var curIndex = 0;
  var lastFocusedTile = null;

  var galImages = [];
  tiles.forEach(function (tile, i) {
    var img = tile.querySelector('img');
    if (img) {
      galImages.push({
        src: img.src,
        alt: img.alt || ('Foto ' + (i + 1) + ' da galeria Alias Paiva Beauty')
      });
      tile.addEventListener('click', function () {
        if (!hasMoved) {
          lastFocusedTile = tile;
          openLightbox(i);
        }
      });
      tile.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          lastFocusedTile = tile;
          openLightbox(i);
        }
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
    if (lenis) lenis.stop();
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    if (lastFocusedTile) {
      lastFocusedTile.focus();
      lastFocusedTile = null;
    }
  }

  function showImage(index) {
    curIndex = (index + galImages.length) % galImages.length;
    if (lbImg) {
      lbImg.style.opacity = '0.3';
      lbImg.src = galImages[curIndex].src;
      lbImg.alt = galImages[curIndex].alt;
      lbImg.onload = function () {
        lbImg.style.opacity = '1';
      };
    }
    if (lbCounter) {
      lbCounter.textContent = (curIndex + 1) + ' / ' + galImages.length;
    }
  }

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', function (e) { e.stopPropagation(); showImage(curIndex - 1); });
  if (lbNext) lbNext.addEventListener('click', function (e) { e.stopPropagation(); showImage(curIndex + 1); });

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
     8. FAQ — fecha outros itens ao abrir um
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
