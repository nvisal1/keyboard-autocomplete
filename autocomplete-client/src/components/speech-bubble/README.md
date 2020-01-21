## Speech Bubble

### Description

The Speech Bubble component displays the Candidates that are 
returned from the Autocomplete Service. It also provides 
functionality for selecting a desired Candidate.

### Interface

This component accepts props that abide to the following interface

```
Interface SpeechBubbleProps: {
    handleClick: Function // The function that is called on onClick (for selecting a Candidate)
    candidates: Candidate[] // A list of the Candidates to display
    errorMessage?: string // An optional parameter for displaying application errors to the user
}	
```

### Child Components

#### Farley

README at componenets/Farley/README.md




