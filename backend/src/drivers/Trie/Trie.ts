import { SearchDriver } from '../../interfaces';
import { TrieNode } from './TrieNode';

export class Trie implements SearchDriver {

    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }
    
    // Search key in the trie 
    // Returns true if key presents  
    // in trie, else false 
    search(): string {
        
    }    


    // If not present, inserts key into trie 
    // If the key is prefix of trie node,  
    // just marks leaf node 
    insert(key: string): void {
        const characters = key.split('');
        let currentNode = this.root;
        characters.forEach((character: string, index: number) => {
            if (currentNode.children.includes(character)) {
                currentNode = currentNode.children[index];
            }
        });
    }
}