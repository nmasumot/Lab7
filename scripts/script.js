// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if('serviceWorker' in navigator){
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('sw.js').then(function(registration){
      console.log('ServiceWorker registration was successful with scope: ', registration.scope);
    }, function(err){
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
      ClickEvents();
    });
});

let settings = document.querySelector('img');
settings.addEventListener('click', () =>{
  if(history.state != null){
    if(history.state.state == 'settings'){
      //do nothing
    }else{
      var events = {
        state: 'settings'
      }
      setState(events,0,-1);
    }
  }else{
    var events = {
      state: 'settings'
    }
    setState(events,0,-1);
  }
  
});

function ClickEvents(){
  let JEntries = document.querySelector('main').childNodes;
  for(var i = 0; i < JEntries.length; i++){
    let event = JEntries[i];
    event.setAttribute('journal-number', i+1);
    event.addEventListener('click', () => {
      var events = {
        state:'single-entry',
        JEnt: event.entry
      }
      //console.log("Clicked Journal Entry Number " + event.getAttribute('journal-number'));
      setState(events,0,event.getAttribute('journal-number'));
    });
  }
}

window.addEventListener('popstate', (event) => {
  setState(event.state,1);
});


