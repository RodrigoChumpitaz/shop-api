export interface IBootstrap{
    init(): Promise<any>;
    close(): void;
}