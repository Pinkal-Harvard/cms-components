(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.querySelector('.cms-nav__hamburger');
    var links = document.querySelector('.cms-nav__links');
    if (hamburger && links) {
      hamburger.addEventListener('click', function () {
        links.classList.toggle('open');
      });
    }
  });
})();
