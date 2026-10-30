/**
 * SAURABH ZINZUVADIYA — OFFICIAL STAND-UP COMEDY PORTFOLIO
 * Interaction Engine: Sapan Verma-Style Kinetic Sidebar Navigation, Video Modal & Form Validation
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. SAPAN VERMA KINETIC SIDEBAR NAVIGATION ENGINE
  const dockItems = document.querySelectorAll('.dock-item');
  const sections = document.querySelectorAll('section[id]');
  const dockBackTop = document.getElementById('dockBackTop');
  const triggerActiveLabel = document.getElementById('triggerActiveLabel');
  const mobileDockTrigger = document.getElementById('mobileDockTrigger');
  const sidebarDock = document.getElementById('sidebarDock');

  let activeSectionId = 'home';

  function updateKineticSidebar() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;
    let currentId = 'home';

    // Find currently active section in viewport
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = id;
      }
    });

    if (currentId !== activeSectionId) {
      activeSectionId = currentId;

      // Update mobile trigger button label
      if (triggerActiveLabel) {
        triggerActiveLabel.textContent = currentId.toUpperCase();
      }

      // Sapan Verma Animation Logic:
      // - Items before active section: .shrinked-sec (move up to right & text condensed)
      // - Active item: .expanded-sec (expanded, highlighted with glow)
      // - Items after active section: normal default state
      let foundActive = false;

      dockItems.forEach(function (item) {
        const itemSec = item.getAttribute('data-sec');

        if (itemSec === currentId) {
          item.classList.add('expanded-sec');
          item.classList.remove('shrinked-sec');
          foundActive = true;
        } else if (!foundActive) {
          // Sections we already passed / gone -> shrink and move up to right
          item.classList.add('shrinked-sec');
          item.classList.remove('expanded-sec');
        } else {
          // Sections ahead
          item.classList.remove('expanded-sec');
          item.classList.remove('shrinked-sec');
        }
      });
    }

    // Toggle Back To Top visibility
    if (dockBackTop) {
      if (scrollY > windowHeight * 0.4) {
        dockBackTop.classList.add('visible');
      } else {
        dockBackTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', updateKineticSidebar, { passive: true });
  updateKineticSidebar(); // initial run

  // Mobile Dock Trigger toggle
  if (mobileDockTrigger && sidebarDock) {
    mobileDockTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebarDock.classList.toggle('mobile-open');
    });

    // Close when clicking anywhere outside
    document.addEventListener('click', function (e) {
      if (!sidebarDock.contains(e.target)) {
        sidebarDock.classList.remove('mobile-open');
      }
    });

    // Close when clicking a dock link on mobile
    const dockLinks = document.querySelectorAll('.dock-link');
    dockLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        sidebarDock.classList.remove('mobile-open');
      });
    });
  }

  // 2. Interactive Camera Angle Switcher (Real Stage Photos)
  const heroStagePhoto = document.getElementById('heroStagePhoto');
  const angleBtns = document.querySelectorAll('.angle-btn');

  angleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const newSrc = btn.getAttribute('data-src');
      if (heroStagePhoto && newSrc) {
        heroStagePhoto.style.opacity = '0.35';
        heroStagePhoto.style.transition = 'opacity 0.25s ease';
        setTimeout(function () {
          heroStagePhoto.src = newSrc;
          heroStagePhoto.style.opacity = '1';
        }, 150);
      }
      angleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 3. Video Modal Player
  const videoModal = document.getElementById('videoModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const videoIframe = document.getElementById('videoIframe');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const videoCards = document.querySelectorAll('.video-card');

  function openVideoModal(title, videoId) {
    if (!videoModal || !videoIframe) return;
    modalVideoTitle.textContent = title || 'Watch Special';
    videoIframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0';
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal || !videoIframe) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoIframe.src = '';
    document.body.style.overflow = '';
  }

  videoCards.forEach(function (card) {
    const title = card.getAttribute('data-video-title');
    const videoId = card.getAttribute('data-video-id') || 'dQw4w9WgXcQ';
    const thumbWrap = card.querySelector('.video-thumb-wrap');
    const openBtn = card.querySelector('.open-video-btn');

    if (thumbWrap) {
      thumbWrap.addEventListener('click', function () {
        openVideoModal(title, videoId);
      });
    }

    if (openBtn) {
      openBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openVideoModal(title, videoId);
      });
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeVideoModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
      closeVideoModal();
    }
  });

  // 4. Booking Form Submission Handling
  const bookingForm = document.getElementById('bookingForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const eventDate = document.getElementById('eventDate').value;
      const location = document.getElementById('location').value.trim();
      const eventType = document.getElementById('eventType').value;
      const budget = document.getElementById('budget').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !phone || !eventDate || !location || !eventType || !message) {
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback error';
          formFeedback.innerHTML = '⚠️ Please fill in all required fields.';
        }
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Submitting Enquiry...</span>';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Enquiry Sent Successfully ✓</span>';

        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Your event enquiry for <strong>${eventType}</strong> in <strong>${location}</strong> on <strong>${eventDate}</strong> has been received.<br>
            Saurabh's management team will review your requirements and respond at <strong>${email}</strong> within 24 hours.<br><br>
            <a href="https://wa.me/919876543210?text=Hi%20Saurabh%20Management,%20I%20just%20submitted%20an%20event%20booking%20enquiry%20for%20${encodeURIComponent(eventType)}%20on%20${encodeURIComponent(eventDate)}" target="_blank" style="color:var(--accent); font-weight:700; text-decoration:underline;">
              Click here to follow up instantly on WhatsApp →
            </a>
          `;
        }

        bookingForm.reset();
      }, 700);
    });
  }
});
