(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cms-banner__close').forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.closest('.cms-banner').classList.add('hidden');
      });
    });
  });
})();
