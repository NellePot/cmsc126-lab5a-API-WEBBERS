let allHeroData = []; 

function displayHeroDetails(hero) { // function to get name, img, and role from hero data
    const nameHero = hero.localized_name;
    const imgHero = hero.img;
    const roleHero = hero.roles;

    const heroElement = document.getElementById("hero");
    heroElement.textContent = nameHero;

    const imgElement = document.getElementById("heroImg");
    imgElement.src = `http://cdn.dota2.com/${imgHero}`;
    imgElement.style.display = "block";

    const roleElement = document.getElementById("rolesList");
    roleElement.innerHTML = "";

    roleHero.forEach(role => {
        const roleItem = document.createElement("li");
        roleItem.textContent = role;
        roleElement.appendChild(roleItem);
    });

    document.getElementById("hero-info").style.display = "block";
}

function topFunction() {
    document.documentElement.scrollTop = 0; 
  }


async function fetchData(){
    try{
        document.getElementById("hero-list").style.display = 'none'

        //creates an error message
        const errorMessage = document.getElementById("errorMssg");
        errorMessage.textContent = ""; 

        // get hero name from input
        const dotaHeroName = document.getElementById("dotaHero").value.trim(); 

        // fetch dota2 api for hero stats
        const response = await fetch(`https://api.opendota.com/api/heroStats`); 

        if(!response.ok){
            throw new Error("Could not fetch resource"); 
        }
        // convert json
        const data = await response.json();
        // hero is the data of the localized_name attribute
        const hero = data.find(h => h.localized_name.toLowerCase() === dotaHeroName.toLowerCase()); 
        
        if(!hero){
            errorMessage.textContent = "Hero not found.";
            document.getElementById("hero-info").style.display = "none"; //hides previous succesful search
            return;
          }
      
          displayHeroDetails(hero);
    }
    catch(error){
        console.error(error); 
    }
}

async function showHeroesRole() {
    try {
        document.getElementById("hero-info").style.display = 'none';
        document.getElementById("hero-list").style.display = 'block';

        const response = await fetch(`https://api.opendota.com/api/heroStats`);
        
        if (!response.ok) {
            throw new Error("Could not fetch resource.");
        }

        const data = await response.json();
        
        const dotaHeroRole = document.getElementById("dotaRole").value.trim().toLowerCase();
        const heroesWithRole = data.filter(h => h.roles.some(role => role.toLowerCase() === dotaHeroRole));
        const container = document.getElementById("list-container");
        container.innerHTML = "";

        const roleErrorMessage = document.getElementById("role-error");
        roleErrorMessage.textContent = ""; 
        if(heroesWithRole.length === 0){
            roleErrorMessage.textContent = "Role not found.";
            return;
        }

        document.getElementById("role-id").innerText = dotaHeroRole.charAt(0).toUpperCase() + dotaHeroRole.slice(1);

        heroesWithRole.forEach((heroData) => {
            const heroBox = document.createElement("div");
            heroBox.className = "heroBox";
            
            const overlay = document.createElement("div");
            overlay.className = "overlay";
            
            const heroName = document.createElement("div");
            heroName.className = "text"
            heroName.innerHTML= heroData.localized_name;

            const heroImg = document.createElement("img");
            heroImg.src = `http://cdn.dota2.com/${heroData.img}`;

            overlay.appendChild(heroName);
            heroBox.appendChild(overlay);
            heroBox.appendChild(heroImg);
            container.appendChild(heroBox);

            heroBox.onclick = () => {
                displayHeroDetails(heroData);
                topFunction();
            };
        })
        
    } catch(error){
        console.error(error)
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

            heroBox.onclick = () => {
                displayHeroDetails(hero);
                topFunction();
            };
        });
    } catch(error){
        console.error(error); 
    }
}

document.getElementById("closeBtn").onclick = () => {
    document.getElementById("hero-info").style.display = "none";
};

window.onload = showAllHeroes; 