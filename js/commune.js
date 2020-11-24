
(function () {
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
  console.log(paths);
  

  //function to fill the  table with object
  var fillInfo = function(path) {
    var commune = new Object();
    commune.id = path.getAttribute("id");
    commune.actualCase = 0;
    commune.healed = 0;
    commune.dead = 0;
    return commune; 
  }

  //empty object table
  var tabIndex = [];

  //filling information on the table
  for(let i = 0; i < paths.length; i++){
    tabIndex.push(fillInfo(paths[i]));
  }

  tabIndex[5].actualCase = 1222;
  tabIndex[7].actualCase = 600;
  tabIndex[1].actualCase = 198;
  
  //Inserting the color base on the cases
  var color = function(tableau, path){
    if(tableau.actualCase < 100){
      console.log(tableau.actualCase);
      path.setAttribute("fill", "#45B37E");
    }else if(tableau.actualCase < 200){
      path.setAttribute("fill", "#FFBE00");
    }else if(tableau.actualCase > 500){
      path.setAttribute("fill", "#EA3943")
    };
  };

  paths.forEach(function (path) {
    path.addEventListener('mouseover', function () {
      path.classList.add("color");
    });
    path.addEventListener('mouseleave', function () {
      path.classList.remove("color");
    });
  });
  

  for (let i = 0; i < tabIndex.length; i++) {
    color(tabIndex[i], paths[i]);
  }
  


  paths.forEach(function (path) {
    //listening to mousemove on all path and calling the move function to get the actual position of the mouse
    path.addEventListener("mousemove", move);
    
    path.addEventListener("mouseover", function (e) {
    for(var i = 0; i < tabIndex.length; i++){
        if(tabIndex[i].id === this.getAttribute("id")){
          showText(tabIndex[i].id 
            + " <br> Actualcases: "  + tabIndex[i].actualCase
            + " <br> Healed: " + tabIndex[i].healed
            + " <br> Dead: " + tabIndex[i].dead
            );  
        }
      }
    });
    path.addEventListener("mouseleave",function (e) {
      getId("popup").style.visibility = "hidden";
    })
    
  })
  
  //*******************************************Responsive logique**********************************/
/*
  *************************************************Algo*******************************************
  Goal: resize the attribute viewbox of the svg when it comes on mobile screen size 
  *get the screen size first
  *get the viewBox value
  *if the screen size is equal or less than 414px (breakpoint: http://devfacts.com/media-queries-breakpoints-2020/)
    *set the viweBox value to fit the screen (here we will tweak it to fit the screen);
*/


  var responsive = function () {
    var screenSize = screen.width;
    var viewBox = document.querySelector("svg"); 
     if(screenSize <= 414){
      viewBox.setAttribute("viewBox", "0 0 1000 2500");
      viewBox.setAttribute("height", "100vh");
      viewBox.setAttribute("width", "100vw");
      console.log(screenSize);
      
     }
  };

responsive();
  //**************************************************Dark-mode logic *********************/

  var addClass = function (selection, cssClass) {
    if(document.querySelector(selection).style.backgroundColor != undefined || document.querySelector(selection).style.backgroundColor != null){
      return  document.querySelector(selection).classList.add(cssClass);
    }
  }

  var removeClass = function (selection, cssClass) {
      return document.querySelector(selection).classList.remove(cssClass);   
  }

  var darkbtn = document.getElementById("dark");
  darkbtn.addEventListener("click", function () {

    if(darkbtn.checked){
      addClass(".navbar", "dark");
      addClass("body", "dark");
      for(path of paths){
        path.classList.add("darkmap");
      }
    }else{
      removeClass(".navbar", "dark");
      removeClass("body", "dark");
      for(path of paths){
        path.classList.remove("darkmap");
      }
    }
      
  });
})();


