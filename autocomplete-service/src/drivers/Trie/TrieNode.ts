export class TrieNode {
    isEnd: boolean;
    children: Map<string, TrieNode>;

    constructor() {
        this.isEnd = false;
        this.children = new Map<string, TrieNode>();
    }

}