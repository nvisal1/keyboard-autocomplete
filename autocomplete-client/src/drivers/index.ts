import { AxiosAutocompleteProvider } from './AutocompleteProviders/AxiosAutocompleteProvider';
import { AutocompleteProvider } from '../shared/interfaces/AutocompleteProvider';

const AUTOCOMPLETE_PROVIDER: AutocompleteProvider = new AxiosAutocompleteProvider();

export {
    AUTOCOMPLETE_PROVIDER,
}
