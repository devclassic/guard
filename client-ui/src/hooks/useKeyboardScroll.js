import { onMounted, onUnmounted } from 'vue'

export const useKeyboardScroll = (options = {}) => {
  const { targetSelector = '.page', inputSelector = 'input, textarea' } = options

  let pageEl = null
  let originalHeight = 0
  let timer = null
  let pollTimer = null

  const adjust = () => {
    const active = document.activeElement
    if (!active?.matches(inputSelector)) return

    const vh = window.innerHeight
    const rect = active.getBoundingClientRect()
    const targetCenter = vh / 2
    const inputCenter = rect.top + rect.height / 2
    let moveUp = inputCenter - targetCenter

    if (moveUp <= 0) {
      pageEl.style.transform = ''
      return
    }

    moveUp = Math.min(moveUp, rect.top - 30, rect.bottom - 30)

    pageEl.style.transform = `translateY(-${moveUp}px)`
  }

  const reset = () => {
    clearTimeout(timer)
    clearInterval(pollTimer)
    pageEl.style.transform = ''
  }

  const waitThenAdjust = () => {
    let lastVH = window.innerHeight
    let stable = 0
    let checks = 0

    const check = () => {
      checks++
      const vh = window.innerHeight

      if (vh === lastVH) {
        stable++
      } else {
        stable = 0
        lastVH = vh
      }

      if (stable >= 5 || checks >= 30) {
        adjust()
        pollTimer = setInterval(() => {
          const active = document.activeElement
          const vh = window.innerHeight
          if (active?.matches(inputSelector)) {
            if (originalHeight - vh < 50 && pageEl.style.transform) reset()
            return
          }
          if (originalHeight - vh < 50) reset()
        }, 150)
        return
      }

      timer = setTimeout(check, 80)
    }

    check()
  }

  onMounted(() => {
    pageEl = document.querySelector(targetSelector)
    if (!pageEl) return

    originalHeight = window.innerHeight
    pageEl.style.height = `${originalHeight}px`
    pageEl.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
    pageEl.style.willChange = 'transform'

    document.addEventListener(
      'focusin',
      e => {
        if (!e.target.matches(inputSelector)) return
        reset()
        waitThenAdjust()
      },
      true,
    )

    document.addEventListener(
      'focusout',
      e => {
        if (!e.target.matches(inputSelector)) return
        clearTimeout(timer)
      },
      true,
    )
  })

  onUnmounted(() => {
    reset()
    if (!pageEl) return
    pageEl.style.willChange = ''
    pageEl.style.height = ''
    pageEl.style.transition = ''
  })
}
