import * as Types from '../generated/graphql';

import { api } from '../Redux/apis/services';
export type RegisterUserMutationVariables = Types.Exact<{
  email?: Types.InputMaybe<Types.Scalars['String']>;
  password?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', accountRegister?: { __typename?: 'AccountRegister', accountErrors: Array<{ __typename?: 'AccountError', field?: string | null, code: Types.AccountErrorCode }>, user?: { __typename?: 'User', email: string, isActive: boolean } | null } | null };


export const RegisterUserDocument = `
    mutation registerUser($email: String = "", $password: String = "") {
  accountRegister(
    input: {email: $email, password: $password, channel: "default-channel"}
  ) {
    accountErrors {
      field
      code
    }
    user {
      email
      isActive
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<RegisterUserMutation, RegisterUserMutationVariables | void>({
      query: (variables) => ({ document: RegisterUserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };


