'use strict'
;(function () {
  var openCurrentAccordion = function openCurrentAccordion(e) {
    for (var i = 0; i < accordion.length; i++) {
      var parent = accordion[i].parentElement
      var collapse = parent.nextElementSibling
      if (this === accordion[i] && !collapse.classList.contains('open')) {
        accordion[i].setAttribute('aria-expanded', 'true')
        collapse.classList.add('open')
        accordion[i].classList.add('collapsed')
        collapse.style.maxHeight = collapse.scrollHeight + 'px'
      } else {
        accordion[i].setAttribute('aria-expanded', 'false')
        collapse.classList.remove('open')
        accordion[i].classList.remove('collapsed')
        collapse.style.maxHeight = '0px'
      }
    }
  }
  var accordion = document.querySelectorAll('.accordion-button')
  for (var i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', openCurrentAccordion)
  }
})()
