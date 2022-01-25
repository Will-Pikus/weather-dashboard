var searchBtn = document.querySelector('#search-button')
var searchInput = document.querySelector('#search-input')
var cityHeaderText  = document.querySelector('#tf-city')
var tfTemp = document.querySelector('#tf-temp')
var tfWind = document.querySelector('#tf-wind')
var tfHumid = document.querySelector('#tf-humid')
var tfUV = document.querySelector('#tf-uv')
var fdfContainer = document.querySelector('#fdf-row')

function handleClick(){
  getApi()
}

// populating todays forecast
function populateTData(data){
  var iconCode = data.weather[0].icon
  var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"

  cityHeaderText.textContent = data.name
  tfTemp.textContent = "Temp: " + data.main.temp + " °F"
  tfWind.textContent = "Wind: " + data.wind.speed + " MPH"
  tfHumid.textContent = "Humidity: " + data.main.humidity + "%"
  tfUV.textContent = "UV Index: " + data.name

}

// populating 5 day forecast dynamically
function populateFDFData(data){
  for (var i=0; i<5; i++){
    var fdfCard = document.createElement('div')
    fdfCard.classList.add("fdf-card")
    fdfContainer.appendChild(fdfCard)

    // append header
    var fdfCardHeader = document.createElement('h1')
    fdfCardHeader.classList.add("fdf-card-header")
    fdfCardHeader.textContent = data.list[i].dt_text
    fdfCard.appendChild(fdfCardHeader)

    // append temp
    var fdfCardP1 = document.createElement('p')
    fdfCardP1.classList.add("fdf-card-p")
    fdfCardP1.textContent = "Temp: " + data.list[i].main.temp + " °F"
    fdfCard.appendChild(fdfCardP1)

    // append wind
    var fdfCardP2 = document.createElement('p')
    fdfCardP2.classList.add("fdf-card-p")
    fdfCardP2.textContent = "Wind: " + data.list[i].wind.speed + " MPH"
    fdfCard.appendChild(fdfCardP2)

    // append humidity
    var fdfCardP3 = document.createElement('p')
    fdfCardP3.classList.add("fdf-card-p")
    fdfCardP3.textContent = "Humidity: " + data.list[i].main.humidity + " %"
    fdfCard.appendChild(fdfCardP3)
  }
}

function getApi() {
  var city = searchInput.value.trim()
  var tweatherRequest = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid=2a167aaa264850a68c45161b71185b00'
  var fdfweatherReqest = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid=2a167aaa264850a68c45161b71185b00'

  //Fetch current weather forecast
  fetch(tweatherRequest)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      populateTData(data)
    });

  //Fetch 5day forecast
  fetch(fdfweatherReqest)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      populateFDFData(data);
    });
}


    

  searchBtn.addEventListener('click', handleClick)