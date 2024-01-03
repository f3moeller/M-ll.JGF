// Diverse Variablen, die in den Funktionen gebraucht werden
// Variavle für die IDs der divs
let ids = Array.from(document.querySelectorAll('.draggable')).map(div => div.id);
 // Alle divs verstecken
 ids.forEach(id => {
    let div = document.getElementById(id);
    if (div) {
        div.style.display = 'none';
    }
});
let punkte = 0;
let lives = 3
if(lives == 3){
    document.getElementById("Trash3").style.display = "none";
    document.getElementById("Trash2").style.display = "none";
    document.getElementById("Trash1").style.display = "none";
}
document.getElementById('punkte').innerHTML = punkte;
let colors = ["#FF0000", "#FF4000", "#FF8000", "#FFB000"]; // Rotton, Gelbton, Lilaton, Limeton
let fallgeschwindigkeit = 10;
var root = document.querySelector(':root');//deklaration einer CSS Variable
root.style.setProperty('--speed', fallgeschwindigkeit+1 + 's');//setzen der CSS Variable

// Variablen für die ID und die zweite Klasse des gezogenen divs (Müssen Global sein, da sie in mehreren Funktionen gebraucht werden)
let targetId;
let targetSecondClass;

// Funktion zum speichern der ID und der zweiten Klasse des gezogenen divs(wird für die Überprüfung gebraucht)
function drag(ev) {
targetId = ev.target.id;
targetSecondClass = ev.target.classList[1];
console.log(targetId, targetSecondClass);
}

// Funktion zum verhindern des Standardverhaltens beim Drag and Drop
function allowDrop(ev) {
ev.preventDefault();
}

// Funktion zum überprüfen ob das richtige div in das richtige Ziel gezogen wurde
function drop(ev) {
ev.preventDefault();
if (targetSecondClass.toLowerCase() == ev.target.id.toLowerCase()) {
    punkte++;
    showPoints();
    document.getElementById('punkte').innerHTML = punkte;
    document.getElementById(targetId).style.display = 'none';   
    if (punkte % 25 == 0){
    fallgeschwindigkeit--;
    root.style.setProperty('--speed', fallgeschwindigkeit+1 + 's');
    }
}else{
    lives--;
    showLives();
    document.querySelector('#Background').style.animation = 'changeBackground 1s steps(1, end )';
    sleep(1000).then(() => { document.querySelector('#Background').style.animation = 'none';});
    document.getElementById(targetId).style.display = 'none';
    check();

}
}

// Funktion zum überprüfen der Leben und dem, aus 0 Leben folgenden Game Over
function check() {
    if (lives <= 0) {
        showLives();
        document.getElementById('Tier1').style.display = 'none';
        document.getElementById('Tier2').style.display = 'none';
        document.getElementById('Tier3').style.display = 'none';
        document.getElementById('Tier4').style.display = 'none';
        document.getElementById('Tier5').style.display = 'none';
        sleep(60).then(() => {
        alert('Das wars...' +" "+ 'Du hast ' + punkte + ' Punkte erreicht! '+'Die Tiere haben sich leider wieder vor dem Müll versteckt!'+' ' + 'Klicke auf OK um das Spiel neu zu starten.');
        location.reload()
        });
    }
}

// Funktion zum zufälligen Aufploppen von zufälligen gegenständen
function randomPopup() {
    // Zufällige ID auswählen
    let randomId = ids[Math.floor(Math.random() * ids.length)];

    // Zufälliges div anzeigen
    let randomDiv = document.getElementById(randomId);
    if (randomDiv) {
        if (randomDiv.style.display !== 'block') {
        randomDiv.style.display = 'block';

let randomLeft = Math.floor(Math.random() * window.innerWidth);
            randomDiv.style.left = randomLeft-30 + 'px';
            
            let paragraphs = randomDiv.querySelectorAll('div');
            paragraphs.forEach(function(p) {
                p.style.animation = "wiggle" + Math.floor(Math.random() * 4)
                p.style.animationDuration = "1.3432s"
                p.style.animationIterationCount = "infinite";
            });

        let countdown = fallgeschwindigkeit; // Countdown-Wert
        let countdownInterval = setInterval(function() {
            countdown--; 
            if (randomDiv.style.display !== 'block') {clearInterval(countdownInterval)}   
            if (countdown < 0) {
                randomDiv.style.display = 'none';
                lives--;
                showLives();
                check();
                clearInterval(countdownInterval);} // Stoppt den Countdown
        }, 1000); // Aktualisiert den Countdown jede Sekunde
    }}
};

// Zufälliges Aufploppen alle 4 Sekunden
setInterval(randomPopup, fallgeschwindigkeit*400);

// Funktion zum einblenden der Lebensabzugsdivs
function showLives(){
    if(lives == 2){
        document.getElementById("Trash3").style.display = "block";
    }
    if(lives == 1){
        document.getElementById("Trash2").style.display = "block";
    }
    if(lives == 0){
        document.getElementById("Trash1").style.display = "block";
    }
    let audio = new Audio('assets/sounds/fail-144746.mp3');
    audio.play();
}

// Funktion zum einblenden der Punktedivs
function showPoints(){
    if(punkte == 10){
        document.getElementById("Tier1").style.display = "block";
    }
    if(punkte == 25){
        document.getElementById("Tier2").style.display = "block";
    }
    if(punkte == 50){
        document.getElementById("Tier3").style.display = "block";
    }
    if(punkte == 75){
        document.getElementById("Tier4").style.display = "block";
    }
    if(punkte == 100){
        document.getElementById("Tier5").style.display = "block";
    }
    let audio = new Audio('assets/sounds/mixkit-arcade-game-complete-or-approved-mission-205.wav');
    audio.play();
}

// Funktion zum warten einer bestimmten Zeit(wird für die Animation gebraucht)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
