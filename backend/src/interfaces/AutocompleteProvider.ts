import { Candidate } from './Candidate';

export interface AutocompleteProvider {
    getWords(fragment: string) : Candidate[]; // returns list of candidates ordered by confidence*
    train(passage: string) : void; // trains the algorithm with the provided passage
}