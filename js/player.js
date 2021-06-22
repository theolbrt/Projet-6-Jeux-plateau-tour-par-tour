class Player
{
	constructor (id, weapon)
	{      
        this.defence  = false;
        
        this.id       = id;
        this.image    = this.randomPerso();
        this.jauge    = 100;
        this.nom      = "joueur"+id;
        this.weapon   = weapon;
        this.degat    = window.weapons.power[weapon]; 
        
        this.spawn();
        
        //ici on va placer le joueur sur le damier
        damier[makeDamierId(this.colonne, this.rangee)].setUnavailablePlayer(this.nom ,this.image);
        
        this.addInterface(id);
        var dom = document.getElementById("Player"+id);
        
        this.imagePerso   = dom.getElementsByClassName("imageP")[0];
        this.domJauge     = dom.getElementsByClassName("progressBar")[0];
        this.domLifeValue = dom.getElementsByClassName("progressValue")[0];
        this.domWeapon    = dom.getElementsByClassName("arme")[0];
        this.domBoutons   = dom.getElementsByClassName("boutons")[0];

	}
     
    moove(colonne, rangee)
    {
        //change le style de la case actuelle
        damier[makeDamierId(this.colonne, this.rangee)].noMorePlayerHere();
        
        //on masque les boutons
        this.domBoutons.innerHTML = "";  

        //animation par défaut
        this.animation = [
            [-1,-1],
            [-1,-1],
            [-1,-1]
        ]

        //calcul le trajet
        var ecartX = colonne - this.colonne;
        var ecartY = rangee  - this.rangee ;
        var sens;

        if (ecartX != 0) {  //animation sur les X
            if (ecartX < 0) sens = -1; //on va sur la gauche
            else sens = 1;
            for (let i=0; i< Math.abs(ecartX); i++){
                this.animation[i][0] = this.colonne + (sens * (i+1));
                this.animation[i][1] = this.rangee;
            }
        }

        if (ecartY != 0) {  //animation sur les Y
            if (ecartY < 0) sens = -1; //on va sur la gauche
            else sens = 1;
            for (let i=0; i< Math.abs(ecartY); i++){
                if (this.animation[i][0] == -1) this.animation[i][0] = colonne;
                this.animation[i][1] = this.rangee + (sens * (i+1));
            }
        }
        this.rangee  = rangee;
        this.colonne = colonne;
        
        this.animate();
    }


    animate(prev = null)
    {
        if (this.animation.length == 0) 
        {
            return changeTurn();
        };
        var coord = this.animation.shift();
        
        if ( coord[0] == -1 || coord[1] == -1) 
        {
            return changeTurn();
        };
        
        if (prev != null) damier[prev].noMorePlayerHere();
        var idDamier = makeDamierId(coord[0], coord[1]);
        damier[idDamier].setUnavailablePlayer(this.id);
        setTimeout(this.animate.bind(this, idDamier), 300);
    }

    
    weaponsChange(weapon)
    {
        var oldWeapon = this.weapon;
                  
        this.weapon  = weapon;
        this.degat = window.weapons.power[this.weapon];
        this.domWeapon.innerHTML = weapon;
        
        return oldWeapon;
    }

    getIdOpponent()
    {
        var cible = 1;
        if (this.id == 1) cible = 2;
        return cible;
    }
        
	attack()
	{
        sound("audioPlayer2", this)
               
        var cible = this.getIdOpponent();
        window["player"+cible].attacked(this.degat);   
        
        this.finirTour(); 
	}

    attacked(degat)
    {
        if (this.defence) degat = degat/2;
        this.jauge -= degat;
        
        if(this.jauge <= 0)
            {
                sound("audioPlayer",this)
                
                this.jauge = 0;
                
                var modal2 = new Modal("replay");     
            }
        
        this.domJauge.value = this.jauge;
        this.domLifeValue.innerHTML = this.jauge;
    }
    
	defend()
	{
        this.defence = true;
        this.finirTour();      
	}
    
    addInterface(id)
    {
        var div = document.createElement("div");
        div.id  = "Player"+id;
        div.innerHTML = `<div class="Info">   <div class="nomVie"><img class="imgPerso" src="images/joueurs/${this.image}" />    <div class="progress"><progress class="progressBar" value="${this.jauge}" max="100" min="0"></progress><div class="progressValue">${this.jauge}HP</div></div>   </div><div class="arme">${this.weapon}</div><div class="boutons"></div>`;
            
        if( this.id == 1 ) document.body.prepend(div); // insere element avant
        else document.body.appendChild(div); 
      
    }

    finirTour()
    {
        changeTurn();
        this.domBoutons.style.display = "none";
    }
    
    play()
    {
        this.defence = false;
        if(!this.showProximity())
        {
            damier[makeDamierId(this.colonne, this.rangee)].availableAround(); 
        }
        
        this.domBoutons.style.display = "block";
        this.showPossibilities();      
    }    
    
    showPossibilities()
    {
        var buttons = "";
        if (this.showProximity()) buttons = `
            <button class="boutons" onclick="player${this.id}.attack()">A</button>
            <button class="boutons" onclick="player${this.id}.defend()">B</button>
        `;
        this.domBoutons.innerHTML = `
            ${buttons}<button class="boutons" onclick="player${this.id}.finirTour()">Finir tour</button>
        `;        
    }

    randomPerso()
    {    
        var rand = Math.floor(Math.random() * imagePerso.length);        
        return imagePerso.splice(rand,1)[0];   
    }

    showProximity()
    {
        var compteur = false;

        var ref = {};
        if (player2 == undefined)
        {
            ref.rangee  = this.rangee;
            ref.colonne = this.colonne;
        }

        else 
        {
            ref.rangee  = player2.rangee;
            ref.colonne = player2.colonne;
        }

        if (player1.colonne == ref.colonne)
        {
            if (player1.rangee+1 == ref.rangee || player1.rangee-1 == ref.rangee) compteur = true;
        }
        if (player1.rangee == ref.rangee)
        {
            if (player1.colonne+1 == ref.colonne || player1.colonne-1 == ref.colonne) compteur = true;
        }
        
        return compteur;   
    }

    spawn()
    {
        //on place de manière théorique le joueur
        var caseJoueur = getRandomCase(9); 
        this.colonne   = caseJoueur.colonne;
        this.rangee    = caseJoueur.rangee;

        // si il y a déjà une arme ou un obsclage 
        if (caseJoueur.weapon != null || caseJoueur.available == false) return this.spawn();

        //si il est à coté et que c'est juoreur 2 on le place ailleur
        if (this.id == 2 && this.showProximity()) return this.spawn();
    }

}