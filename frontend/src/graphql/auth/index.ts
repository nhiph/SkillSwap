import { gql } from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register( 
    $email: String!,
    $password: String!,
    $name: String!,
    $position: String,
    $skills: [String!],
    $skillsToLearn: [String!],
    $bio: String,
    $avatar: String,
    $pronouns: String,
    $workplace: String,
    $gender: String,
    $age: String,
    $industry: String,
  ) {
    register(
      email: $email,
    password: $password,
    name: $name,
    position: $position,
    skills: $skills,
    skillsToLearn: $skillsToLearn,
    bio: $bio,
    avatar: $avatar,
    pronouns: $pronouns,
    workplace: $workplace,
    gender: $gender,
    age: $age,
    industry: $industry,
    ) {
      id
      token
    }
  }
`;

export const PROFILE_QUERY = gql`
  query Me {
    me {
      id
      name
      email
      bio
      skills
      skillsToLearn
      location
      language
      avatar
      connections {
        id
        name
        email
        avatar
      }
      experiences {
        year
        description
        role
      }
    }
}
`

export const ACTIVATE_MUTATION = gql`
  mutation Activate($activationToken: String!) {
    activateUser(activationToken: $activationToken)
  }
`;