import { Trie } from './Trie/Trie';
import { SearchDriver } from '../shared/interfaces';

let SEARCH_DRIVER: SearchDriver

export function setDrivers(): void {
    SEARCH_DRIVER = new Trie();
}

export {
    SEARCH_DRIVER
}