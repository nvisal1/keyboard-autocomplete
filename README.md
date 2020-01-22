# Keyboard Autocomplete

## Introduction

The purpose of this project is to implement an algorithm that will learn the words typed by the user over time and then determine a ranked list of autocomplete candidates given a word fragment. The algorithm is capable of being trained in an online manner, meaning that additional training passages can be submitted and incorporated into the algorithm at the same time as the algorithm is being used to provide autocomplete suggestions.

NOTE: All commands listed in this README assume that you are at the root directory (the same directory as this README).

## Architecture

This project includes the Autocomplete Client and the Autocomplete Service. The Autocomplete Client allows users to train and search across the algorithm. The Autocomplete Service wraps the implementation of the algorithm and exposes an Express server for client consumption. 

## Tests

Unit tests are included for both the Autocomplete Client and Autocomplete Service. 

In order to run the tests for an individual project, please follow the instructions in that project's main README. Please refer to the `README References` section at the bottom of this README.
```
$ docker-compose -f ./docker-compose-overrides/docker-compose.test.yml up
```

After the tests are finished running, you can clean up the environment by running the following commands.

```
$ docker-compose down
$ docker-compose rm
```

## Running In Development

Each project can be built individually by following the instructions in the project's main README.
If you are unfamiliar with Docker or do not have it installed, these sections will explain how to build each project with npm. Please refer to the `README References` section at the bottom of this README. 

This section will explain how to run both projects. 

### Docker Compose

#### Local Build

The following command will override the `docker-compose.yml` file at the root with instructions to build each project image locally.

```
$ docker-compose -f docker-compose.yml -f docker-compose-overrides/docker-compose.local.yml up
```

#### 

#### Dockerhub

The following command will use the `docker-compose.yml` file at the root. This script will pull and run the already-built images from Dockerhub.

```
$ docker-compose up
```

## Training The Algorithm

Although the Autocomplete Client provides a form for training the algorithm, I have included a script to insert a list of common stop words into the algorithm. Running this script is completely optional, but may provide a better user experience. 

NOTE: The Autocomplete Service must be running in order for this script to work.

The script can be run with the following command
```
$ cd autocomplete-training
$ npm i
$ node train.js
```


## README References

The main README location for each project is listed here

- Autocomplete Client: `autocomplete-client/README.md`
- Autocomplete Service: `autocomplete-service/README.md`
