import { Candidate } from '../types/Candidate';

export interface SearchDriver {
    search(key: string): Candidate[];
    insert(key: string): void;
}