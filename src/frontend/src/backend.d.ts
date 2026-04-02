import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DiagnosisResult {
    differentials: Array<Differential>;
    confidence: number;
    condition: string;
}
export interface LabValue {
    key: string;
    value: number;
}
export interface Differential {
    probability: number;
    condition: string;
}
export interface Patient {
    id: string;
    age: bigint;
    sex: string;
    clinicalHistory: string;
    labValues: Array<LabValue>;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addPatient(patient: Patient): Promise<void>;
    analyzePatient(patient: Patient): Promise<DiagnosisResult>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllPatients(): Promise<Array<Patient>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
}
