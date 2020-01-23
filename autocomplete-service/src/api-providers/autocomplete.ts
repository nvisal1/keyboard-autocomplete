import { AutocompleteProvider } from '../shared/interfaces';
import { SEARCH_DRIVER } from '../drivers';
import { Candidate } from '../shared/types/Candidate';

export class Autocomplete implements AutocompleteProvider {

    /**
     * getWords accepts a word fragment and uses it
     * to query for Candidates through a SearchDriver.
     * 
     * If an empty string is provided, an empty array
     * is returned.
     * 
     * Candidates are sorted in ascending order by
     * confidence before return.
     */
    getWords(fragment: string): Candidate[] {
        if (!fragment.length) {
            return [];
        }
        
        let candidates = SEARCH_DRIVER.search(fragment);

        // Sort candidates by confidence (ascending order)
        candidates = candidates.sort((a,b) => a.getConfidence() - b.getConfidence());
        return candidates; 
    }    

    /**
     * train accepts a passage and inserts each word
     * into the autocomplete algorithm.
     */
    train(passage: string): void {
        if (passage.length) {
            const tokens = passage.split(' ');
            tokens.forEach((token: string) => {
                SEARCH_DRIVER.insert(token);
            });
        }
    }
}