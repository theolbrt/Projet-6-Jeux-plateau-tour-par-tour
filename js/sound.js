var deadSound = document.createElement("audio");
deadSound.id = "audioPlayer";
deadSound.src = "son/cri.mp3"

var coup = document.createElement("audio");
coup.id = "audioPlayer2";
coup.src = "son/coup.mp3"



document.body.appendChild(deadSound);
document.body.appendChild(coup);


function sound(idPlayer, control) 
{
    var lecteur = document.querySelector('#' + idPlayer);
    lecteur.volume = 0.2;
	
    if (lecteur.paused) 
    {
        lecteur.play();
    } 
}