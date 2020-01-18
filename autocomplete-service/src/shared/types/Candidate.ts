export class Candidate {

    private _word: string;
    private _confidence: number;

    constructor(word: string, confidence: number) {
        this._word = word;
        this._confidence = confidence;
    }

    getWord(): string {
        return this._word;
    }

    getConfidence(): number {
        return this._confidence;
    }
}