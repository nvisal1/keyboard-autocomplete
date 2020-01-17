export class TrieNode {
    isEnd: boolean;
    // character: string;
    children: Map<string, TrieNode>;

    constructor(key?: string) {
        this.isEnd = false;
        // this.character = key;
        this.children = new Map<string, TrieNode>();
    }
}