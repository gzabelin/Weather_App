localStorage.clear();

var fetchTime = localStorage.getItem("fetchTime");
var currentTime = Date.now();
var elapsedTimeInHours = (currentTime-fetchTime)/(1000*60*60);
var checkDataAvailability = JSON.parse(localStorage.getItem("weatherData"));


if ((checkDataAvailability == null) || (elapsedTimeInHours>24)){
    console.log("fetching data");
    fetch ("https://api.myjson.com/bins/i8run", {
        method: "GET",
    //    headers: {'X-API-Key': "Key goes inside the quotes"}

    }).then(function (response){
        if (response.ok){return response.json();}
        throw new Error(response.statusText);

    }).then(function (json){
        window.localStorage.setItem("fetchTime", Date.now());
        var receivedData = json;
        
        window.localStorage.setItem("weatherData", JSON.stringify(receivedData));
        var storedData = JSON.parse(localStorage.getItem("weatherData"));
        var weather = storedData.list;
        
        callVue (weather);
        displayDate();

    }).catch(function(error){console.log("Request failed: " + error.message);});
}

else {
        
    console.log(" retreiving data from local storage ");
    var storedData = JSON.parse(localStorage.getItem("weatherData"));
    var weather = storedData.list;

    callVue (weather);
    displayDate();
}



function displayDate(){
    
    var d = new Date().toDateString();
    
    document.getElementById("date").textContent = d;
}

function callVue (weather){  

    new Vue({
    
    el: "#pageBody",
    
    data: {
            weather: weather,
            dropDownBox: 'Yafran',
            iconURL: 'something',
        
            searchBox: ''
        
    },
    
    methods: {
        
        setIconURL: function (city){
            this.iconURL= "http://openweathermap.org/img/w/"+city.weather[0].icon+".png";
            return this.iconURL;
        }
                       
    },
    
    computed: {
                 
       filteredBooks: function (){
            return this.myBooks.filter((aBook)=>{
                return (aBook.titulo.toLowerCase().includes(this.searchBox.toLowerCase())) || (aBook.descripcion.toLowerCase().includes(this.searchBox.toLowerCase())) ;
            })
        } 
    }    

});

}



var towns =cities.features[2].properties.city; //this code is correct

console.log(towns);

function justGetAllTowns (){
    var allTowns =[];
    for (i=0;i<cities.features.length;i++){
        allTowns.push(cities.features[i].properties.city);
        
    }
    return allTowns;
}

console.log(justGetAllTowns());     // this code is also correct








