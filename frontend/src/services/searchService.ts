import client from "../apollo/client";
import { SEARCH_QUERY } from "../graphql/search/index";

export const searchUsers = async (filters: any): Promise<any> => {
    const data = await client.query({ query: SEARCH_QUERY, variables: { filters } });
    return data.data
};