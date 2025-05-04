let allHeroData = []; 

async function fetchData(){

    try{

        const dotaHeroName = document.getElementById("dotaHero").value.trim(); 

        //const response = await fetch(`https://api.opendota.com/api/heroes`);

        const response = await fetch(`https://api.opendota.com/api/heroStats`); 

        if(!response.ok){
            throw new Error("Could not fetch resource"); 
        }

        const data = await response.json();

        const hero = data.find(h => h.localized_name.toLowerCase() === dotaHeroName.toLowerCase()); 

        if(!hero){
            throw new Error("Hero not found"); 
        }

        document.getElementById("hero-info").style.display = "block";
    
        console.log(data); 
        const nameHero = hero.localized_name
        const imgHero = hero.img 
        const roleHero = hero.roles

        const heroElement = document.getElementById("hero")
        heroElement.textContent = nameHero

        const imgElement = document.getElementById("heroImg");
        imgElement.src = `http://cdn.dota2.com/${imgHero}`
        imgElement.style.display ="block"; 

        const roleElement = document.getElementById("rolesList");
        roleElement.innerHTML = ""; 

        roleHero.forEach(role => {
            const roleItem = document.createElement("li");
            roleItem.textContent = role; 
            roleElement.appendChild(roleItem)
        });
    }
    catch(error){
        console.error(error); 
    }
}

async function showAllHeroes(){
    try{
        const response = await fetch(`https://api.opendota.com/api/heroStats`); 

        if(!response.ok){
            throw new Error("Could not fetch resource"); 
        }

        const data = await response.json();
        allHeroData = data; 

        const container = document.getElementById("all");
        container.innerHTML = ""; 

        data.forEach(hero => {
            const heroBox = document.createElement("div");
            heroBox.className = "heroBox"; 

            const heroImg = document.createElement("img");
            heroImg.src = `http://cdn.dota2.com/${hero.img}`; 
            heroImg.alt = hero.localized_name;
            
            const overlay = document.createElement("div");
            overlay.className = "overlay";

            const text = document.createElement("p");
            text.className = "text";
            text.textContent = hero.localized_name;

            overlay.appendChild(text);
            heroBox.appendChild(heroImg);
            heroBox.appendChild(overlay);
            container.appendChild(heroBox);
        });
    } catch(error){
        console.error(error); 
    }
}

window.onload = showAllHeroes; 