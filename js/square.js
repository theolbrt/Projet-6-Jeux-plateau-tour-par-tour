class Square
{
    constructor(colonne, rangee) 
    {

        this.weapon    = null;
        this.idPlayer  = null;
        this.available = true;
        this.colonne   = colonne;
        this.rangee    = rangee;
        this.addBody(makeDamierId(this.colonne, this.rangee));
        
        
    }   

    addBody(id)
    {
        var myClass = "default";
        
        $( "#damier" ).append( `<div id="${id}" class="${myClass}" onclick="damier[${id}].moove()"></div>` );

        this.dom = document.getElementById(id);
    }
  
    moove()
    {
        var oldWeapon = window["player"+turn].weapon;
            
        switch ($("#"+makeDamierId(this.colonne, this.rangee)).hasClass("moove"))
        {
            case true:            
                
                //enlever le style moove aux cases
                this.noMoreAvailable();
                
                //donner au joueur ses nouvelles coordonnées
                window["player"+turn].moove(this.colonne, this.rangee);

                //on change l'arme
                
                if (this.weapon != null)
                {
                    this.weapon = window["player"+turn].weaponsChange(this.weapon);
                }              
                break;
        }

    }

    swapWeapon(newWeapon)
    {          
        
        this.weapon = newWeapon;
        this.dom.className = this.weapon; 
    }
    
    setUnavailable()
    {
        this.available = false;
        this.dom.className = "unavailableCase";
        this.dom.innerHTML = `<img src="images/pierre.jpg">`;
    }
    setUnavailablePlayer(name, image=null)
    {
        this.available = false;
        this.dom.className = "caseJoueur";
        if (image === null) this.dom.innerHTML = `<img src="images/joueurs/${window["player"+turn].image}">`;
        else this.dom.innerHTML = `<img src="images/joueurs/${image}">`;
        this.idPlayer = name;
    }
    
    setMovable()
    {
        this.dom.classList.add("moove");
    }
    unsetMovable()
    {
        this.dom.classList.remove("moove");
    }

    
    availableAround()
    {
        // on va déterminer quelles sont les cases possibles
        var moove = this.listMoovePossibilities();
        
        for (let i=0; i < moove.length; i++) 
        {
            damier[moove[i]].setMovable();
        }    
    }
    noMoreAvailable()
    {   
        var moove = this.listMoovePossibilities();

        for (let i=0; i < moove.length; i++)
        {
            damier[moove[i]].unsetMovable();
        }
    }
    
    listMoovePossibilities(){
        var moove = [];

        var nbMvtGauche = window["player"+turn].colonne-3;
        if (nbMvtGauche<0) nbMvtGauche = 3 + nbMvtGauche;
        else nbMvtGauche = 3;
        
        var nbMvtDroite = window["player"+turn].colonne+3;
        if (nbMvtDroite>9) nbMvtDroite = 3 - (nbMvtDroite - 9) ;
        else nbMvtDroite = 3;
        
        var nbMvtHaut = window["player"+turn].rangee - 3;
        if (nbMvtHaut<0) nbMvtHaut = 3 + nbMvtHaut ;
        else nbMvtHaut = 3;
        
        var nbMvtBas = window["player"+turn].rangee+3;
        if (nbMvtBas>9) nbMvtBas = 3 - (nbMvtBas - 9) ;
        else nbMvtBas = 3;

        for (let i=1; i<= nbMvtGauche; i++){
            if (damier[makeDamierId(window["player"+turn].colonne - i, window["player"+turn].rangee)].available) moove.push(makeDamierId(window["player"+turn].colonne - i, window["player"+turn].rangee));
            
            else break;
                
        }
        for (let i=1; i<= nbMvtDroite; i++){
            if (damier[makeDamierId(window["player"+turn].colonne + i, window["player"+turn].rangee)].available) moove.push(makeDamierId(window["player"+turn].colonne + i, window["player"+turn].rangee));
            
            else break;
        }
        for (let i=1; i<= nbMvtHaut; i++){
            if (damier[makeDamierId(window["player"+turn].colonne, window["player"+turn].rangee - i)].available) moove.push(makeDamierId(window["player"+turn].colonne, window["player"+turn].rangee - i));
            
            else break;
        }
        for (let i=1; i<= nbMvtBas; i++){
            if (damier[makeDamierId(window["player"+turn].colonne, window["player"+turn].rangee + i)].available) moove.push(makeDamierId(window["player"+turn].colonne, window["player"+turn].rangee + i));

            else break;
        }

        return moove;
    }
    
    noMorePlayerHere()
    {
        if(this.weapon != null)
        {   
            damier[makeDamierId(this.colonne, this.rangee)].swapWeapon(this.weapon);            
        }
        else
        {
            this.dom.className = "default";    
        }      
        
        this.available = true;
        this.dom.innerHTML = "";
        this.idPlayer  = null;             
               
    }
}