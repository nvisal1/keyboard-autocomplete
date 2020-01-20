import { Candidate } from '../types/Candidate';

export interface AutocompleteProvider {
    getWords(fragment: string): Promise<Candidate[]>;
    train(passage: string): Promise<void>;
}