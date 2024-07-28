export interface Job {
    title: string;
    department: string;
    city: string;
    country: string;
    posting_date: Date;
    expiration_date: Date;
    soft_skills: any[];
    technical_skills: any[];
    questions: string[];
    recruiter_name: string;
    recruiter_email: string;
    about_job: string;
    about_company: string;
    qualification: string;
    key_requirements: string;
    nice_to_have?: string;
    other_remarks?: string;
    is_active: boolean;
}
