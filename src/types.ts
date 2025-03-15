export interface ResumeData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profile: string;
    work_experience: WorkExperience[];
    skills: Skill[];
}

export interface WorkExperience {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Skill {
    name: string;
    level: number;
    experienceYears: number;
}
