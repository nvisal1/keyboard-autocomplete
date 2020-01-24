# Keyboard Autocomplete [![Build Status](https://travis-ci.org/nvisal1/keyboard-autocomplete.svg?branch=master)](https://travis-ci.org/nvisal1/keyboard-autocomplete)

View this application at http://keyboardautocompletealgorithm-env.mqfpgdum8p.us-east-1.elasticbeanstalk.com/

## Introduction

The purpose of this project is to implement an algorithm that will learn the words typed by the user over time and then determine a ranked list of autocomplete candidates given a word fragment. The algorithm is capable of being trained in an online manner, meaning that additional training passages can be submitted and incorporated into the algorithm at the same time as the algorithm is being used to provide autocomplete suggestions.

NOTE: All commands listed in this README assume that you are at the root directory (the same directory as this README).

## Architecture

This project includes the Autocomplete Client and the Autocomplete Service. The Autocomplete Client allows users to train and search across the algorithm. The Autocomplete Service wraps the implementation of the algorithm and exposes an Express server for client consumption. 

## Tests

Unit tests are included for both the Autocomplete Client and Autocomplete Service. 

In order to run the tests for an individual project, please follow the instructions in that project's main README. Please refer to the `README References` section at the bottom of this README.


## Running In Development

Each project can be built individually by following the instructions in the project's main README.
If you do not want to use Docker, the README files that are listed in the `README References` section will explain how to build each project with npm.

This section will explain how to run both projects with Docker. 

### Docker Compose

#### Local Build

The following command will build both project images locally.

```
$ docker-compose up
```

The client will be visible at localhost:3000

#### 

## Training The Algorithm

Although the Autocomplete Client provides a form for training the algorithm, I have included a script to insert a list of common stop words into the algorithm. Running this script is completely optional, but may provide a better user experience. 

NOTE: The Autocomplete Service must be running in order for this script to work.

The script can be ran with the following command
```
$ cd autocomplete-training
$ npm i
$ node train.js
```

## CI/CD

Every push to the master branch triggers a Travis CI workflow that runs all tests and deploys the new code to production.


## README References

The main README location for each project is listed here

- Autocomplete Client: `autocomplete-client/README.md`
- Autocomplete Service: `autocomplete-service/README.md`
