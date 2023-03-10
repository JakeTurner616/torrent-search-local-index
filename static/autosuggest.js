const queryInput = document.getElementById('query');
const autocomplete = document.getElementById('autocomplete');
autocomplete.style.display = 'none'; // hide the autocomplete div initially

// Hide the autocomplete menu when the user clicks outside of it or the input box
document.addEventListener('click', function(event) {
  var autocompleteBox = document.getElementById('autocomplete');
  var inputBox = document.getElementById('query');
  if (event.target != autocompleteBox && event.target != inputBox) {
    autocompleteBox.style.display = 'none';
  }
});

// Send a request to the Google suggestqueries API and display the results in the autocomplete menu
queryInput.addEventListener('input', () => {
  const query = queryInput.value;
  if (query.length >= 3) {
    autocomplete.style.display = 'block'; // show the autocomplete div when there are at least 3 characters in the text box
    const url = `https://suggestqueries.google.com/complete/search?callback=suggestCallBack&q=${query}&client=youtube`;
    const script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
  } else {
    autocomplete.style.display = 'none'; // hide the autocomplete div when there are less than 3 characters in the text box
    autocomplete.innerHTML = '';
  }
});

// Callback function that receives the suggestqueries API results and displays them in the autocomplete menu
function suggestCallBack(data) {
  const suggestions = data[1];
  const html = suggestions.map(suggestion => `<li onclick="replaceQuery('${suggestion[0]}')">${suggestion[0]}</li>`).join('');
  autocomplete.innerHTML = html;
}

// Replace the search query in the input field with the selected suggestion and submit the search form
function replaceQuery(query) {
  queryInput.value = query;
  autocomplete.innerHTML = '';
  document.forms[0].submit(); // submit the form
}

// Show the autocomplete menu when the input box is clicked (if there are at least 3 characters in the text box)
queryInput.addEventListener('click', () => {
  if (queryInput.value.length >= 3) {
    autocomplete.style.display = 'block'; // show the autocomplete div when the input box is clicked and there are at least 3 characters in the text box
  }
});