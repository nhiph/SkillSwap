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
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      name
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