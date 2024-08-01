export interface Application {
    posting_id: string;
    first_name: string;
    last_name: string;
    phone: string;
    country: string;
    address: string;
    email: string;
    city: string;
    province: string;
    postal_code: string;
    resume: any; // Adjust the type based on your resume data structure, e.g., `File` if it's a file upload
    questions: {
      question: string;
      answer: string;
    }[];
    legal_questions: {
      work_eligibility: string; // Adjust the type if necessary, e.g., `boolean` or `number`
      sex: string; // Adjust the type if necessary, e.g., `boolean` or `number`
      language_preference: string; // Adjust the type if necessary
      race: string; // Adjust the type if necessary
      graduation_year: string; // Adjust the type if necessary
      graduation_month: string; // Adjust the type if necessary
      disabled: string; // Adjust the type if necessary, e.g., `string` or `number`
    };
  }