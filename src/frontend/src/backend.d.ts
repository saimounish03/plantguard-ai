import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ScanRecord {
    id: bigint;
    imageNote?: string;
    confidenceScore: bigint;
    diseaseName: string;
    timestamp: Time;
    cropType?: string;
}
export type Time = bigint;
export interface backendInterface {
    clearHistory(): Promise<void>;
    getScanById(id: bigint): Promise<ScanRecord>;
    getScanCount(): Promise<bigint>;
    getScanHistory(): Promise<Array<ScanRecord>>;
    saveScan(diseaseName: string, confidenceScore: bigint, cropType: string | null, imageNote: string | null): Promise<bigint>;
}
