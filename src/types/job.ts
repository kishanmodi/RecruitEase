export interface Job {
    applied_today: string;
    appliedToday: string;
    num_applications: number;
    id: string;
    title: string;
    department: string;
    city: string;
    country: string;
    posting_date: Date;
    deadline: Date;
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
    posting_link?: string;
}
