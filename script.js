'use strict';

// Elements
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnNextQuote = document.getElementById('next-quote');
const btnTwitter = document.getElementById('twitter');

let apiQuotes = [];

const showLoadingSpinner = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// New quotes
function newQuotes() {
  // Show loader
  showLoadingSpinner();
  // Pick up random quotes from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if author name is not given then display Unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown Author!';
  } else {
    authorText.textContent = quote.author;
  }
  // Decrease font-size if the text is too long
  if (quote.text.length > 70) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set quote, hide loader
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
}

// Twitter Button
const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
};

// Fetch Quote from API
async function getQuote() {
  // Show loader
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuotes();
  } catch (error) {
    console.log('Whoops no Quotes!', error);
  }
}

// Event Handler
btnNextQuote.addEventListener('click', newQuotes);
btnTwitter.addEventListener('click', tweetQuote);

// On Page Load
getQuote();
