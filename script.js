const API_KEY = '0de4485f330360fb2ff4a017c7a4ac6c';
const citiesData = [
    { city: "Kuala Lumpur", lat: 3.1478, long: 101.6953 },
    { city: "Ipoh", lat: 4.5972, long: 101.075 },
    { city: "George Town", lat: 5.4144, long: 100.3292 },
    { city: "Kuantan", lat: 3.8167, long: 103.3333 },
    { city: "Shah Alam", lat: 3.0722, long: 101.5167 },
    { city: "Johor Bahru", lat: 1.4556, long: 103.7611 },
    { city: "Kota Bharu", lat: 6.1333, long: 102.25 },
    { city: "Melaka", lat: 2.1944, long: 102.2486 },
    { city: "Kota Kinabalu", lat: 5.975, long: 116.0725 },
    { city: "Kuching", lat: 1.5575, long: 110.3439 },
    { city: "Kuala Terengganu", lat: 5.3292, long: 103.1361 },
    { city: "Alor Setar", lat: 6.1183, long: 100.3694 },
    { city: "Labuan", lat: 5.3, long: 115.22 },
    { city: "Putrajaya", lat: 2.93, long: 101.69 },
    { city: "Kangar", lat: 6.4333, long: 100.2 },
    { city: "Seremban", lat: 2.7222, long: 101.9417 }
];

const currentWeatherBody = document.getElementById('currentWeatherBody');
const forecastBody = document.getElementById('forecastBody');





    currentWeatherBody.innerHTML = '';
    forecastBody.innerHTML = '';
    const fetchPromises = [];
    const forecastPromises = [];

    citiesData.forEach((cityData, index) => {
        
        
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.long}&appid=${API_KEY}&units=metric`;
        
        const fetchPromise = fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process data here if needed
            const date = new Date(data.dt * 1000); // Convert UNIX timestamp to milliseconds
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            const formattedDate = `${date.toLocaleDateString('en-MY',options)} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            const weatherIconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cityData.city}</td>
                <td>${formattedDate}</td>
                <td><img class="weather-icon" src="${weatherIconUrl}" alt="Weather Icon"></td>
                <td>${data.weather[0].description}</td>
                <td>${Math.round(data.main.temp)}°C</td>
            `;
            currentWeatherBody.appendChild(row);

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        fetchPromises.push(fetchPromise);

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
    
            // Clear inner HTML of currentWeatherBody
            
    
           
        })
        .catch(error => console.log('Error fetching weather:', error));


        const Forecast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.long}&appid=${API_KEY}&units=metric`;

        const forecastPromise = fetch(Forecast_API)
        .then(response => response.json())
        .then(data => {
            console.log(data);
    
    
           
    
            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const options = { day: '2-digit', month: 'long', year: 'numeric' };
                const formattedDate = `${date.toLocaleDateString('en-MY',options)} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cityData.city}</td>
                    <td>${formattedDate}</td>
                    <td><img class="weather-icon" src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather Icon"></td>
                    <td>${forecast.weather[0].description}</td>
                    <td>${Math.round(forecast.main.temp)}°C</td>
                `;
                forecastBody.appendChild(row);
            });

        })
        .catch(error => console.log('Error fetching forecast:', error));

        forecastPromises.push(forecastPromise);

    });

    Promise.all(fetchPromises)
    .then(() => {
        // All fetch operations have completed, so initialize DataTable
        $(document).ready(function () {
            $('#currentWeatherTable').DataTable({
                "lengthMenu": [[-1], ["All"]],
                "lengthChange": false
            });
        });
    })
    .catch(error => {
        console.error('Error during fetch operations:', error);
    });

    Promise.all(forecastPromises)
    .then(() => {
        // All fetch operations have completed, so initialize DataTable
        $(document).ready(function () {
            $('#forecastTable').DataTable({
                "lengthMenu": [[-1], ["All"]],
                "lengthChange": false
            });
        });
    })
    .catch(error => {
        console.error('Error during fetch operations:', error);
    });


    


   