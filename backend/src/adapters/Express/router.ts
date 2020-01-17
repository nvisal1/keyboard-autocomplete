import { Adapter } from '../../interfaces';

export class ExpressRouter implements Adapter {
    start(): void {
        throw new Error("Method not implemented.");
    }
    
    getWords(fragment: string): import("../../interfaces").Candidate[] {
        throw new Error("Method not implemented.");
    }    

    train(passage: string): void {
        throw new Error("Method not implemented.");
    }

}

