var searchBtn = document.querySelector('#search-button')
var searchInput = document.querySelector('#search-input')
var cityHeaderText  = document.querySelector('#tf-city')
var tfTemp = document.querySelector('#tf-temp')
var tfWind = document.querySelector('#tf-wind')
var tfHumid = document.querySelector('#tf-humid')
var tfUV = document.querySelector('#tf-uv')
var fdfContainer = document.querySelector('#fdf-row')
var historyContainer = document.querySelector('#history-container')

var cityArray = []

function handleClick(){
  while (fdfContainer.hasChildNodes()) {  
    fdfContainer.removeChild(fdfContainer.firstChild);
  }
  getApi()
}

// populating waether data
function populateData(data){
  // var iconCode = data.weather[0].icon
  // var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png"
  var cityName = data.city.name

  // populating todays forecast
  cityHeaderText.textContent = data.city.name +" ("+ moment().format("l")+")"
  tfTemp.textContent = "Temp: " + data.list[0].main.temp + " °F"
  tfWind.textContent = "Wind: " + data.list[0].wind.speed + " MPH"
  tfHumid.textContent = "Humidity: " + data.list[0].main.humidity + "%"
  tfUV.textContent = "UV Index: " 

  // populating 5 day forecast dynamically
  for (var i=1; i<6; i++){
    var fdfCard = document.createElement('div')
    fdfCard.classList.add("fdf-card")
    fdfContainer.appendChild(fdfCard)

    // append header
    var fdfCardHeader = document.createElement('h1')
    fdfCardHeader.classList.add("fdf-card-header")
    fdfCardHeader.textContent = moment().add(i,'days').format("l")
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

  // append city to local storage
  cityArray.push(cityName)
  localStorage.setItem("cities",cityArray)
  populateSearchHistory(cityName)
}

function populateSearchHistory(cityName){
  // get local storage object
  var localObj = localStorage.getItem("cities")
  // check if obj exists
  if (localObj){
    // iterate through local storage array for length
    for(i=0; i<localObj.length; i++) {
      // create el in dom
      var historyButton = document.createElement('button')
      historyButton.classList.add("history-button")
      historyButton.textContent = cityName
      historyContainer.appendChild(historyButton)
    }
  }
  else{

  }
}

function getApi() {
  var city = searchInput.value.trim()
  var weatherReqest = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid=2a167aaa264850a68c45161b71185b00'

  //Fetch 5day forecast
  fetch(weatherReqest)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      populateData(data);
    });
}

  populateSearchHistory()
  searchBtn.addEventListener('click', handleClick)