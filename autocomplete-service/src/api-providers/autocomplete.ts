import { AutocompleteProvider } from '../shared/interfaces';
import { SEARCH_DRIVER } from '../drivers';
import { Candidate } from '../shared/types/Candidate';

export class Autocomplete implements AutocompleteProvider {

    getWords(fragment: string): Candidate[] {
        if (!fragment.length) {
            return [];
        }
        
        let candidates = SEARCH_DRIVER.search(fragment);

        // Sort candidates by confidence (ascending order)
        candidates = candidates.sort((a,b) => a.getConfidence() - b.getConfidence());
        return candidates; 
    }    

    train(passage: string): void {
        const tokens = passage.split(' ');
        tokens.forEach((token: string) => {
            SEARCH_DRIVER.insert(token);
        });
    }
}