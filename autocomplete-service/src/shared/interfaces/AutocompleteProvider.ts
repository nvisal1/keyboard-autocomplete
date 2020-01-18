import { Candidate } from '../types/Candidate';

export interface AutocompleteProvider {
    getWords(fragment: string) : Promise<Candidate[]>; // returns list of candidates ordered by confidence*
    train(passage: string) : Promise<void>; // trains the algorithm with the provided passage
}