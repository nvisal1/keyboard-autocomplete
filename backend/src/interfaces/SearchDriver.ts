export interface SearchDriver {
    search(): string;
    insert(): void;
}