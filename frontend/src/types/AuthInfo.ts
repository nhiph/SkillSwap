export type AuthFormData = {
    email: string;
    password: string;
    name?: string;
    major?: string;
    position?: string;
    skills?: string[];
    skillsToLearn?: string[];
    bio?: string;
    avatar?: string;
    pronouns?: string,
    workplace?: string,
    gender?: string,
    age?: string,
    industry?: string,
}

type Experience = {
    year: number
    description: string
    role: string
}

export type User = {
    id: string
    name: string
    email: string
    avatar: string
    password: string
    language: Array<string>
    location: Array<string>
    skills: Array<string>
    skillsToLearn: Array<string>
    bio: string
    pronouns: string
    position: string
    age: number
    workplace: string
    isActive?: boolean
    connections?: Array<User>
    experiences?: Array<Experience>
    activationToken?: string
    createdAt?: string
    updatedAt?: string
}