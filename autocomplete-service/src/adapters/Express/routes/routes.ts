import { Router, Request, Response, } from 'express';
import { Autocomplete } from '../../../api-providers/autocomplete';
import { mapErrorToResponseData, ResourceError, ResourceErrorReason } from '../../../shared/errors';
import { Candidate } from '../../../shared/types/Candidate';

type HTTPCandidate = {
    word: string;
    confidence: number;
}

const autocompleteProvider = new Autocomplete();

export function buildAdapter() {
    const router = Router();
    router.get('/', index);
    router.get('/candidates', getWords);
    router.post('/train', train);
    return router;
}

/**
 * index is the handler function for the base route (GET '/') of the
 * service. This function responds with a status 200 and a welcome message.
 * It can be used for simple sevice health checks.
 */
async function index(req: Request, res: Response): Promise<void> {
    try {
        const response = { message: 'Welcome to the Autocomplete Service' };
        res.status(200).json(response);
    } catch (error) {
        handleError(error, res);
    }
}

/**
 * getWords is the handler function for the route to get a list 
 * of Candidates (GET '/candidates'). This function expects the 
 * presence of a 'text' query string.  If it is not provided, the
 * function responds with a status 400. Otherwise, the function
 * will use the provided word fragment to query for a list of
 * Candidates. The instances of Candidate that are returned from the
 * Autocomplete Provider are mapped to type HTTPCandidate for
 * client consumption. The function will then respond with a list
 * of HTTPCandidates and a status of 200.
 */
async function getWords(req: Request, res: Response): Promise<void> {
    try {
        const fragment = req.query.text;

        // Return a 400 Bad Request to client if text query string is not provided.
        // An empty string (" ?text='' ") is acceptable.
        if (!fragment && fragment !== '') {
            const badRequestError = new ResourceError(
                'A \'text\' query string must be provided. Format: \'/candidates?text=<word fragment>\'',
                ResourceErrorReason.BAD_REQUEST,
            );

            handleError(badRequestError, res);
        } else {
            const candidates = autocompleteProvider.getWords(fragment);

            let response: HTTPCandidate[] = [];
            candidates.forEach((candidate: Candidate) => {
                response.push({ word: candidate.getWord(), confidence: candidate.getConfidence() })
            });
            res.status(200).json(response);
        }

    } catch (error) {
        handleError(error, res);
    }
}    

/**
 * train is the handler function for the route to train the
 * autocomplete algorithm ('/train'). This function expects
 * the presence of a passage property in the request body. If
 * it is not provided, the function will respond with a status
 * 400. Otherwise, the function will pass the given text passage
 * to the Autocomplete Provider for training and respond with a
 * status of 204.
 */
async function train(req: Request, res: Response): Promise<void> {
    try {
        const passage = req.body.passage;

        // Return a 400 Bad Request to client if passage property is not provided in request body.
        // An empty string (" body: { passage: '' } ") is acceptable.
        if (!passage && passage !== '') {
            const badRequestError = new ResourceError(
                'A \'passage\' property must be provided in the request body. Format: \'body\': { \'passage\': \'<words>\' }',
                ResourceErrorReason.BAD_REQUEST,
            );

            handleError(badRequestError, res);
        } else {
            autocompleteProvider.train(passage);
            res.sendStatus(204);
        }

    } catch (error) {
        handleError(error, res);
    }
}

/**
 * handleError maps a given error to a known service error
 * and uses it to respond to the client.
 */
function handleError(error: Error, res: Response) {
    const response = mapErrorToResponseData(error);
    res.status(response.code).json({ message: response.message });
}



