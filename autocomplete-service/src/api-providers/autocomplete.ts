import { AutocompleteProvider } from '../shared/interfaces';
import { SEARCH_DRIVER } from '../drivers';
import { Candidate } from '../shared/types/Candidate';

export class Autocomplete implements AutocompleteProvider {

    async getWords(fragment: string): Promise<Candidate[]> {
        const candidates = SEARCH_DRIVER.search(fragment);
        return candidates; 
    }    

    async train(passage: string): Promise<void> {

    }
}