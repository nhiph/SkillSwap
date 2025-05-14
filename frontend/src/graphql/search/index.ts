import { gql } from "graphql-tag"

export const SEARCH_QUERY = gql`
  query SearchUsers($filters: UserSearchInput) {
    searchUsers(filters: $filters) {
      id  
      name
      avatar
      skills
      bio
      location
      language
      email
      gender
      pronouns
      position
      age
      workplace
    }
  }
`
