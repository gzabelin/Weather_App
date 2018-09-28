
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
                break;
                }
        }
    }
    console.log ("these are the cities that DIDNT make it to the first round of creating suggestions: ");
    console.log(excludedCities);
    return excludedCities;
    
}

// var exclCities = findExcludedCities ();

//console.log(findExcludedCities());


////////this works!!!
// Note: .slice(-0, -4)  removes last 4 characters from string, such as: ", RU"
// Note: .splice(x, 1) removes last item from array. 



/// my next problem... the excluded cities dont always yield a result when inserted into the API search query because of spelling. Example: "Āddīs Ābebā"... not only because of special characters but also because of spelling. 



/// function to feed all excluded cities to fetch and see if it works

/// fetch didnt work because it was synchronous.
/// Vasil showed an asynchronous solution with XMLHttpRequest





function checkCitySpelling (list){
    
    var acceptedSpelling=[];
    var unacceptedSpelling=[];
        
    for (i=0; i<list.length; i++){
        
        console.log("checking city: " + list[i]);
        
        var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+list[i]+"&APPID=01cc3668bf0bfa5175682312eac66c93"
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {

              acceptedSpelling.push(list[i]);
          }
        };
        xhttp.open("GET", apiCall, false);
        xhttp.send();

        console.log("passed through checking: " + list[i]);
    }
    
    console.log("finished checking spelling");
    console.log(acceptedSpelling);
    
    var citiesToAdd ='';
    
    for (j=0; j<acceptedSpelling.length; j++){
        citiesToAdd = citiesToAdd + '"'+acceptedSpelling[j]+'"'+', ';
    }
    
    console.log(citiesToAdd);
    
}

//checkCitySpelling(findExcludedCities());

// okay this worked 400 cities have passed through the check and we added to "biggestTowns" file
// ... now I want to get an updated list of excluded cities


function findExcludedCitiesAgain (oldExcluded, newAdded){
    
    var newExcludedCities=[];
    
    for (i=0; i<oldExcluded.length; i++){
       
        newExcludedCities.push(oldExcluded[i]);
        var x = newExcludedCities.length-1;
        
        for (j=0; j<newAdded.length; j++){
        
            if (newAdded[j]==newExcludedCities[x]){
                
                newExcludedCities.splice(x, 1);
                break;
            }
        }
    }
    
    
    console.log ("these are the cities that DIDNT make it to the first round of creating suggestions: ");
    console.log(newExcludedCities);
    
    return newExcludedCities;
    
    
}    

// document.getElementById("exportDataLol").textContent=findExcludedCitiesAgain(exclCities, bigCitiesTwo);



///// this function got me a list of 800 cities. Most of them had special characters in their name. 

// I put them into a JS file called theLastOfExcludedCities

// To call them --->  var theLastOfExcludedCities;

console.log("these are teh last cities to be checked: ");
console.log(theLastOfExcludedCities);

/// i will now run them through the fetching function again



function checkCitySpellingAgain (list){
    
    var acceptedSpelling=[];
        
    for (i=0; i<list.length; i++){
        
        console.log("checking city: " + list[i]);
        
        var apiCall = "https://api.openweathermap.org/data/2.5/weather?q="+list[i]+"&APPID=2c36662239fe2e8cd2c56fb2e011947a";
//this is GERALDINE'S key        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
              
              console.log(this.responseText);
              acceptedSpelling.push(list[i]);
          }
        };
        xhttp.open("GET", apiCall, false);
        xhttp.send();

        console.log("passed through checking: " + list[i]);
    }
    
    console.log("finished checking spelling");
    console.log(acceptedSpelling);
    
    var citiesToAdd ='';
    
    for (j=0; j<acceptedSpelling.length; j++){
        citiesToAdd = citiesToAdd + '"'+acceptedSpelling[j]+'"'+', ';
    }
    
    console.log(citiesToAdd);
    
}

// checkCitySpellingAgain(theLastOfExcludedCities);


/// aaand I successfully ruined geraldine's api key as well 
// 430 new additions have been added to latestSuggestions

// I think I'm done here :D





















