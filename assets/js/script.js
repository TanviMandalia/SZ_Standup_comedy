/* ============================================================
   SAURABH ZINZUVADIYA — COMEDIAN PORTFOLIO
   script.js — Interactions, Animations & Data
   ============================================================ */

/* ── DATA: VIDEOS ───────────────────────────────────────── */
const videosData = [
  {
    id: 1,
    title: "Opening Night — The Absurdity Special",
    platform: "youtube",
    platformLabel: "YouTube",
    thumbnail: "assets/images/video_thumb_1.jpg",
    youtubeId: "dQw4w9WgXcQ", // Replace with real YouTube ID
    desc: "Full opening set from Saurabh's debut solo special.",
    duration: "18 min"
  },
  {
    id: 2,
    title: "Live at The Laugh Factory — Sold Out Show",
    platform: "youtube",
    platformLabel: "YouTube",
    thumbnail: "assets/images/video_thumb_2.jpg",
    youtubeId: "dQw4w9WgXcQ", // Replace with real YouTube ID
    desc: "Highlights from a packed sold-out evening at The Laugh Factory.",
    duration: "12 min"
  },
  {
    id: 3,
    title: "Reel: Everyday Observations",
    platform: "instagram",
    platformLabel: "Instagram",
    thumbnail: "assets/images/video_thumb_3.jpg",
    youtubeId: null, // Instagram reels use external link
    externalUrl: "https://www.instagram.com/funnysaurabh/", // Replace with real reel URL
    desc: "Quick-fire observations from daily life — all true, all painful.",
    duration: "2 min"
  }
];

/* ── DATA: SHOWS ────────────────────────────────────────── */
// 🔴 IMPORTANT: Replace with real event details before publishing.
const showsData = [
  {
    id: 1,
    name: "The Overthinking Hour",
    date: "[SAMPLE DATE]",
    day: "TBD",
    month: "TBD",
    venue: "[Sample Venue Name]",
    city: "[City, State]",
    time: "8:00 PM",
    status: "upcoming",
    image: "assets/images/show_banner.jpg",
    ticketUrl: "#booking-coming-soon"
  },
  {
    id: 2,
    name: "Saurabh Live: The India Tour",
    date: "[SAMPLE DATE]",
    day: "TBD",
    month: "TBD",
    venue: "[Sample Venue Name]",
    city: "[City, State]",
    time: "7:30 PM",
    status: "upcoming",
    image: "assets/images/show_banner.jpg",
    ticketUrl: "#booking-coming-soon"
  },
  {
    id: 3,
    name: "Late Night Laughs — Special Edition",
    date: "[SAMPLE DATE]",
    day: "TBD",
    month: "TBD",
    venue: "[Sample Venue Name]",
    city: "[City, State]",
    time: "9:00 PM",
    status: "upcoming",
    image: "assets/images/show_banner.jpg",
    ticketUrl: "#booking-coming-soon"
  },
  {
    id: 4,
    name: "The First Laugh — Debut Show",
    date: "[PAST EVENT]",
    day: "01",
    month: "JAN",
    venue: "[Past Venue]",
    city: "[City, State]",
    time: "7:00 PM",
    status: "past",
    image: "assets/images/show_banner.jpg",
    ticketUrl: null
  }
];

/* ── DATA: TOUR DATES ───────────────────────────────────── */
// 🔴 IMPORTANT: Replace with real tour details before publishing.
const tourDates = [
  { day: "TBD", month: "—", city: "[City Name]", venue: "[Venue Placeholder]", status: "upcoming" },
  { day: "TBD", month: "—", city: "[City Name]", venue: "[Venue Placeholder]", status: "upcoming" },
  { day: "TBD", month: "—", city: "[City Name]", venue: "[Venue Placeholder]", status: "upcoming" },
  { day: "TBD", month: "—", city: "[City Name]", venue: "[Venue Placeholder]", status: "upcoming" },
  { day: "TBD", month: "—", city: "[City Name]", venue: "[Venue Placeholder]", status: "upcoming" }
];

/* ── DATA: INSTAGRAM GRID (PLACEHOLDER IMAGES) ─────────── */
const instaImages = [
  "assets/images/video_thumb_1.jpg",
  "assets/images/about.jpg",
  "assets/images/hero.jpg",
  "assets/images/video_thumb_2.jpg",
  "assets/images/show_banner.jpg",
  "assets/images/video_thumb_3.jpg",
  "assets/images/tour_artwork.jpg",
  "assets/images/video_thumb_1.jpg",
  "assets/images/about.jpg",
  "assets/images/video_thumb_2.jpg",
  "assets/images/hero.jpg",
  "assets/images/show_banner.jpg"
];

/* ══════════════════════════════════════════════════════════
   INIT — Wait for DOM
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  buildVideosGrid();
  buildShowsGrid();
  buildTourDates();
  buildInstaGrid();
  initNavbar();
  initMobileMenu();
  initHeroAnimations();
  initVideoModal();
  initShowsFilter();
  initContactForm();
  initScrollReveal();
  initSmoothScroll();
});

/* ── BUILD: VIDEOS GRID ─────────────────────────────────── */
function buildVideosGrid() {
  const grid = document.getElementById('videosGrid');
  if (!grid) return;

  grid.innerHTML = videosData.map(v => `
    <div class="video-card stagger-item" data-video-id="${v.id}" role="button" tabindex="0" aria-label="Play ${v.title}">
      <div class="video-thumb">
        <img src="${v.thumbnail}" alt="${v.title}" loading="lazy" width="480" height="270">
        <div class="video-thumb-overlay"></div>
        <div class="video-play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <span class="video-platform platform-${v.platform}">${v.platformLabel}</span>
      </div>
      <div class="video-info">
        <p class="video-title">${v.title}</p>
        <p class="video-meta">${v.duration} &nbsp;·&nbsp; ${v.platformLabel}</p>
      </div>
    </div>
  `).join('');

  // Attach click + keyboard events
  grid.querySelectorAll('.video-card').forEach(card => {
    const id = parseInt(card.dataset.videoId);
    const open = () => openVideoModal(id);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

/* ── BUILD: SHOWS GRID ──────────────────────────────────── */
function buildShowsGrid() {
  const grid = document.getElementById('showsGrid');
  if (!grid) return;

  grid.innerHTML = showsData.map(s => `
    <article class="show-card stagger-item" data-status="${s.status}">
      <div class="show-card-img">
        <span class="show-status-badge badge-${s.status}">${s.status === 'upcoming' ? '▶ Upcoming' : '✓ Past Show'}</span>
        <img src="${s.image}" alt="${s.name}" loading="lazy">
      </div>
      <div class="show-card-body">
        <div class="show-date-row">
          <div class="show-date-block">
            <span class="show-date-day">${s.day}</span>
            <span class="show-date-mon">${s.month}</span>
          </div>
          <h3 class="show-name">${s.name}</h3>
        </div>
        <div class="show-meta">
          <span class="show-meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${s.venue} · ${s.city}
          </span>
          <span class="show-meta-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${s.time}
          </span>
        </div>
        <div class="show-card-actions">
          ${s.status === 'upcoming'
            ? `<a href="${s.ticketUrl}" class="btn-red" id="ticket-${s.id}" aria-label="Get tickets for ${s.name}">🎟 Booking Coming Soon</a>
               <a href="#contact" class="btn-ghost">Enquire</a>`
            : `<button class="btn-ghost" disabled>View Highlights</button>`
          }
        </div>
      </div>
    </article>
  `).join('');
}

/* ── BUILD: TOUR DATES ──────────────────────────────────── */
function buildTourDates() {
  const list = document.getElementById('tourDatesList');
  if (!list) return;

  list.innerHTML = tourDates.map(t => `
    <div class="tour-date-item stagger-item">
      <div class="tour-date-box">
        <span class="tour-date-num">${t.day}</span>
        <span class="tour-date-mo">${t.month}</span>
      </div>
      <div>
        <p class="tour-city">${t.city}</p>
        <p class="tour-venue">${t.venue}</p>
      </div>
      <a href="#contact" class="btn-ghost" aria-label="Enquire about ${t.city} show">Enquire</a>
    </div>
  `).join('');
}

/* ── BUILD: INSTAGRAM GRID ──────────────────────────────── */
function buildInstaGrid() {
  const grid = document.getElementById('instaGrid');
  if (!grid) return;

  grid.innerHTML = instaImages.map((src, i) => `
    <a href="https://www.instagram.com/funnysaurabh/" target="_blank" rel="noopener noreferrer"
       class="insta-item stagger-item" aria-label="View Instagram post ${i + 1}">
      <img src="${src}" alt="Instagram post ${i + 1}" loading="lazy">
      <div class="insta-item-overlay">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      </div>
    </a>
  `).join('');
}

/* ── NAVBAR ─────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── MOBILE MENU ─────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  if (!hamburger || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}

/* ── HERO ANIMATIONS ─────────────────────────────────────── */
function initHeroAnimations() {
  // Use GSAP if available, else CSS transitions
  const headline = document.querySelectorAll('.hero-headline .line-inner');
  const artistName = document.querySelector('.hero-artist-name');
  const heroSub = document.querySelector('.hero-sub');
  const heroCtas = document.querySelector('.hero-ctas');
  const heroImg = document.querySelector('.hero-img-wrap img');

  if (typeof gsap !== 'undefined') {
    // GSAP timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(heroImg, { scale: 1.12, opacity: 0, duration: 1.8, ease: 'power3.out' }, 0)
      .to(headline, { y: '0%', duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.2)
      .to(artistName, { opacity: 1, y: 0, duration: 0.8 }, 1.1)
      .to(heroSub, { opacity: 1, y: 0, duration: 0.8 }, 1.3)
      .to(heroCtas, { opacity: 1, y: 0, duration: 0.8 }, 1.55);

  } else {
    // Fallback: CSS transitions
    headline.forEach((el, i) => {
      setTimeout(() => { el.style.transform = 'translateY(0)'; }, 200 + i * 130);
    });
    setTimeout(() => artistName && artistName.classList.add('show'), 1400);
    setTimeout(() => heroSub && heroSub.classList.add('show'), 1700);
    setTimeout(() => heroCtas && heroCtas.classList.add('show'), 2000);
  }
}

/* ── VIDEO MODAL ─────────────────────────────────────────── */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const modalClose = document.getElementById('modalClose');
  const iframeWrap = document.getElementById('modalIframe');

  if (!modal) return;

  window.openVideoModal = function(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (!video) return;

    // Update modal info
    const titleEl = document.getElementById('modalVideoTitle');
    const descEl  = document.getElementById('modalVideoDesc');
    if (titleEl) titleEl.textContent = video.title;
    if (descEl)  descEl.textContent  = video.desc;

    // Handle YouTube vs Instagram
    if (video.youtubeId) {
      iframeWrap.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="${video.title}"
      ></iframe>`;
    } else if (video.externalUrl) {
      // Redirect for Instagram reels
      window.open(video.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (modalClose) modalClose.focus();
  };

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (iframeWrap) iframeWrap.innerHTML = '';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ── SHOWS FILTER ────────────────────────────────────────── */
function initShowsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards  = document.querySelectorAll('.show-card');

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.status === filter) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── CONTACT FORM ────────────────────────────────────────── */
function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Clear previous feedback
    if (feedback) feedback.className = 'form-feedback';
    clearFieldErrors();

    // Validate
    const name    = form.querySelector('#fieldName');
    const email   = form.querySelector('#fieldEmail');
    const message = form.querySelector('#fieldMessage');
    let valid = true;

    if (!name || name.value.trim().length < 2) {
      showFieldError('errorName', 'Please enter your name.');
      valid = false;
    }

    if (!email || !isValidEmail(email.value)) {
      showFieldError('errorEmail', 'Please enter a valid email address.');
      valid = false;
    }

    if (!message || message.value.trim().length < 10) {
      showFieldError('errorMessage', 'Message must be at least 10 characters.');
      valid = false;
    }

    if (!valid) {
      if (feedback) {
        feedback.textContent = 'Please fix the errors above.';
        feedback.className = 'form-feedback error';
      }
      return;
    }

    // Simulate success (no backend yet)
    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    setTimeout(() => {
      if (feedback) {
        feedback.textContent = "🎉 Thanks for reaching out! Saurabh will get back to you soon.";
        feedback.className = 'form-feedback success';
      }
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
      // Auto-hide success after 6s
      setTimeout(() => {
        if (feedback) feedback.className = 'form-feedback';
      }, 6000);
    }, 1200);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

function clearFieldErrors() {
  document.querySelectorAll('.field-error').forEach(el => {
    el.textContent = '';
    el.classList.remove('show');
  });
}

/* ── SCROLL REVEAL (GSAP + FALLBACK) ────────────────────── */
function initScrollReveal() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Generic reveals
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });

    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // Staggered items
    const staggerGroups = {};
    document.querySelectorAll('.stagger-item').forEach(el => {
      const parent = el.parentElement;
      if (!staggerGroups[parent]) staggerGroups[parent] = [];
      staggerGroups[parent].push(el);
    });

    Object.values(staggerGroups).forEach(items => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: items[0].parentElement, start: 'top 82%' }
      });
    });

    // Parallax on hero spotlight
    const spotlight = document.querySelector('.hero-spotlight');
    if (spotlight) {
      gsap.to(spotlight, {
        y: -120,
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
      });
    }

    // Section headings
    gsap.utils.toArray('.section-heading').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      );
    });

    // Footer reveal
    const footer = document.querySelector('#footer');
    if (footer) {
      gsap.fromTo(footer,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: footer, start: 'top 95%' }
        }
      );
    }

  } else {
    // IntersectionObserver fallback
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translate(0, 0)';
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-item, .section-heading').forEach(el => {
      io.observe(el);
    });
  }
}

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#booking-coming-soon') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const navbarH = document.getElementById('navbar')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
