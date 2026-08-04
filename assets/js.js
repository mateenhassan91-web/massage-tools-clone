(function () {
  var header = document.querySelector('[data-header]');
  if (!header) return;

  // Utility bar dropdowns (Contact Us / Account / Currency)
  var dropdowns = header.querySelectorAll('.mt-utility-item[data-dropdown]');
  dropdowns.forEach(function (item) {
    var trigger = item.querySelector('.mt-utility-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      dropdowns.forEach(function (d) { d.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Mega menu on hover/click (desktop)
  var navItems = header.querySelectorAll('.mt-nav-item.mt-has-mega');
  navItems.forEach(function (item) {
    var link = item.querySelector('.mt-nav-link');
    item.addEventListener('mouseenter', function () { item.classList.add('open'); });
    item.addEventListener('mouseleave', function () { item.classList.remove('open'); });
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) return;
      if (item.classList.contains('open')) return; // allow normal navigation once open
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    dropdowns.forEach(function (d) { d.classList.remove('open'); });
  });

  // Search toggle (mobile)
  var searchToggle = header.querySelector('[data-search-toggle]');
  var search = header.querySelector('[data-search]');
  if (searchToggle && search) {
    searchToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      search.classList.toggle('open');
    });
  }

  // Mobile drawer
  var mobileToggle = header.querySelector('[data-mobile-toggle]');
  var mobileDrawer = header.querySelector('[data-mobile-drawer]');
  var mobileClose = header.querySelector('[data-mobile-close]');
  var mobileOverlay = header.querySelector('[data-mobile-overlay]');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

  // Mobile submenu expand
  var expandButtons = header.querySelectorAll('[data-mobile-expand]');
  expandButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.mt-mobile-item');
      var wasOpen = item.classList.contains('open');
      item.classList.toggle('open', !wasOpen);
      btn.textContent = !wasOpen ? '−' : '+';
    });
  });

  // Keep cart count in sync (Shopify AJAX cart events)
  document.addEventListener('cart:updated', function (e) {
    var countEl = header.querySelector('[data-cart-count]');
    if (countEl && e.detail && typeof e.detail.item_count !== 'undefined') {
      countEl.textContent = e.detail.item_count;
    }
  });
})();