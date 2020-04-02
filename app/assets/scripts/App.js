import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

const stickyHeader = new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75) // creao due istanze della stess classe in modo che sia utilizzabile in più punti
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)

const mobileMenu = new MobileMenu();

if (module.hot) {
    module.hot.accept()
}