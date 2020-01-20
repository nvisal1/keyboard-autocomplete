import axios, { AxiosInstance, AxiosError } from 'axios';
import { AutocompleteProvider } from '../../shared/interfaces/AutocompleteProvider';
import { Candidate } from '../../shared/types/Candidate';

enum HTTPStatus {
    OK = 200,
    OK_NO_CONTENT = 204,
    BAD_REQUEST = 400,
    INTERNAL_SERVER_ERROR = 500,
}

enum ErrorMessages {
    TROUBLE_CONNECTING = 'We are having trouble connecting to the autocomplete service. Please try again later.',
    SERVER_IS_DOWN = 'The autocomplete service is experiencing downtime. Please try again later.'
}

export class AxiosAutocompleteProvider implements AutocompleteProvider {

    private axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({ baseURL: 'http://localhost:5000' });
    }

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
            return new Error(ErrorMessages.SERVER_IS_DOWN);
        }
    }
}