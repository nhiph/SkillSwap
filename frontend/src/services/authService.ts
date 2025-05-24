import client from "../apollo/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION, PROFILE_QUERY, ACTIVATE_MUTATION } from "../graphql/auth/index";
import { type AuthFormData } from "../types/AuthInfo";

export const login = async (
    value: AuthFormData
): Promise<any> => {
    const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: value,
    });
    return data.login;
};

export const fetchProfile = async (): Promise<any> => {
    const data = await client.query({ query: PROFILE_QUERY });
    return data.data
};

export const logout = async (): Promise<void> => {
    await client.mutate({ mutation: LOGOUT_MUTATION });
};

export const register = async (value: AuthFormData): Promise<any> => {
    console.log('FEFEFE', value)
    const data = await client.mutate({ mutation: REGISTER_MUTATION, variables: value });
    return data
};


export const activateUser = async (token: String) => {
    console.log('activateUser', token)
    await client.mutate({ mutation: ACTIVATE_MUTATION, variables: token });
};