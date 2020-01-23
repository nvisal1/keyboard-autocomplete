import { Candidate } from '../types/Candidate';

/**
 * SearchDriver is an interface for all
 * implementations of the autocomplete
 * algorithm. 
 */

export interface SearchDriver {
    search(key: string): Candidate[];
    insert(key: string): void;
}