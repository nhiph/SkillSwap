const gql = require("graphql-tag");

module.exports = gql`
  type Experience {
    year: Int
    description: String
    role: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    avatar: String
    skills: [String!]!
    position: String
    bio: String
    gender: String
    location: String
    language: [String]
    experiences: [Experience]
    workplace: String
    pronouns: String
  }

  input UserSearchInput {
    keywordSearch: String
    age: String
    gender: String
    categories: [String]
    skills: [String]
    languages: [String]
  }

  type Query {
    searchUsers(filters: UserSearchInput): [User]
  }
`;
