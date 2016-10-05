export interface ValidationResponse {
    resp: string;  // OK or KO
    message: string;
    retCode: string; // 501 = Documenti Scaduti
}