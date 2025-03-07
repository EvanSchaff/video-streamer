export class StateManager {
    private activeStreams: Map<string, {startTime: number, isActive: boolean}>;
    private static instance: StateManager

    constructor() {
        this.activeStreams = new Map();
    }

    public static getInstance(): StateManager {
        if (!StateManager.instance) {
            StateManager.instance = new StateManager();
        }
        return StateManager.instance;
    }

    public addStream(streamKey: string): void {
        if (this.activeStreams.has(streamKey)) {
            throw new Error(`Stream already active`);
        }
        this.activeStreams.set(streamKey, {
            startTime: Date.now(),
            isActive: true,
        })
    }

    public removeStream(streamKey: string): void{
        if (!this.activeStreams.has(streamKey)) {
            throw new Error(`Stream not active`);
        }
        this.activeStreams.delete(streamKey);
    }

    public isStreamActive(streamKey: string): boolean {
        return this.activeStreams.has(streamKey);
    }

    public getActiveStreams(): Array<[string, { startTime: number, isActive: boolean }]> {
        return Array.from(this.activeStreams.entries());
    }


}