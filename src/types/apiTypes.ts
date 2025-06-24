export interface AnalyzeRequest {
    query: string;
    bearerToken: string;
}

export interface AnalyzeResponse {
    analysis: string;
    success: boolean;
    error?: string;
}

export interface ApiError {
    message: string;
    status?: number;
}
