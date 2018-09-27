
// var towns = cities.features[2].properties.city; //this code is correct

// console.log(towns);

function justGetAllTowns() {
    var allTowns = [];
    for (i = 0; i < cities.features.length; i++) {
        allTowns.push(cities.features[i].properties.city);

    }
    return allTowns;
}

 //console.log(justGetAllTowns());     // this code is also correct


function getAllCoordinates() {
    var allCoords = [];
    for (i = 0; i < cities.features.length; i++) {
        
        if (cities.features[i].geometry===null){
        }else{
         allCoords.push({"lon":cities.features[i].geometry.coordinates[0], "lat":cities.features[i].geometry.coordinates[1]});
        }

    }
    return allCoords;
}

// console.log(getAllCoordinates()); /// this works !!!



var bigCities = justGetAllTowns();

var allCities;

function compareCityLists (){
    var matchingCities = [];
    for(i=0; i<allCities.length; i++){
        for(j=0; j<bigCities.length; j++){
            if(bigCities[j]==allCities[i].name){
                console.log("match found. big city = "+bigCities[j]+"; allCity = " + allCities[i].name);
               matchingCities.push("'"+allCities[i].name +", "+ allCities[i].country+"'");
                break;
               }
        }
        
    }
    matchingCities.sort();
    
    for (k=0; k<matchingCities.length; k++){
        
        if (matchingCities[k]==matchingCities[k+1]){
            matchingCities.splice(k, 1);
        }
    };
    for (k=0; k<matchingCities.length; k++){
        
        if (matchingCities[k]==matchingCities[k+1]){
            matchingCities.splice(k, 1);
        }
    };
    for (k=0; k<matchingCities.length; k++){
        
        if (matchingCities[k]==matchingCities[k+1]){
            matchingCities.splice(k, 1);
        }
    };
    for (k=0; k<matchingCities.length; k++){
        
        if (matchingCities[k]==matchingCities[k+1]){
            matchingCities.splice(k, 1);
        }
    };
    for (k=0; k<matchingCities.length; k++){
        
        if (matchingCities[k]==matchingCities[k+1]){
            matchingCities.splice(k, 1);
        }
    };
    for (k=0; k<matchingCities.length; k++){
        
        if (matchingCities[k]==matchingCities[k+1]){
            matchingCities.splice(k, 1);
        }
    };

    
//    var suggestedCities = Array.from(matchingCities);
//    
//    return suggestedCities;
    
    
    return matchingCities;
}


// console.log(compareCityLists());
// document.getElementById("exportDataLol").innerHTML=compareCityLists();




function findExcludedCities (){
    
    var excludedCities=[];
    
    for (i=0; i<bigCities.length; i++){
        excludedCities.push(bigCities[i]);
        var x = excludedCities.length-1;
        for (j=0; j<biggestTowns.length; j++){
            if (biggestTowns[j].slice(-0, -4)==excludedCities[x]){
                excludedCities.splice(x, 1);
                console.log("city removed");
                break;
                }
        }
    }
    return excludedCities;
    
}

console.log(findExcludedCities());


////////this works!!!
// Note: .slice(-0, -4)  removes last 4 characters from string, such as: ", RU"
// Note: .splice(x, 1) removes last item from array. 



/// my next problem... the excluded cities dont always yield a result when inserted into the API search query because of spelling. Example: "Āddīs Ābebā"... not only because of special characters but also because of spelling. 



/// function to feed all excluded cities to fetch and see if it works





function checkCitySpelling (list){
    
    var acceptedSpelling=[];
    var unacceptedSpelling=[];
    
        
    for (i=0; i<list.length; i++){
        
        console.log("checking city: " + list[i]);
        
        var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+list[i]+"&APPID=01cc3668bf0bfa5175682312eac66c93"
        
        fetch(apiCall, {
            method: "GET",

        }).then(function (response) {
            if (response.ok) {
                return response.json();

            }
            throw new Error(response.statusText);

        }).then(function (json) {
            console.log("success, adding city: " + list[i]);
            acceptedSpelling.push(list[i]);

        }).catch(function (error) {
            console.log("Request failed: " + error.message);
            unacceptedSpelling.push(list[i]);

        });
        
    }
    
    console.log("finished checking spelling");
    
    return acceptedSpelling;
    
   
    
}

checkCitySpelling(findExcludedCities());










