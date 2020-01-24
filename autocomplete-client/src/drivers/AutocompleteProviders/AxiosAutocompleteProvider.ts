import axios, { AxiosInstance, AxiosError } from 'axios';
import { AutocompleteProvider } from '../../shared/interfaces/AutocompleteProvider';
import { Candidate } from '../../shared/types/Candidate';

export enum HTTPStatus {
    OK = 200,
    OK_NO_CONTENT = 204,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessages {
    TROUBLE_CONNECTING = 'We are having trouble connecting to the Autocomplete Service. Please try again later.',
    SERVER_IS_DOWN = 'The Autocomplete Service is experiencing downtime. Please try again later.'
}

export class AxiosAutocompleteProvider implements AutocompleteProvider {

    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({ baseURL: process.env.AUTOCOMPLETE_SERVICE || 'http://autocomplete-service:5000' });
    }

    /**
     * getWords makes a request to the Autocomplete Service to get
     * a list of Candidates for a given word fragment.
     * The Autocomplete Service is expected to return a status
     * of 200. This function will throw an error if any other status 
     * code is returned.
     */
    async getWords(fragment: string): Promise<Candidate[]> {
        try {
            const response = await this.axios.get(`/candidates?text=${ fragment }`);

            if (response.status !== HTTPStatus.OK) {
                throw new Error(ErrorMessages.TROUBLE_CONNECTING);
            }

            const candidates = <Candidate[]>response.data;
            return candidates;

        } catch (httpError) {
            const clientError = this.mapHttpError(httpError);
            throw clientError;
        }
    }
    
    /**
     * train makes a request to the Autocomplete Service to train
     * the autocomplete algorithm with a given passage.
     * The Autocomplete Sevice is expected to return a status
     * of 204. This function will throw an error if any other
     * status code is returned.
     */
    async train(passage: string): Promise<void> {
        try {
            const body = { passage };
            const response = await this.axios.post('/train', body);
            
            if (response.status !== HTTPStatus.OK_NO_CONTENT) {
                throw new Error(ErrorMessages.TROUBLE_CONNECTING);
            }

        } catch (httpError) {
            const clientError = this.mapHttpError(httpError);
            throw clientError;
        }
    
    }

    /**
     * mapHttpError accepts an error and uses it to determine which
     * client error to throw.
     */
    private mapHttpError(error: AxiosError): Error {
        if (error.response) {
            switch (error.response.status) {
                case HTTPStatus.BAD_REQUEST:
                    return new Error(ErrorMessages.TROUBLE_CONNECTING);

                case HTTPStatus.INTERNAL_SERVER_ERROR:
                    return new Error(ErrorMessages.SERVER_IS_DOWN);
    
                default: 
                    return new Error(ErrorMessages.SERVER_IS_DOWN);
            }
        } else {
            if (error.message === ErrorMessages.TROUBLE_CONNECTING) {
                return error;
            }
            return new Error(ErrorMessages.SERVER_IS_DOWN);
        }
    }
}
