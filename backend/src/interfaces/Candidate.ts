export interface Candidate {
    getWord() : Promise<string>; //returns the autocomplete candidate
    getConfidence() : Promise<number> // returns the confidence* for the candidate
}