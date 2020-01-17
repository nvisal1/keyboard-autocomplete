import { AutocompleteProvider, Candidate } from './interfaces';

export class Provider implements AutocompleteProvider {
    
    getWords(fragment: string): Candidate[] {
        throw new Error('Method not implemented.');
    }    
    
    train(passage: string): void {
        throw new Error('Method not implemented.');
    }

}