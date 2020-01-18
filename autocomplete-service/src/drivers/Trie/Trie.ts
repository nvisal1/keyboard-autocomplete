import { SearchDriver } from '../../shared/interfaces';
import { TrieNode } from './TrieNode';
import { Candidate } from '../../shared/types/Candidate';

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
        return this._treeSize;
    }
    
    search(key: string): Candidate[] {
        const characters = key.split('');
        let currentNode = this.root;
        let matchingPrefix = '';

        for (let i = 0; i < characters.length; i++) {
            if(currentNode.children.has(characters[i])) {
                matchingPrefix += characters[i];
                currentNode = <TrieNode>currentNode.children.get(characters[i]);
            } else {
                // The current node represents the end of the matching prefix
                // break out of loop
                break;
            }
        }

        const matches = this.getMatches(matchingPrefix, currentNode);

        const candidates = matches.map((match: string) => new Candidate(match, match.length))

        return candidates;

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

        characters.forEach((character: string, index: number) => {
            if (currentNode.children.has(character)) {
                currentNode = <TrieNode>currentNode.children.get(character);
            } else {
                // Set new node as a child of the current node and switch
                // current node to newly created node.
                currentNode.children.set(character, new TrieNode());
                this._treeSize += 1;

                currentNode  = <TrieNode>currentNode.children.get(character);
            }
        });

        currentNode.isEnd = true;
    }


    private getMatches(matchingPrefix: string, currentNode: TrieNode, allWords: string[] = [], maxStringLength = 0): string[] {
        const keys =[ ...currentNode.children.keys() ];
        for (let index in keys) {
            const child = <TrieNode>currentNode.children.get(keys[index]);
            var newString = matchingPrefix + keys[index];
            if (allWords.length === 5 && newString.length >= maxStringLength) {
                break;
            }
            if (child.isEnd) {
                if (maxStringLength < newString.length) {
                    maxStringLength = newString.length;
                }
                allWords.push(newString);
            }
            
            allWords = this.getMatches(newString, child, allWords, maxStringLength);
        }

        return allWords
    };
}