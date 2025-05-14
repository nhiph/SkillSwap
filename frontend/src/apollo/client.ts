import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
});

// Middleware to conditionally add Authorization header except for register vs login
const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    const { operationName } = operation;

    // Don't add token for 'Register' or 'Login' operations
    if (token && operationName !== 'Register' && operationName !== 'Login') {
        operation.setContext(({ headers = {} }) => ({
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            }
        }));
    }

    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: "include",
});

export default client;
