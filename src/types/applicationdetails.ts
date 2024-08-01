export interface ApplicationDetails {
    application_id: string;
    posting_id: string;
    job_title:string;
    company_name:string;
    location:string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
    resume: string; // Adjust type if this represents a file or blob
    legal_questions: {
      work_eligibility: string;
      sex: string;
      language_preference: string;
      race: string;
      graduation_year: string; // Consider using `number` if this is a year
      graduation_month: string;
      disabled: string;
    };
    questions: {
      question: string;
      answer: string;
    }[];
    created_at: string; // Consider using `Date` if you are working with date objects
    status: string;
  }