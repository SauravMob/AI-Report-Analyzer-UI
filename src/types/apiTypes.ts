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

export type ReportType = 'campaign' | 'creative' | 'siteapp';

export interface ReportConfig {
  type: ReportType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  endpoint: string;
  placeholder: string;
}