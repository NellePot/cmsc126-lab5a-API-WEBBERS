/*fetch("https://api.opendota.com/api/heroes")
    .then (res => {
        return res.json();
    })
    .then (data => {
        data.forEach(heroes => {
            const dotaHeroes = `<li>${heroes.localized_name}</li>`;

            document.querySelector('ul').insertAdjacentHTML('beforeend', dotaHeroes);
        });
    })
    .catch(error => console.log(error));*/ 

async function fetchData(){

    try{

        const dotaHeroIndex = document.getElementById("dotaHero").value; 

        //const response = await fetch(`https://api.opendota.com/api/heroes`);

        const response = await fetch(`https://api.opendota.com/api/heroStats`); 

        if(!response.ok){
            throw new Error("Could not fetch resource"); 
        }

        const data = await response.json();
    
        console.log(data); 
        const nameHero = data[dotaHeroIndex].localized_name
        const imgHero = data[dotaHeroIndex].img 
        const roleHero = data[dotaHeroIndex].roles

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