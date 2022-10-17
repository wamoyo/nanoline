!(function () {
  "use strict"
  window.addEventListener('load', function (event) {

    if ('IntersectionObserver' in window) {

      // Set Up

      var animated = document.querySelectorAll('.animate')

      animated.forEach(function (element) {
        element.classList.add('hidden')
      })

      // Animate On Scroll

      var observer = new IntersectionObserver( function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('hidden')
          }
        })
      })
      animated.forEach((element) => observer.observe(element))

    }

  })
}());
