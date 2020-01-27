# Autocomplete Service

## Introduction

The Autocomplete Service contains the implementation of the keyboard autocomplete algorithm and exposes an Express API for client consumption. 

## API Contract Types

```
Candidate {
	word: string,
	confidence: number,
}
```

## Public Endpoints

```
GET /

Expected Status Code: 200
Content: Welcome Message
```
```
GET /candidates?text=<word fragment> 

Expected Status Code: 200
Content: Candidate[]
```
```
POST /train

Request Body: {
	passage: <text passage>
}

Expected Status Code: 204
Content: No Content
```

## Running Tests

All tests will run with `npm test`. 

## Autocomplete Algorithm

The implementation of the algorithm can be found at `/src/drivers/Trie/Trie.ts`

The autocomplete algorithm uses a trie data structure. The class exposes two methods: search and insert. The trie data structure allows for fast insert and lookup operations. The lookup operation for this algorithm is more complicated because it involves discovering the five most relevant matches. I used depth-first search to solve this problem. 

### Algorithm Steps

#### Insert

- Convert key to lowercase
- Tokenize the key (convert the key into an array of individual letters)
- Find the subtree root. This is done by iterating over the tokenized characters to find the last matching node in the tree. For example, if the tree contains the word `three` and the key is `throw`, the subtree root will be `r`. This ensures that the same word is not entered more than once.
- Create a new branch on the tree. This is done by adding the remaining letters as children to the subtree root. Using the example above, the letter `e` will be appended as a child to `r` and the second `e` will be appended as a child to the first `e`.

#### Search
- Convert query to lowercase
- Tokenize the query (convert the key into an array of individual letters)
- Find the subtree root. This is done by iterating over the tokenized characters to find the last matching node in the tree. For example, if the tree contains the word `three` and the key is `throw`, the subtree root will be `r`.
- If the level of the discovered root node is less than the length of the query, return an empty array. This indicates that the given word fragment does not exist in the tree.
- Find matches in the tree. This is done by performing depth-first search from the discovered subtree root. In order to speed up this process, after the algorithm discovers five words, it will skip paths that have more characters than the longest discovered word. 
- Map matches to `Candidates`. 

#### Calculating Confidence
Every `Candidate` includes a confidence value. This indicates the likelihood of the `Candidate` being the correct option. The confidence is calculated by subtracting the `Candidate` word length by the search query length. For example, if the `Candidate` word is `tea` and the search query is `te`, the confidence will be 1. Lower confidence values indicate a higher probability of correctness.

## Running In Development

### Docker
```
$ docker build -t autocomplete-service .
$ docker run -p 5000:5000 autocomplete-service
```

### NPM
```
$ npm i
$ npm run build
$ npm start
```
