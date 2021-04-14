console.log('Lost in the Sleep')

function anchorscroll(speed = 0.5, selector = '.anchorscroll', offset = 30) {

  window.raf = (function() {
    return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
  })()


  let anchors = [].slice.apply(document.querySelectorAll(selector)),
      links   = [].slice.apply(document.querySelectorAll('a')),
      hashes  = links.filter(x => x.getAttribute('href').charAt(0) === '#')

 
  for (let i = 0; i < hashes.length; i++) {

    ((num) => {
      hashes[num].addEventListener('click', (e) => {
        e.preventDefault()
        let hash     = hashes[num].getAttribute('href'),
            match    = anchors.filter(x => `#${x.id}` === hash),
            position = window.pageYOffset,
            top      = match[0].offsetTop

        function scrollDown() {
          if (top >= position + offset) {
            window.scrollTo(0, position)
            position += speed * 50
            raf(scrollDown)
          }                    
        }

        function scrollUp() {
          if (top <= position  + offset) {
            window.scrollTo(0, position)
            position -= speed * 50
            raf(scrollUp)
          }                    
        }

        top >= position ? scrollDown() : scrollUp()

      }, false)

    })(i)
  }
} 


anchorscroll(0.375, '.scroll', 48)