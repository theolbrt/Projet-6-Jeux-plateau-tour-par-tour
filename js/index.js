var unavailableSquare = 12;

var weapons = {
    "baseWeapons": [ "HAMMER" , "KNIFFE" ],
    "otherWeapons": [ "FENNEL", "EXCALIBUR" , "SWORDLIGHT", "INFINITYGAUNTLET"],
    "power" : {
        "KNIFFE"           : 10,
        "HAMMER"           : 10,
        "FENNEL"           : 20,
        "EXCALIBUR"        : 30,
        "SWORDLIGHT"       : 40,
        "INFINITYGAUNTLET" : 50
    }
}



var imagePerso = 
[       
    "leodagand.jpg",
    "perceval.jpg",
    "yoda.jpeg",
    "chuck.jpeg",
    "vador.jpg"
];


var damier = [];


$("body").append('<div id="damier"></div>');


function getRandom(max)
{
    return Math.floor(Math.random() * Math.floor(max));
}
function getRandomCase(max)
{
	return damier[(getRandom(max)*10)+getRandom(max)];  
}
function makeDamierId(colonne, rangee)
{
	return (colonne*10)+rangee;
}


for (var rangee=0; rangee < 10; rangee++)
{
    for (var colonne=0; colonne < 10; colonne++)
    {
        damier[makeDamierId(this.colonne, this.rangee)] = new Square(colonne, rangee);
    }
}

/**
  * decide where unavailable square will be
  */

for(unavailableSquare; unavailableSquare > 0; unavailableSquare--)
        {   
            var unavailableCase = getRandomCase(9);
            
            if( !unavailableCase.available) unavailableSquare++;

            else unavailableCase.setUnavailable();                    
        }

for(var i = 0; i < 4; i++ )
{   
    do
    {
        var caseGun = getRandomCase(9);             
    }
    while( !caseGun.available && caseGun.idPlayer === null)
    {
        caseGun.swapWeapon(weapons.otherWeapons.pop(caseGun));
    }
}


var turn = 1;

var modal = new Modal("modalFight");


var player1 = new Player(1,weapons.baseWeapons.pop());
var player2 = new Player(2,weapons.baseWeapons.pop());

window["player1"].play();
//changeTurn();


function changeTurn()
{
    var compteur = 0;
    
    turn = turn == 1 ? 2 : 1;
    window["player"+turn].play();
    
    compteur++;
    
    return compteur;
}