const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const animeText = document.getElementById('anime');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new__quote');
const loader = document.getElementById('loader');

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new quote, General quotes api: https://type.fit/api/quotes
// function newQuote() {
//     loading();
//     //pick a random quote from apiQuotes array
//     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
//     //check if author is blank, replace with unknown
//     if (!quote.author) {
//         authorText.textContent = 'Unknown';
//     } else {
//         authorText.textContent = quote.author;
//     }
//     //check quote length to determine styling
//     if (quote.text.length > 80) {
//         quoteText.classList.add('long__quote');
//     } else {
//         quoteText.classList.remove('long__quote');
//     }
//     // set quote, hide loader
//     quoteText.textContent = quote.text;
//     complete();
// }

// anime quotes api
function newQuote() {
    loading();
    //author of quote
    authorText.textContent = `${apiQuotes.character}`;
    animeText.textContent = `${apiQuotes.anime}`;
    // check quote length to determine styling
    if (apiQuotes.quote.length > 80) {
        quoteText.classList.add('long__quote');
    } else {
        quoteText.classList.remove('long__quote');
    }
    //set quote, hide loader
    quoteText.textContent = apiQuotes.quote;
    complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://animechan.vercel.app/api/random';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        newQuote();
        // recursive, need to add counter if api is down
    }
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} from ${animeText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//event listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//On load
getQuotes();
