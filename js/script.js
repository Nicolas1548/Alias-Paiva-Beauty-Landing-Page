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
      lenis.raf(time);
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
            lenis.scrollTo(target, { offset: -70 });
            if (mobileMenu && mobileMenu.classList.contains('open')) {
              closeMenu();
            }
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
  var hamBtn     = document.getElementById('hamBtn');
  var closeBtn   = document.getElementById('closeMenu');
  var mobileMenu = document.getElementById('mobileMenu');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  /* ─────────────────────────────────────────────────
     Parallax suave no Hero e na seção Sobre
     ───────────────────────────────────────────────── */
  var heroBg       = document.getElementById('heroBg');
  var heroContent  = document.querySelector('.hero-content');
  var heroSection  = document.getElementById('hero');
  var aboutSection = document.getElementById('about');
  var fcR          = document.querySelector('.float-card.fc-r');
  var fcE          = document.querySelector('.float-card.fc-e');
  var aboutImg     = document.querySelector('.photo-placeholder img');

  function updateParallax() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var vh = window.innerHeight;

    // 1. Hero Parallax: imagem desliza e ganha zoom suave, conteúdo sobe com fade out
    if (heroSection) {
      var heroHeight = heroSection.offsetHeight;
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
          var imgScale = 1.03 - Math.abs(factor) * 0.03;
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
    updateParallax();
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
     4. Split-Text Mask Reveal & Scroll Reveal
     ───────────────────────────────────────────────── */
  var titles = document.querySelectorAll('.section-title, .course-left h2');
  titles.forEach(function (t) {
    if (t.dataset.split) return;
    t.dataset.split = 'true';
    var lines = t.innerHTML.split(/<br\s*\/?>/i);
    if (lines.length > 1) {
      t.innerHTML = lines.map(function (line, i) {
        return '<span class="mask-line"><span class="mask-inner" style="transition-delay:' + (i * 0.12) + 's">' + line.trim() + '</span></span>';
      }).join('');
    } else {
      t.innerHTML = '<span class="mask-line"><span class="mask-inner">' + t.innerHTML.trim() + '</span></span>';
    }
  });

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
    titles.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback para navegadores antigos
    reveals.forEach(function (el) { el.classList.add('visible'); });
    titles.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ─────────────────────────────────────────────────
     5. Galeria — Dots, Drag-to-Scroll e Efeito de Foco
     ───────────────────────────────────────────────── */
  var scroller = document.getElementById('galScroller');
  var dots     = document.querySelectorAll('#scrollerDots .dot');
  var tiles    = scroller ? scroller.querySelectorAll('.gal-tile') : [];
  var hasMoved = false;

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
      tiles.forEach(function (tile, i) {
        tile.classList.toggle('is-centered', i === active);
      });
    }

    scroller.addEventListener('scroll', updateDots, { passive: true });
    updateDots();

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

    // Arrasto com mouse (Drag & Momentum) para Desktop
    var isDragging = false;
    var startX, scrollLeftVal;

    scroller.addEventListener('mousedown', function (e) {
      isDragging = true;
      hasMoved = false;
      startX = e.pageX - scroller.offsetLeft;
      scrollLeftVal = scroller.scrollLeft;
      scroller.style.cursor = 'grabbing';
      scroller.style.scrollBehavior = 'auto';
      scroller.style.scrollSnapType = 'none';
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      var x = e.pageX - scroller.offsetLeft;
      var walk = (x - startX) * 1.3;
      if (Math.abs(walk) > 4) hasMoved = true;
      scroller.scrollLeft = scrollLeftVal - walk;
    });

    window.addEventListener('mouseup', function () {
      if (!isDragging) return;
      isDragging = false;
      scroller.style.cursor = 'grab';
      scroller.style.scrollBehavior = 'smooth';
      scroller.style.scrollSnapType = 'x mandatory';
      setTimeout(function () { hasMoved = false; }, 80);
    });

    // Rolagem horizontal natural com a roda do mouse sobre a galeria
    scroller.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scroller.scrollLeft += e.deltaY * 0.9;
      }
    }, { passive: false });
  }

  /* ─────────────────────────────────────────────────
     6. Curso VIP — Storytelling e Highlight com Scroll
     ───────────────────────────────────────────────── */
  var courseItems = document.querySelectorAll('.course-list li');
  var coursePills = document.querySelectorAll('.course-pills .c-pill');
  var courseCard  = document.querySelector('.course-card');

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
      tile.addEventListener('click', function () {
        if (!hasMoved) {
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
