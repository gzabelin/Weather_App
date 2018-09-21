var inputListener = new Vue({
    el: '#searchField',
    data: {
        userInput:'',
        logoShow: true,
        variable: 5
        
    },
    methods: {

        sendInput: function () {
            
            console.log("functions launched!")
            fetchData();
            
            displayData.setDate();
            
            this.userInput='';
            this.logoShow=false;
        
        },
        
        decrementVariable: function(){
            this.variable
        }
    }
})



function createAPICall() {

    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=";
    var userQuery = inputListener.userInput;
    var apiOptions = "&units=metric";
    var myAPIKey = "&APPID=01cc3668bf0bfa5175682312eac66c93";
    
    return weatherAPI + userQuery + apiOptions + myAPIKey;
}





function fetchData() {
    console.log("fetching data with the following query: " + inputListener.userInput);

    fetch(createAPICall(), {
        method: "GET",
        //    headers: {'X-API-Key': "Key goes inside the quotes"}

    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);

    }).then(function (json) {
        var weatherData = json;

        displayData.setWeather(weatherData);
        //displayDate();

    }).catch(function (error) {
        console.log("Request failed: " + error.message);
    });
}





var displayData = new Vue({

        el: "#cityData",

        data: {
            weather: '',
            iconURL: 'something',
            dateToday: "some day"

        },

        methods: {
            
            setWeather: function(weatherData){
                this.weather = weatherData;
            },
            
            setDate: function(){
                this.dateToday= new Date().toDateString();
            },
                        
            setIconURL: function (weather) {
                this.iconURL = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
                return this.iconURL;
            }

        },

//        computed: {
//
//            filteredBooks: function () {
//                return this.myBooks.filter((aBook) => {
//                    return (aBook.titulo.toLowerCase().includes(this.searchBox.toLowerCase())) || (aBook.descripcion.toLowerCase().includes(this.searchBox.toLowerCase()));
//                })
//            }
//        }

    });




// var towns = cities.features[2].properties.city; //this code is correct

// console.log(towns);

function justGetAllTowns() {
    var allTowns = [];
    for (i = 0; i < cities.features.length; i++) {
        allTowns.push(cities.features[i].properties.city);

    }
    return allTowns;
}

// console.log(justGetAllTowns());     // this code is also correct
