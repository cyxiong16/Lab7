// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        // Change to single entry page when entry is clicked
        newPost.addEventListener('click', () => {
          let entryNum = router.findEntryNum(entry);
          window.history.pushState({page_id: 2, entry: entry}, "", "#entry" + entryNum);
          setState(entry);
        });
      });
    });

    // Go to home page
    document.querySelector('h1').addEventListener('click', () => {

      // Make changes if not already on home page
      if(window.location.hash != "") {
        window.history.pushState({page_id: 0}, "", window.location.origin + "/Lab7/");
        setState();
      }
    });

    // Go to settings page
    document.querySelector('img').addEventListener('click', () => {

      // Make changes if not already on settings page
      if(window.location.hash != "#settings") {
        window.history.pushState({page_id: 1}, "", "#settings");
        setState();
      }
    });

    // Moving through session history
    window.addEventListener('popstate', (event) => {
      if(event.state == null) {
        setState();
        return;
      }

      if(event.state.page_id == 2) {
        setState(event.state.entry);
      }
      else {
        setState();
      }
    });
});

//Service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}