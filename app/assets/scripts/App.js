import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'

const stickyHeader = new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75) // creo due istanze della stessa classe in modo che sia utilizzabile in più punti
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
const mobileMenu = new MobileMenu();
let modal

document.querySelectorAll(".open-modal").forEach(el => {
    el.addEventListener("click", ev => {
        ev.preventDefault()
        // abbiamo creato una variabile che è indefinita fino a quando esiste una nuova istanza del modal. In questo modo la funzione si avvia solo se l'istanza non esiste già
        typeof modal == "undefined" ? import (/* webpackChunkName: "modal" */'./modules/Modal').then(x => { // ritorna una promessa che quando ha finito di caricare il file then() agisce.Il parametro x indica il file che vogliamo caricare 
            modal = new x.default() // questo crea una nuova instance della classe modal
            setTimeout(() => modal.openTheModal(), 20) // apre il modal dopo un lasso di tempo per dare modo al browser di creare l'oggetto
        }).catch(() => console.log("C'è un problema")) : modal.openTheModal() // lo apre senza caricarlodi nuovo
        // e catch() avviene quando il file non si carica e c'è un errore 
    })
})

if (module.hot) {
    module.hot.accept()
}