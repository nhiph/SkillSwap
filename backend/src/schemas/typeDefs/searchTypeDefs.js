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
    name: String
    skill: String
    bio: String
    location: String
    language: [String]
    gender: String
    email: String
    position: String
    age: Int
    workplace: String
    experiences: String
  }

  type Query {
    searchUsers(filters: UserSearchInput): [User]
  }
`;
