import { SearchDriver } from '../../shared/interfaces';
import { TrieNode } from './TrieNode';
import { Candidate } from '../../shared/types/Candidate';

type SubtreeRoot = {
    level: number,
    node: TrieNode,
}

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
    
    search(query: string): Candidate[] {
        query = query.toLowerCase();

        const characters = this.tokenizeInput(query);
      
        const subTreeRoot = this.getSubtreeRoot(characters);

        const expectedSubTreeRootLevel = characters.length - 1;
        
        if (subTreeRoot.level !== expectedSubTreeRootLevel) {
            return [];
        }

        const matches = this.getMatches(query, subTreeRoot.node);

        const candidates = this.mapMatchesToCandidates(query, matches);
        
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
        key = key.toLowerCase();
    
        const characters = this.tokenizeInput(key);

        const subtreeRoot = this.getSubtreeRoot(characters);

        this.createNewPath(subtreeRoot, characters);
    }

    private getSubtreeRoot(characters: string[]): SubtreeRoot  {
        let currentNode = this.root;

        for (let i = 0; i < characters.length; i++) {
            if (currentNode.children.has(characters[i])) {
                currentNode = <TrieNode>currentNode.children.get(characters[i]);
            } else {
                return { level: i - 1, node: currentNode };
            }
        }

        const level = characters.length - 1;
        return { level , node: currentNode };
    }

    private tokenizeInput(key: string): string[] {
        const characters = key.split('');
        return characters;
    }

    private mapMatchesToCandidates(query: string, matches: string[]): Candidate[] {
        const candidates = matches.map((match: string) => {
            const confidence = match.length - query.length;
            return new Candidate(match, confidence);
        });

        return candidates;
    }

    private createNewPath(subtreeRoot: SubtreeRoot, characters: string[]): void {
        let currentNode = subtreeRoot.node;
        const nextLevel = subtreeRoot.level + 1;

        for (let i = nextLevel; i < characters.length; i++) {
            if (currentNode.children.has(characters[i])) {
                currentNode = <TrieNode>currentNode.children.get(characters[i]);
            } else {
                // Set new node as a child of the current node and switch
                // current node to newly created node.
                currentNode.children.set(characters[i], new TrieNode());
                this._treeSize += 1;

                currentNode = <TrieNode>currentNode.children.get(characters[i]);
            }
        }    

        currentNode.isEnd = true;
    }


    private getMatches(matchingPrefix: string, currentNode: TrieNode, matches: string[] = [], maxStringLength = 0): string[] {
        const keys =[ ...currentNode.children.keys() ];
        for (let index in keys) {
            const child = <TrieNode>currentNode.children.get(keys[index]);
            var newString = matchingPrefix + keys[index];

            if (matches.length === 5 && newString.length >= maxStringLength) {
                break;
            }

            if (child.isEnd) {
                if (maxStringLength < newString.length) {
                    maxStringLength = newString.length;
                }
                matches.push(newString);
            }
            
            matches = this.getMatches(newString, child, matches, maxStringLength);
        }

        return matches;
    };
}