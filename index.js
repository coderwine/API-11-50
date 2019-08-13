const baseURL = 'https://api.spacexdata.com/v2/rockets';

const searchForm = document.querySelector('form');
const spaceShips = document.querySelector('table');

searchForm.addEventListener('submit', fetchSpace);

function fetchSpace(event) {
    event.preventDefault();
    fetch(baseURL)
        .then(results => {
            // console.log(results);
            return results.json();  //jsonifying results so we can read it.
        })
        .then(json => {  //"json" is a placeholder
            // console.log(json);
            displayRockets(json)
        })

        function displayRockets(data) {
            console.log('Results', data);

            let rockets = data.forEach(element => {
                // console.log(element);
                let rocket = document.createElement('tr');
                let rocketName = document.createElement('td');
                let rocketCost = document.createElement('td');
                // let rocketImg = document.isConnected('img');

                rocketName.innerText = element.name;
                rocketCost.innerText = element.cost_per_launch;
                
            
                spaceShips.appendChild(rocket);
                rocket.appendChild(rocketName);
                rocket.appendChild(rocketCost);
            });
        }
        
}

//try to import an image within this HTML from the spaceX API