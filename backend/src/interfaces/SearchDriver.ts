export interface SearchDriver {
    search(key: string): string;
    insert(key: string): void;
}