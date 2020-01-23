import { SearchDriver } from '../../shared/interfaces';
import { TrieNode } from './TrieNode';
import { Candidate } from '../../shared/types/Candidate';

type SubtreeRoot = {
    level: number,
    node: TrieNode,
}

type Matches = {
    words: string[],
     maxStringLength: number,
}

const MAX_MATCH_LENGTH = 5;

export class Trie implements SearchDriver {

    private root: TrieNode;
    private _treeSize: number;

    constructor() {
        this.root = new TrieNode();
        this._treeSize = 0;
    }

    // Returns the number of nodes
    // within the tree
    get treeSize(): number {
        return this._treeSize;
    }
    
    /**
     * search accepts a query string and uses it to
     * traverse the tree to find relevant Candidates.
     */
    search(query: string): Candidate[] {
        query = query.toLowerCase();

        const characters = this.tokenizeInput(query);
      
        const subTreeRoot = this.getSubtreeRoot(characters);

        const expectedSubTreeRootLevel = characters.length - 1;
        
        if (subTreeRoot.level !== expectedSubTreeRootLevel) {
            return [];
        }

        const matches = this.getMatches(query, subTreeRoot.node);

        const candidates = this.mapMatchesToCandidates(query, matches.words);
        
        return candidates;
    }

    /*
    * insert accepts a key to place in the tree. If
    * the key already exists within the tree, it will
    * not be added.
    */
    insert(key: string): void {
        key = key.toLowerCase();
    
        const characters = this.tokenizeInput(key);

        const subtreeRoot = this.getSubtreeRoot(characters);

        this.createNewPath(subtreeRoot, characters);
    }

    /**
     * getSubtreeRoot accepts an array of characters and uses
     * it to traverse the tree. The function will return an
     * object of type SubtreeRoot for the last matching
     * character in the tree.
     */
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

    /**
     * tokenizeInput accepts a key and returns
     * an array where each element is a character
     * in the given key.
     */
    private tokenizeInput(key: string): string[] {
        const characters = key.split('');
        return characters;
    }

    /**
     * mapMatchesToCandidates accepts a search query (word fragment) and an array
     * of matches for the provided query. This function returns 
     * an instance of Candidate for each given match.
     */
    private mapMatchesToCandidates(query: string, matches: string[]): Candidate[] {
        const candidates = matches.map((match: string) => {
            const confidence = match.length - query.length;
            return new Candidate(match, confidence);
        });

        return candidates;
    }

    /**
     * createNewPath accepts a starting root node and an array of characters.
     * The function uses the level of the starting node to determine which
     * letter in the characters array to start with. It then appends a new
     * child node for each remaining letter. 
     * 
     * Example: subtree root = 'r' at level 5, characters = ['t', 'r', 'u', 'c', 'k']
     * 
     * New path = 'r' level 5 -> 'u' level 6 -> 'c' level 7 -> 'k' level 8
     * 
     * The last node is marked with isEnd = true in order to indicate the end of a word.
     */
    private createNewPath(subtreeRoot: SubtreeRoot, characters: string[]): void {
        let currentNode = subtreeRoot.node;
        const nextLevel = subtreeRoot.level + 1;

        for (let i = nextLevel; i < characters.length; i++) {
            // Set new node as a child of the current node and switch
            // current node to newly created node.
            currentNode.children.set(characters[i], new TrieNode());
            this._treeSize += 1;

            currentNode = <TrieNode>currentNode.children.get(characters[i]);
        }    

        currentNode.isEnd = true;
    }


    /**
     * getMatches performs a recursive depth-first search across the tree and
     * stores the first <MAX_MATCH_LENGTH> matches within an array. If the matches
     * array hits capacity before the traversal is complete, the function will
     * skip over branches that have more levels than the longest match. If a shorter
     * match is found, the new match will replace the longest match.
     */
    private getMatches(matchingPrefix: string, currentNode: TrieNode, matches: Matches = { words: [], maxStringLength: 0 }): Matches  {
        const keys =[ ...currentNode.children.keys() ];
        for (let index in keys) {
            const child = <TrieNode>currentNode.children.get(keys[index]);
            const newString = matchingPrefix + keys[index];

            // If the matches array is at capacity, 
            // skip branches that have more levels than the longest match.
            if (matches.words.length === MAX_MATCH_LENGTH && newString.length >= matches.maxStringLength) {
                break;
            }

            if (child.isEnd) {
                if (matches.maxStringLength < newString.length) {
                    matches.maxStringLength = newString.length;
                }
                
                // If the matches array is at capacity,
                // iterate over the matches array and replace the longest match
                // with the new match. At this point, we know that the
                // new match has a shorter length than the longest match.
                // Because of this, the new match has a higher
                // confidence value.
                if (matches.words.length === MAX_MATCH_LENGTH) {
                    for (let m = 0; m < matches.words.length; m++) {
                        if (matches.words[m].length === matches.maxStringLength) {
                            matches.words.splice(m, 1, newString);
                        }
                    }
                } else {
                    matches.words.push(newString);
                }
            }
            
            matches = this.getMatches(newString, child, matches);
        }

        return matches;
    };
}