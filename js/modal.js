class Modal
{
    constructor(id)
    {
        this.id = id;
        this.message = "";
        
        var modal = document.createElement("div");
        modal.id = id;
        document.body.appendChild(modal);
        
        this.dom = document.getElementById(id);
        
        
        if(id == "replay")
        {
            this.dom.innerHTML = this.html();
        }

               
        
        this.dom.addEventListener("click", this.click.bind(this));
    }

    html()
    {
        return `
        <div class="message">Voulez-vous recommencer ?</div>
        <div class="divBoutonReplay"><button class="boutonReplay" onclick="window.location.reload(false)">OUI</button><button class="boutonReplay">NON</button></div>
        `;
    }
    
    click()
    {
        this.dom.removeEventListener("click", this.click.bind(this));
        document.body.removeChild(this.dom);
    }
}