fetch("https://api.opendota.com/api/heroes")
    .then (res => {
        return res.json();
    })
    .then (data => {
        data.forEach(heroes => {
            const dotaHeroes = `<li>${heroes.localized_name}</li>`;

            document.querySelector('ul').insertAdjacentHTML('beforeend', dotaHeroes);
        });
    })
    .catch(error => console.log(error));