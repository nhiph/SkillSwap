import client from "../apollo/client";
import { LOGIN_MUTATION, LOGOUT_MUTATION, REGISTER_MUTATION, PROFILE_QUERY } from "../graphql/auth/index";
import { type LoginData } from "../types/AuthInfo";

export const login = async (
    value: LoginData
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

export const register = async (): Promise<void> => {
    await client.mutate({ mutation: REGISTER_MUTATION });
};
