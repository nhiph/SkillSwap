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
    gender: String
    avatar: String
    password: String
    skills: [String]
    skillsToLearn: [String]
    bio: String
    location: String
    language: [String]
    isActive: Boolean!
    connections: [User]
    activationToken: String
    experiences: [Experience]
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    register(
      name: String!
      email: String!
      password: String!
      skills: [String]
      skillsToLearn: [String]
      bio: String
      avatar: String
      location: String
      language: [String]
      isActive: Boolean
      pronouns: String
      position: String
      age: Int
      workplace: String
    ): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateUser(
      id: ID!
      name: String
      avatar: String
      skills: [String]
      skillsToLearn: [String]
      bio: String
      location: String
      language: [String]
    ): User
    deleteUser(id: ID!): Boolean
    activateUser(activationToken: String!): Boolean
  }
`;
