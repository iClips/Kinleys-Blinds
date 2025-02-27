"use strict";

console.log("Script started");

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("Content loaded");

  if (document.getElementById("sign_in") !== null) {
    console.log("Sign in element found");
    document.getElementById("sign_in").onclick = function() {
      console.log("Sign in button clicked");
      onSignIn();
    };
  } else {
    console.log("Sign in element not found");
  }

  function onSignIn() {
    console.log("onSignIn function called");
    window.location.href = "./dashboard.html";
  }

  if (document.getElementById("nav_response") !== null) {
    console.log("Nav response element found");
    document.getElementById("nav_response").onclick = function() {
      console.log("Nav response button clicked");
      onNavResponse();
    };
  } else {
    console.log("Nav response element not found");
  }

  function onNavResponse() {
    console.log("onNavResponse function called");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      console.log("Topnav class found");
      x.className += " responsive";
    } else {
      console.log("Topnav class not found");
      x.className = "topnav";
    }
  }
});

    console.log("Tab navigation elements selection started");
    
    const tabNav = document.querySelectorAll('.topnav a');
    
    console.log("Tab navigation elements selected");
    
    tabNav.forEach((tab) => {
            console.log("Event listener added to tab navigation element");
            tab.addEventListener('click', (e) => {
            console.log("Tab navigation element clicked");
            const targetTabPane = document.querySelector(e.target.getAttribute('href'));
            console.log("Target tab pane selected");
            
            document.querySelectorAll('.tab-pane').forEach((pane) => {
              console.log("Tab pane hidden");
              pane.classList.remove('active');
            });
            
            console.log("Target tab pane shown");
            targetTabPane.classList.add('active');
            
            document.querySelectorAll('.topnav a').forEach((navTab) => {
              console.log("Tab navigation element deactivated");
              navTab.classList.remove('active');
            });
            
            console.log("Active tab navigation element updated");
            e.target.classList.add('active');
      });
});
