(function () {
  function openPopup(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('active');
  }
  function closePopup(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cms-popup-overlay')) {
      e.target.classList.remove('active');
    }
    if (e.target.classList.contains('cms-popup-close')) {
      e.target.closest('.cms-popup-overlay').classList.remove('active');
    }
    if (e.target.dataset.popupTarget) {
      openPopup(e.target.dataset.popupTarget);
    }
  });

  window.CmsPopup = { open: openPopup, close: closePopup };
})();
