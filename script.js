document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const menuToggle = document.getElementById("menuToggle")
  const closeMenu = document.getElementById("closeMenu")
  const mobileMenu = document.getElementById("mobileMenu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active")
  })

  closeMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })

  // Language toggle functionality
  const languageToggle = document.getElementById("languageToggle")
  let currentLang = "en"

  languageToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "fa" : "en"
    updateLanguage()
  })

  function updateLanguage() {
    const body = document.body

    // Toggle RTL direction for Persian
    if (currentLang === "fa") {
      body.classList.add("rtl")
    } else {
      body.classList.remove("rtl")
    }

    // Update all elements with data-en and data-fa attributes
    const elements = document.querySelectorAll("[data-en][data-fa]")
    elements.forEach((el) => {
      el.textContent = el.getAttribute(`data-${currentLang}`)
    })

    // Update placeholders
    const inputs = document.querySelectorAll("[data-en-placeholder][data-fa-placeholder]")
    inputs.forEach((input) => {
      input.placeholder = input.getAttribute(`data-${currentLang}-placeholder`)
    })
  }

  // Horizontal scrolling functionality
  const scrollLeftButtons = document.querySelectorAll(".scroll-left")
  const scrollRightButtons = document.querySelectorAll(".scroll-right")

  scrollLeftButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const scrollContainer = document.getElementById(targetId)
      scrollContainer.scrollBy({ left: -300, behavior: "smooth" })
    })
  })

  scrollRightButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target")
      const scrollContainer = document.getElementById(targetId)
      scrollContainer.scrollBy({ left: 300, behavior: "smooth" })
    })
  })

  // Touch scrolling for mobile
  const scrollContainers = document.querySelectorAll(".products-scroll")
  scrollContainers.forEach((container) => {
    let isDown = false
    let startX
    let scrollLeft

    container.addEventListener("mousedown", (e) => {
      isDown = true
      container.style.cursor = "grabbing"
      startX = e.pageX - container.offsetLeft
      scrollLeft = container.scrollLeft
    })

    container.addEventListener("mouseleave", () => {
      isDown = false
      container.style.cursor = "grab"
    })

    container.addEventListener("mouseup", () => {
      isDown = false
      container.style.cursor = "grab"
    })

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - startX) * 2
      container.scrollLeft = scrollLeft - walk
    })
  })

  // Countdown timer for coming soon section
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 30) // Set launch date to 30 days from now

  function updateCountdown() {
    const currentDate = new Date()
    const difference = launchDate - currentDate

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    document.getElementById("days").innerText = days.toString().padStart(2, "0")
    document.getElementById("hours").innerText = hours.toString().padStart(2, "0")
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0")
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0")
  }

  // Initial call
  updateCountdown()
  // Update every second
  setInterval(updateCountdown, 1000)
})

