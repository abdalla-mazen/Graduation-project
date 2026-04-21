export type Certificate = {
  course_id: number | null;
  credential_url: string;
  expiry_date: string | null;
  id: number;
  issued_at: string; 
  provider: string;
  score: number | null;
  skill_id: number;
  title: string;
  user_id: number;
};

export type CertificatesResponse = Certificate[];