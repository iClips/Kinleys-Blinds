"use strict";
document.addEventListener("DOMContentLoaded", function(event) { 
    console.log("content loaded");
    if (document.getElementById("sign_in") !== null) {
        document.getElementById("sign_in").onclick = function() { onSignIn() };
    }
    
    function onSignIn() {
        window.location.href = "./dashboard.html";
    }
    
    if (document.getElementById("nav_response") !== null) {
        document.getElementById("nav_response").onclick = function() { onNavResponse() };
    }
    
    function onNavResponse() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
});

// Get the tab navigation elements
const tabNav = document.querySelectorAll('.topnav a');

// Add event listeners to each tab navigation element
tabNav.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    // Get the target tab pane
    const targetTabPane = document.querySelector(e.target.getAttribute('href'));

    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach((pane) => {
      pane.classList.remove('active');
    });

    // Show the target tab pane
    targetTabPane.classList.add('active');

    // Update the active tab navigation element
    document.querySelectorAll('.topnav a').forEach((navTab) => {
      navTab.classList.remove('active');
    });
    e.target.classList.add('active');
  });
});
