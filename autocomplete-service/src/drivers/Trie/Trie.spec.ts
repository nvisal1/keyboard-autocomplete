import { Trie } from './Trie';

describe('When a new Trie is created', () => {
    describe('and the insert method is called', () => {
        describe('and the provided key does not exist within the current tree', () => {
            describe('and the prefix of the provided key does not match with nodes in the current tree', () => {
                it('should insert n new nodes into the current tree where n is the length of the provided key', () => {
                    const trie = new Trie();

                    // The current tree is empty.
                    expect(trie.treeSize).toBe(0);

                    // Therefore, the provided key will not match any of its nodes.
                    const key = 'test';
                    trie.insert(key);
                    expect(trie.treeSize).toBe(key.length);
                });
            });
            describe('and the prefix of the provided key does match with nodes in the current tree', () => {
                it('should insert n - p new nodes into the current tree where n is the length of the provided key and p is the length of the matching prefix', () => {
                    const trie = new Trie();

                    const initialKey = 'test';
                    trie.insert(initialKey);
                    expect(trie.treeSize).toBe(initialKey.length);

                    const overlappingKey = 'tea';
                    trie.insert(overlappingKey);

                    const prefixOverlap = 2;
                    const expectedNodeCount = (overlappingKey.length - prefixOverlap) + initialKey.length;
                    expect(trie.treeSize).toBe(expectedNodeCount);
                });
            });
        });
        describe('and the provided key does exist with the current tree', () => {
            it('should not insert any new nodes into the the current tree', () => {
                const trie = new Trie();

                const key = 'test';
                trie.insert(key);
                expect(trie.treeSize).toBe(key.length);

                trie.insert(key);
                expect(trie.treeSize).toBe(key.length);
            });
        });
    });

    describe('and the search method is called', () => {
        describe('and the tree does not contain a matching prefix', () => {
            it('should return an empty array', () => {
                const trie = new Trie();
                
                const query = 'te';
                const expectedResult: string[] = [];
                const candidates = trie.search(query);

                expect(candidates).toEqual(expectedResult);
            });
        });
        describe('and the tree contains less than 5 words with a matching prefix', () => {
            it('should return an array of length n where n is the number of words in the tree that have a matching prefix', () => {
                const trie = new Trie();
                const words = ['tea', 'test', 'tech', 'unrelated'];

                words.forEach((word: string) => {
                    trie.insert(word);
                });

                const query = 'te';
                const expectedResult = ['tea', 'test', 'tech'];
                const candidates = trie.search(query);

                expect(candidates.sort()).toEqual(expectedResult.sort());
            });
        });
        describe('and the tree contains more than 5 words with a matching prefix', () => {
            it('should return an array with the 5 shortest words that have a matching prefix', () => {
                const trie = new Trie();
                const words = ['tea', 'test', 'tech', 'teach', 'teacher', 'television', 'unrelated'];

                words.forEach((word: string) => {
                    trie.insert(word);
                });

                const query = 'te';
                const expectedResult = ['tea', 'test', 'tech', 'teach', 'teacher'];
                const candidates = trie.search(query);

                expect(candidates.sort()).toEqual(expectedResult.sort());
            });
        });
    });
});