import { Candidate } from '.';

export interface SearchDriver {
    search(key: string): Candidate[];
    insert(key: string): void;
}