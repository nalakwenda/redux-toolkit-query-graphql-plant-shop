import * as Types from '../generated/graphql';

import { api } from '../Redux/apis/services';
export type AuthenticateUserMutationVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  password?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AuthenticateUserMutation = { __typename?: 'Mutation', tokenCreate?: { __typename?: 'CreateToken', token?: string | null, refreshToken?: string | null, csrfToken?: string | null, user?: { __typename?: 'User', email: string } | null, errors: Array<{ __typename?: 'AccountError', field?: string | null, message?: string | null }> } | null };


export const AuthenticateUserDocument = `
    mutation authenticateUser($email: String = "", $password: String = "") {
  tokenCreate(email: $email, password: $password) {
    token
    refreshToken
    csrfToken
    user {
      email
    }
    errors {
      field
      message
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticateUser: build.mutation<AuthenticateUserMutation, AuthenticateUserMutationVariables | void>({
      query: (variables) => ({ document: AuthenticateUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };


