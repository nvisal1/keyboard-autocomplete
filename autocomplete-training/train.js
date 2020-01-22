let englishStopWords = require('stopwords').english;
const axios = require('axios');

englishStopWords = englishStopWords.join(' ');

const instance = axios.create({ baseURL: 'http://localhost:5000' });
 
instance.post('/train', {
    passage: englishStopWords,
  })
  .then(function (response) {
    if (response.status === 204) {
        console.log('Success');
    } else {
        console.error(`Unexpected Response: ${ response.status }`);
    }
  })
  .catch(function (error) {
    if (error.response) {
        console.error(`Error Status: ${ error.response.status }.`);
    } else {
        console.error('Could not establish connection to the Autocomplete Service. Please ensure that the Autocomplete Service is running.');
    }
   
  });



