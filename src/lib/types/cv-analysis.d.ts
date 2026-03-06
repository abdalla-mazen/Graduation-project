export interface CvAnalysisResponse {
  message: string;
  filename: string;
  analysis: CvAnalysis;
}

export interface CvAnalysis {
  overall_score: number;
  formatting_score: number;
  content_score: number;
  keywords_score: number;
  structure_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  detailed_analysis: DetailedAnalysis;
}

export interface DetailedAnalysis {
  formatting: string;
  content: string;
  keywords: string;
  structure: string;
  missing_sections: string[];
  strong_keywords_found: string[];
  suggested_keywords: string[];
  achievement_quality: string;
  ats_compatibility: string;
}
