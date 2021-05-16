// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(entry) {
  /**
   * - There are three states that your SPA app will have
   *    1. The home page
   *    2. The entry page (showing one individual entry)
   *    3. The settings page (currently blank, no actual settings here, just a placeholder where a real settings page would go)
   * 
   * - If you look at the CSS, we have 2 classes you can add to the body element to help change states, "settings" and "single-entry"
   * - Changing states will require more than just changing these classes, for example the settings page requires you to change the title to "Settings"
   * - And each individual entry the title changes to "Entry #" based on it's number in the entry order
   *
   * - When changing states, make sure the back and forward buttons work. You can use hash URLs (e.g. https://someurl.com/#settings) when changing states
   *   to make things easier.
   * - Similarly, when viewing an individual entry, a hashed URL might look like https://someurl.com/#entry3
   * 
   * - Some tips:
   *    1. Push a new state object to the history object using history.pushState() 
   *    2. look up the documentation for how to use pushState() when you try it
   *    3. look up the documentation for the "popstate" event listener (fires only on back button), useful in your script.js file
   *    4. For each <journal-entry> element, you can grab the JSON version of its info with .entry (e.g. someJournalEntryElement.entry)
   *       a. This is useful when viewing a single entry. You may notice an <entry-page> element in the HTML, this is the element that is displayed when the
   *          .single-entry class is applied to the body. You can populate this element by using .entry similarly. So if I wanted to grab a specific <journal-entry>
   *          and populate it's info into the <entry-page>, I would simply use an assignment of entryPageElement.entry = journalEntryElement.entry
   *       b. Clearing the <entry-page> element of its previous data can be a bit tricky, it might be useful to just delete it and insert a new blank one 
   *          in the same spot each time. Just a thought.
   *
   * - Answers to some questions you may have:
   *    1. You may add as many helper functions in this file as you like
   *    2. You may modify the parameters of setState() as much as you like
   */

   // Set state to home page
   if(window.location.hash == "") {
    document.querySelector('body').setAttribute("class", "");
    document.querySelector('h1').innerText = "Journal Entries";
   }

   // Set state to settings page
   else if(window.location.hash == "#settings") {
     document.querySelector('body').setAttribute("class", "settings");
     document.querySelector('h1').innerText = "Settings";
   }

   // Set state to entry's page
   else {
     let entryNum = router.findEntryNum(entry);

     document.querySelector('body').setAttribute("class", "single-entry");
     document.querySelector('h1').innerText = "Entry " + entryNum;

     // Remove entry and create new one
     document.querySelector('entry-page').remove();
     let newEntry = document.createElement('entry-page');
     document.querySelector('body').appendChild(newEntry);
     document.querySelector('entry-page').entry = entry;
   }
}

/**
 * Helper function to find entry number
 * @param {*} entry current entry whose number needs to be found
 */
router.findEntryNum = function(entry) {

  // Get all entry posts
  let entries = document.querySelector('main').children;
  let entryNum;

  for(let i = 0; i < 10; i++) {

    // Check which entry it is, based on entry's title
    if(entries[i].entry.title == entry.title) {
      entryNum = i + 1;
      break;
    }
  }
  return entryNum;
}