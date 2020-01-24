# Autocomplete Client

The Autocomplete Client provides a user interface for communicating with the Autocomplete Service. 

## Modes

### Search

Search allows users to type words into an input field and view
relevant Candidates for each word fragment.

### Train

Train allows users to enter text passages into a form and submit
them. Each word in the text passage is entered into the algorithm.

### Search & Train

Search & Train allows users to type words into an input field and view
relevant Candidates for each word fragment. Every new word is entered
into the algorithm as the user searches.


## Tests

The Autocomplete Client includes unit tests and snapshot tests. All of these tests
will run with `npm test`.


## Running In Development

NOTE: The Autocomplete Client relies on the Autocomplete Service. The client will throw errors without the service.

### Docker

#### Local Build

```
$ docker build -t client .
$ docker run -p 80:80 client
```

Note: the production image will run on localhost:80 and use production backend.

#### Dockerhub

```
$ docker run nvisal1/autocomplete-client
```

Note: the production image will run on localhost:80 and use production backend.


### React Scripts

```
$ npm i
$ npm start
```