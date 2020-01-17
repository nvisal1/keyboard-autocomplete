import { SearchDriver } from '../../interfaces';
import { TrieNode } from './TrieNode';

export class Trie implements SearchDriver {

    private root: TrieNode;
    private _treeSize: number;

    constructor() {
        this.root = new TrieNode();
        this._treeSize = 0;
    }

    // Returns the number of nodes
    // within the tree instance
    get treeSize(): number {
        return this.treeSize;
    }
    
    // Search key in the trie 
    // Returns true if key presents  
    // in trie, else false 
    search(key: string): string {
        return '';
    }

    /*
        1. Iterate over each character in the given key
        2. If the current node does not have a child for the current
           character value, create new node for that position.
           Otherwise, set current node to the matching node.
        3. Set the last node as a word marker
    */
    insert(key: string): void {
        const characters = key.split('');
        let currentNode = this.root;

        characters.forEach((character: string) => {
            if (currentNode.children.has(character)) {
                currentNode = <TrieNode>currentNode.children.get(character);
            } else {
                // Set new node as a child of the current node and switch
                // current node to newly created node.
                currentNode.children.set(character, new TrieNode(character));
                this._treeSize += 1;
                
                currentNode = <TrieNode>currentNode.children.get(character);
            }
        });

        currentNode.isEnd = true;
    }
}