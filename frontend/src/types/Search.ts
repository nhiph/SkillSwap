export type Skill = {
    id: string
    text: string
    categoryId: string
}

export type Category = {
    id: string
    category: string
    skills: Array<Skill>
}