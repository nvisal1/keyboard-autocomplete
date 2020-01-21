# Autocomplete Client

The Autocomplete Client provides a user interface for communicating with the Autocomplete service. 


## Architecture



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

#### Dockerhub

```
$ docker run nvisal1/autocomplete-client
```


### React Scripts

```
npm start
```
