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

async function index(req: Request, res: Response): Promise<void> {
    try {
        const response = { message: 'Welcome to the Autocomplete Service' };
        res.status(200).json(response);
    } catch (error) {
        handleError(error, res);
    }
}

async function getWords(req: Request, res: Response): Promise<void> {
    try {
        const fragment = req.query.text;

        // return a 400 Bad Request to client if text query string is not provided
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

async function train(req: Request, res: Response): Promise<void> {
    try {
        const passage = req.body.passage;

        // return a 400 Bad Request to client if passage property is not provided in request body
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

function handleError(error: Error, res: Response) {
    const response = mapErrorToResponseData(error);
    res.status(response.code).json({ message: response.message });
}



