var inputListener = new Vue({
    el: '#searchField',
    data: {
        userInput:'',
        logoShow: true,
        hintShow: false,
        kekShow: false,
        
    },
    methods: {

        sendInput: function () {
            
            if (this.userInput ==="kekistan"){
                this.kekShow = true;
                
            }else{
                this.kekShow = false;
                console.log("functions launched!")
                fetchData();

                displayData.setDate();

                this.userInput='';
                this.logoShow=false;
            }
        
        }
        
      
    }
})



function createAPICall() {

    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=";
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
        document.getElementById("angeryCat").setAttribute("class", "hidden");

    }).catch(function (error) {
        console.log("Request failed: " + error.message);
        document.getElementById("angeryCat").removeAttribute("class");
       // alert("You have commited a typo >:( \nTry again, correctly this time.");
        
    });
}





var displayData = new Vue({

        el: "#cityData",

        data: {
            weather: '',
            iconURL: 'something',
            iframeURL: 'some url',
            dateToday: "some day",
            showMap: false,
            linkText: 'Open Map',
            humidityText: '',
            windText: ''
            

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
            },
            
            setiframeURL: function (weather) {
                this.iframeURL ="http://maps.google.com/maps?q=" + weather.name + "+" + weather.sys.country + "&z=10&output=embed"
                return this.iframeURL;
            },
            
            setLinkText: function(){
                if(this.showMap==false){
                    this.linkText = "Open Map";
                }
                else {this.linkText = "Close Map"};
                return this.linkText;
            },
            


        },

        computed: {

//            filteredBooks: function () {
//                return this.myBooks.filter((aBook) => {
//                    return (aBook.titulo.toLowerCase().includes(this.searchBox.toLowerCase())) || (aBook.descripcion.toLowerCase().includes(this.searchBox.toLowerCase()));
//                })
//            }
            
            sethumidityText: function(weather){
                if(weather.weather.main.humidity<=25){
                    this.humidityText = "dry air = itchy times!";
                }
                else if (weather.weather.main.humidity>=70){this.humidityText = "ew, sweaty!"}
                else {this.humidityText = "comfy!"};
                return this.humidityText;
            },
            
            setwindText: function(weather){
                
                var wind = weather.weather.wind.speed; 
                
                if(wind<=5){
                    this.windText = "not a breeze"
                }
                else if (wind>5 && wind<10){this.windText = "freshhh"}
                                
                else if (wind>=10){this.windText = "windy!"}
                else if (wind>=17){this.windText = "HOLY SHIT YOU'RE FUCKED!!!"}
                return this.windText;
                         
            }            
                         

            
            
            
            
        }

    });










