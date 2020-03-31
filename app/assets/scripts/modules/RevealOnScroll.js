import throttle from 'lodash/throttle' // posso impostare l'intervallo con qui una funzione viene chiamata
import debounce from 'lodash/debounce'  // imposto la chiamata a una funzione una volta X millisecondi dopo che l'azione è finita

class RevealOnScroll {
    constructor(els, tresholdPercent) {
        this.tresholdPercent = tresholdPercent // il parametro si riferisce al secondo parametro delle due istanze, che compaiono in tempi diversi
        this.itemToReveal = els // il parametro si riferisce ai primi parametri delle due istanze definite nell'App principale
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this) //utilizzando il throttle inserito nellalibreria lodash posso dirgli di richiamare la funzione ogni tot tempo rispamiando processore
        this.events()
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(() => {
            console.log("resize it")
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller() {
        console.log("scroll function run")
        this.itemToReveal.forEach(el => {
            if (el.isRevealed == false) {
                this.calculateIfScrolledTo(el)
            }
        })
    }

    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) { //'window.scrollY' distanza dalla cima della pagina 'el.offsetTop' margine top dell'elemento in relazione all'altezza totale dell'elemento. In questo modo ilcalcolo non si attiva anzitempo
            console.log("elemento calcolato")
            let scrollPercent = (el.getBoundingClientRect().top) / this.browserHeight * 100 // getBoundingClientRect().y, o 'top' che funziona anche per Edge, è un metodo inserito in tutti i browser che calcola grazie alla 'y' la distanza di un elemento dal margine top
            // divido quindi questa distanza per l'altezza della finestra per ottenere la percentuale di spostamento
            if (scrollPercent < this.tresholdPercent) { //l'elemento appare quando il suo top raggiunge il 25% o il 40% (dipende dall'istanza) della finestra
                el.classList.add("reveal-item--is-visible")
                el.isRevealed = true // evito che il calcolo prosegua dopo che l'elemento è stato rivelato
                if (el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle)
                }
            }
        }
    }

    hideInitially() {
        this.itemToReveal.forEach(el => {
            el.classList.add("reveal-item")
            el.isRevealed = false
        })
        this.itemToReveal[this.itemToReveal.length - 1].isLastItem = true // definisco l'ultimo elemento nella lista e faccio sì che il calcolo sia "smontato" dopo di esso
    }
}

export default RevealOnScroll