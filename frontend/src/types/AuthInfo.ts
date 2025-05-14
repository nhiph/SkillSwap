export type LoginData = {
    email: string
    password: string
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