import { Candidate } from '../types/Candidate';

/**
 * AutocompleteProvider represents the interface
 * of the internal service. Adapters can connect
 * to the implementations of this interface
 * to provide client consumption capabilities.
 * 
 * Example: An adapter for AWS Lambda can
 * use an implementation of this interface
 * and map the return values of the implementation
 * to an expected API contract type.
 */

export interface AutocompleteProvider {
    getWords(fragment: string) : Candidate[]; // returns list of candidates ordered by confidence
    train(passage: string) : void; // trains the algorithm with the provided passage
}