export interface AnalyzeRequest {
    query: string;
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
