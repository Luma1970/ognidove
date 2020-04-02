import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector(".site-header")
        this.pageSections = document.querySelectorAll(".page-section")
        this.brawserHeight = window.innerHeight
        this.previousScrollY = window.scrollY //determino la posizione dello scroll
        this.events()
    }

    events() {
        window.addEventListener("scroll", throttle(() => this.runOnScroll(), 200))
        window.addEventListener("resize", debounce(() => {
            this.browserHeight = window.innerHeight
        }, 333))
    }

    runOnScroll() {
        this.determineScrollDirection()

        window.scrollY > 60 ? this.siteHeader.classList.add("site-header--dark") : this.siteHeader.classList.remove("site-header--dark")
        this.pageSections.forEach(el => this.calcSection(el))

    }

    determineScrollDirection() { // per determinare se stiamo scrollando su o giù
        window.scrollY > this.previousScrollY ? this.scrollDirection = 'down' : this.scrollDirection = 'up'
        this.previousScrollY = window.scrollY
    }

    calcSection(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) { //in pratica se l'elemento non è in vista nel browser quindi dal suo margine top al suo margine top più la sua altezza
            let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100
            if (scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => el.classList.remove("is-current-link")) //rimuovo dalla selezione gli elementi che non sono l'attuale mathingLink
                document.querySelector(matchingLink).classList.add("is-current-link") // attribuisco una classe all'attuale matchingLink
            }
        }
    }
}

export default StickyHeader