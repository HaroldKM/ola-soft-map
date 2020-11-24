

    //A trick for lazy people lol >_<
  var getId = (id) => {return document.getElementById(id)};

  //fucntion to be call at everytime the mouse move to get it's actual position
  function move(e) {
    getId("popup").style.left = e.pageX + 20 + "px";
    getId("popup").style.top = e.pageY + 10 + "px";
  }

  //function that shows the message on the popup
  function showText(text) {
    getId("popup").style.visibility = "visible";
    getId("popup").innerHTML = text;
    getId("popup").firstChild.innerHTML = text;  
  }
  
  var paths = document.querySelectorAll("path");  

  
  
  //function to fill the object table with property and value
  var fillInfo = function(path) {
    var departement = new Object();
    departement.id = path.getAttribute("id");
    departement.name = path.getAttribute("name");
    departement.actualCase = 12;
    departement.healed = 0;
    departement.dead = 0;
    return departement; 
  }


  //empty object table
  var tabIndex = [];

  //filling information on the table
  for(let i = 0; i < paths.length; i++){
    
    tabIndex.push(fillInfo(paths[i]));
  };

  console.log(tabIndex[98]);

  tabIndex[30].actualCase = 1222;
  tabIndex[7].actualCase = 600;
  tabIndex[99].actualCase = 668;
  
  // Function which insert the color on paths based on the number of cases
  var color = function(tableau, path){
    path.setAttribute("fill-opacity", '0.5');
    if(tableau.actualCase < 100){
      path.setAttribute("fill", "rgba(69,179,126,1)");
    }else if(tableau.actualCase < 200){
      path.setAttribute("fill", "rgba(255,190,0,1)");
    }else if(tableau.actualCase > 500){
      path.setAttribute("fill", "rgba(234,57,67,1)")
    };
  };

  

  for (let i = 0; i < tabIndex.length; i++) {
    color(tabIndex[i], paths[i]);
  }


/*
 * Remove the page refresh when submiting the search form and filling
 * the table with statistique of the departement
 */

var form = document.getElementById("form");
form.addEventListener('submit', (e) =>{
    e.preventDefault();
    var input = document.getElementById("search"); 
    var confirmed = document.getElementById("Confirmed_number");
    var healed = document.getElementById("Healed_number");
    var dead = document.getElementById("Dead_number");
    var areaName = document.getElementById("area_name");
    //remove the color class from paths at every search and give it to the departement which name's have been searched
    for (let i = 0; i < paths.length; i++) {
      if(paths[i].classList.contains("color")){
        paths[i].classList.remove("color");
      }
    }
    for(let i = 0; i < tabIndex.length; i++) {
      if(tabIndex[i].id != null && tabIndex[i].id == paths[i].id){
        if(input.value == tabIndex[i].id || input.value == tabIndex[i].id.toLowerCase()) {
          paths[i].classList.add("color");    
          areaName.innerHTML = tabIndex[i].id;    
          confirmed.innerHTML = tabIndex[i].actualCase;
          healed.innerHTML = tabIndex[i].healed;
          dead.innerHTML = tabIndex[i].dead;
          input.value = "";
        }
      }
    }
});

/*
 * Here we will switch to departement 
 * so our function listen to click on the map button and remove the map which is on the top 
 */
 

for (let i = 0; i <= 87; i++) {
  paths[i].classList.add("hidden");
}

 //button for the switch -> just change the  on click
var icon = document.getElementById("icon");
icon.addEventListener('click', () => {
  // Switching to communes source iframes
  var p = document.getElementById("paragraph_icon");
  for (let i = 0; i <=87; i++) {
    paths[i].classList.toggle("hidden");
  }
  
  for(let i = 88; i < paths.length; i ++){
    if (paths[i].classList.contains("hidden")) {
      p.innerHTML = "Voir la carte par: <b>Communes</b>";
    }else{
      p.innerHTML = "Voir la carte par: <b>Départements</b>";

    }
    paths[i].classList.toggle("hidden");
  }
});
  

  //*******************************************Responsive logique**********************************/
/*
  *************************************************Algo*******************************************
  Goal: resize the attribute viewbox of the svg when it comes on mobile screen size 
  *get the screen size first
  *get the viewBox value
  *if the screen size is equal or less than 414px (breakpoint: http://devfacts.com/media-queries-breakpoints-2020/)
    *set the viweBox value to fit the screen (here we will tweak it to fit the screen);
*/

// var screenSize = screen.width;

//   var responsive = function () {

//     var viewBox = document.querySelector("svg"); 
//      if(screenSize <= 414){
//       viewBox.setAttribute("viewBox", "0 0 1000 2500");
//       viewBox.setAttribute("height", "270");
//       viewBox.setAttribute("width", "100");

      
//      }
//   };
//   responsive();

/*************************************************
 *
 * POPUP LOGIC
 *
 **************************************************/
  
  //Positionning and showing the popup with information filled in 
  paths.forEach(function (path) {
    //listening to mousemove on all path and calling the move function to get the actual position of the mouse
    path.addEventListener("mousemove", move);
    
    path.addEventListener("mouseover", function (e) {
    for(var i = 0; i < tabIndex.length; i++){
      if(tabIndex[i].name != null){
        if(tabIndex[i].name === this.getAttribute("name")){
          showText(tabIndex[i].name 
            + " <br> Actualcases: "  + tabIndex[i].actualCase
            + " <br> Healed: " + tabIndex[i].healed
            + " <br> Dead: " + tabIndex[i].dead
            );  
        }
      }else if(tabIndex[i].name == null || tabIndex[i].name == undefined){
        if(tabIndex[i].id === this.getAttribute("id")){
          showText(tabIndex[i].id 
            + " <br> Actualcases: "  + tabIndex[i].actualCase
            + " <br> Healed: " + tabIndex[i].healed
            + " <br> Dead: " + tabIndex[i].dead
            );  
        }
      }
        
      }
    });

    path.addEventListener("mouseleave",function (e) {
      getId("popup").style.visibility = "hidden";
    })
    
  })



  

  // //**************************************************Dark-mode logic *********************/

  // var addClass = function (selection, cssClass) {
  //   if(document.querySelector(selection).style.backgroundColor != undefined || document.querySelector(selection).style.backgroundColor != null){
  //     return  document.querySelector(selection).classList.add(cssClass);
  //   }
  // }

  // var removeClass = function (selection, cssClass) {
  //     return document.querySelector(selection).classList.remove(cssClass);   
  // }

  // var darkbtn = document.getElementById("dark");
  // darkbtn.addEventListener("click", function () {

  //   if(darkbtn.checked){
  //     addClass(".navbar", "dark");
  //     addClass("body", "dark");
  //     for(path of paths){
  //       path.classList.add("darkmap");
  //     }
  //   }else{
  //     removeClass(".navbar", "dark");
  //     removeClass("body", "dark");
  //     for(path of paths){
  //       path.classList.remove("darkmap");
  //     }
  //   }
      
  // });



