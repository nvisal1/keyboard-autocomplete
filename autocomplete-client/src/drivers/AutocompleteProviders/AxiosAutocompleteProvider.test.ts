import { AxiosAutocompleteProvider, HTTPStatus, ErrorMessages } from './AxiosAutocompleteProvider';
import axios from 'axios';
import { Candidate } from '../../shared/types/Candidate';

jest.mock('axios');
let mockedAxios: jest.Mocked<typeof axios>;

describe('When the AxiosAutocompleteProvider is created', () => {

    beforeEach(() => {
        mockedAxios = axios as jest.Mocked<typeof axios>;
        mockedAxios.create.mockReturnValue(mockedAxios);
    });        

    afterEach(() => {
        jest.resetModules();
    });

    describe('and the getWords method is called', () => {
        describe('and the API returns a status of 200 OK', () => {
            it('should return an array of candidates', async () => {
                const apiResponse = { 
                    responseData: [{ word: 'test_word', confidence: 0 }],
                    status: HTTPStatus.OK
                };
                setGetResponse({ ok: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const fragment = 'test_fragment';

                const candidates = await instance.getWords(fragment);
    
                const expectedResult = apiResponse.responseData;
                expect(candidates).toEqual(expectedResult);
            });
        });
        describe('and the API returns a status of 204 OK NO CONTENT', () => {
            it('should throw an error with message TROUBLE CONNECTING', async () => {
                const apiResponse = { responseData: [], status: 204 };
                setGetResponse({ ok: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const fragment = 'test_fragment';

                const promise = instance.getWords(fragment);
                
                const expectedError = new Error(ErrorMessages.TROUBLE_CONNECTING);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
        describe('and the API returns a status of 400 BAD REQUEST', () => {
            it('should throw an error with message TROUBLE CONNECTING', async () => {
                const apiResponse = { status: 400 };
                setGetResponse({ error: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const fragment = 'test_fragment';

                const promise = instance.getWords(fragment);
                
                const expectedError = new Error(ErrorMessages.TROUBLE_CONNECTING);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
        describe('and the API returns a status of 500 INTERNAL SERVICE ERROR', () => {
            it('should throw an error with message SERVER IS DOWN', async () => {
                const apiResponse = { status: 500 };
                setGetResponse({ error: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const fragment = 'test_fragment';

                const promise = instance.getWords(fragment);
                
                const expectedError = new Error(ErrorMessages.SERVER_IS_DOWN);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
        describe('and the API returns a status of 502 BAD GATEWAY', () => {
            it('should throw an error with message SERVER IS DOWN', async () => {
                const apiResponse = { status: 502 };
                setGetResponse({ error: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const fragment = 'test_fragment';

                const promise = instance.getWords(fragment);
                
                const expectedError = new Error(ErrorMessages.SERVER_IS_DOWN);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
    });

    describe('and the train method is called', () => {
        describe('and the API returns a status of 200 OK', () => {
            it ('should throw an error TROUBLE CONNECTING', async () => {
                const apiResponse = { status: 200 };
                setPostResponse({ ok: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const passage = 'test_fragment';

                const promise = instance.train(passage);
                
                const expectedError = new Error(ErrorMessages.TROUBLE_CONNECTING);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
        describe('and the API returns a status of 204 OK NO CONTENT', () => {
            it ('should resolve without throwing an error', async () => {
                const apiResponse = { status: 204 };
                setPostResponse({ ok: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const passage = 'test_fragment';

                const promise = instance.train(passage);
            
                await expect(promise).resolves.not.toThrowError();
            });
        });
        describe('and the API returns a status of 400 BAD REQUEST', () => {
            it ('should throw an error TROUBLE CONNECTING', async () => {
                const apiResponse = { status: 400 };
                setPostResponse({ error: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const passage = 'test_fragment';

                const promise = instance.train(passage);
            
                const expectedError = new Error(ErrorMessages.TROUBLE_CONNECTING);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
        describe('and the API returns a status of 500 INTERNAL SERVICE ERROR', () => {
            it ('should throw an error SERVER IS DOWN', async () => {
                const apiResponse = { status: 500 };
                setPostResponse({ error: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const passage = 'test_fragment';

                const promise = instance.train(passage);
            
                const expectedError = new Error(ErrorMessages.SERVER_IS_DOWN);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
        describe('and the API returns a status of 502 BAD GATEWAY', () => {
            it ('should throw an error SERVER IS DOWN', async () => {
                const apiResponse = { status: 502 };
                setPostResponse({ error: apiResponse });

                const instance = new AxiosAutocompleteProvider();
                const passage = 'test_fragment';

                const promise = instance.train(passage);
            
                const expectedError = new Error(ErrorMessages.SERVER_IS_DOWN);
                await expect(promise).rejects.toThrowError(expectedError);
            });
        });
    });
});

function setGetResponse(params: {
    ok?: { responseData: Candidate[], status: number },
    error?: { status: number },
}): void {
    const { ok, error } = params;

    if (error) {
        mockedAxios.get.mockRejectedValue({ response: { status: error.status }});
    } else if (ok) {
        mockedAxios.get.mockResolvedValue({ data: ok.responseData, status: ok.status });
    } else {
        throw new Error('At least on optional parameter { ok, error } is required');
    }
}

function setPostResponse(params: {
    ok?: { status: number },
    error?: { status: number },
}): void {
    const { ok, error } = params;

    if (error) {
        mockedAxios.post.mockRejectedValue({ response: { status: error.status }});
    } else if (ok) {
        mockedAxios.post.mockResolvedValue({ status: ok.status });
    } else {
        throw new Error('At least on optional parameter { ok, error } is required');
    }
}
