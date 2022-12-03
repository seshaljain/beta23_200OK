import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  ExpectedErrorType: any;
};

export type ComplaintType = {
  __typename?: 'ComplaintType';
  complaint: Scalars['String'];
  date: Scalars['Date'];
  id: Scalars['ID'];
  status: Scalars['Boolean'];
  student: StudentType;
};

export type CreateComplaint = {
  __typename?: 'CreateComplaint';
  complaint?: Maybe<ComplaintType>;
};

export type CreateRide = {
  __typename?: 'CreateRide';
  ride?: Maybe<RideType>;
};

export type CreateStudent = {
  __typename?: 'CreateStudent';
  student?: Maybe<StudentType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComplaint?: Maybe<CreateComplaint>;
  createRide?: Maybe<CreateRide>;
  createStudent?: Maybe<CreateStudent>;
  inTime?: Maybe<StudentGoingInTime>;
  outTime?: Maybe<StudentGoingOutTime>;
  /**
   * Register user with fields defined in the settings.
   *
   * If the email field of the user model is part of the
   * registration fields (default), check if there is
   * no user with that email or as a secondary email.
   *
   * If it exists, it does not register the user,
   * even if the email field is not defined as unique
   * (default of the default django user model).
   *
   * When creating the user, it also creates a `UserStatus`
   * related to that user, making it possible to track
   * if the user is archived, verified and has a secondary
   * email.
   *
   * Send account verification email.
   *
   * If allowed to not verified users login, return token.
   */
  register?: Maybe<Register>;
  /**
   * Obtain JSON web token for given user.
   *
   * Allow to perform login with different fields,
   * and secondary email if set. The fields are
   * defined on settings.
   *
   * Not verified users can login by default. This
   * can be changes on settings.
   *
   * If user is archived, make it unarchive and
   * return `unarchiving=True` on output.
   */
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  /**
   * Update user model fields, defined on settings.
   *
   * User must be verified.
   */
  updateAccount?: Maybe<UpdateAccount>;
  updateComplaint?: Maybe<UpdateComplaint>;
  updateRide?: Maybe<UpdateRide>;
  updateStudent?: Maybe<UpdateStudent>;
  /**
   * Verify user account.
   *
   * Receive the token that was sent by email.
   * If the token is valid, make the user verified
   * by making the `user.status.verified` field true.
   */
  verifyAccount?: Maybe<VerifyAccount>;
};


export type MutationCreateComplaintArgs = {
  complaint?: InputMaybe<Scalars['String']>;
};


export type MutationCreateRideArgs = {
  hasVehicle?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
  vehicleType?: InputMaybe<Scalars['String']>;
};


export type MutationCreateStudentArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationInTimeArgs = {
  username: Scalars['String'];
};


export type MutationOutTimeArgs = {
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  isStudent?: InputMaybe<Scalars['Boolean']>;
  password1: Scalars['String'];
  password2: Scalars['String'];
  username: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateAccountArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateComplaintArgs = {
  id: Scalars['Int'];
  status: Scalars['String'];
};


export type MutationUpdateRideArgs = {
  finished?: InputMaybe<Scalars['Boolean']>;
  hasVehicle?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['Int']>;
  vehicleType?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateStudentArgs = {
  course?: InputMaybe<Scalars['String']>;
  enrollmentNo?: InputMaybe<Scalars['String']>;
  fatherName?: InputMaybe<Scalars['String']>;
  studentName?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyAccountArgs = {
  token: Scalars['String'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/**
 * Obtain JSON web token for given user.
 *
 * Allow to perform login with different fields,
 * and secondary email if set. The fields are
 * defined on settings.
 *
 * Not verified users can login by default. This
 * can be changes on settings.
 *
 * If user is archived, make it unarchive and
 * return `unarchiving=True` on output.
 */
export type ObtainJsonWebToken = {
  __typename?: 'ObtainJSONWebToken';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
  unarchiving?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserNode>;
};

export type Query = {
  __typename?: 'Query';
  allRides?: Maybe<Array<Maybe<RideType>>>;
  allStudentInOutTimes?: Maybe<Array<Maybe<StudentInOutTimeType>>>;
  complaintsAll?: Maybe<Array<Maybe<ComplaintType>>>;
  me?: Maybe<UserNode>;
  studentInOutTime?: Maybe<StudentInOutTimeType>;
  studentInOutTimes?: Maybe<Array<Maybe<StudentInOutTimeType>>>;
  userComplaint?: Maybe<ComplaintType>;
  userComplaintsAll?: Maybe<Array<Maybe<ComplaintType>>>;
};


export type QueryAllRidesArgs = {
  onlyNotFinished?: InputMaybe<Scalars['Boolean']>;
};


export type QueryStudentInOutTimeArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryStudentInOutTimesArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type QueryUserComplaintArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

/**
 * Register user with fields defined in the settings.
 *
 * If the email field of the user model is part of the
 * registration fields (default), check if there is
 * no user with that email or as a secondary email.
 *
 * If it exists, it does not register the user,
 * even if the email field is not defined as unique
 * (default of the default django user model).
 *
 * When creating the user, it also creates a `UserStatus`
 * related to that user, making it possible to track
 * if the user is archived, verified and has a secondary
 * email.
 *
 * Send account verification email.
 *
 * If allowed to not verified users login, return token.
 */
export type Register = {
  __typename?: 'Register';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type RideType = {
  __typename?: 'RideType';
  finished: Scalars['Boolean'];
  hasVehicle: Scalars['Boolean'];
  id: Scalars['ID'];
  startTime?: Maybe<Scalars['DateTime']>;
  vehicleType: Scalars['String'];
};

export type StudentGoingInTime = {
  __typename?: 'StudentGoingInTime';
  studentGoingInTime?: Maybe<StudentInOutTimeType>;
};

export type StudentGoingOutTime = {
  __typename?: 'StudentGoingOutTime';
  studentGoingOutTime?: Maybe<StudentInOutTimeType>;
};

export type StudentInOutTimeType = {
  __typename?: 'StudentInOutTimeType';
  date: Scalars['Date'];
  id: Scalars['ID'];
  inTime?: Maybe<Scalars['DateTime']>;
  outTime?: Maybe<Scalars['DateTime']>;
  student: StudentType;
};

export type StudentType = {
  __typename?: 'StudentType';
  complaintSet: Array<ComplaintType>;
  course?: Maybe<Scalars['String']>;
  enrollmentNo?: Maybe<Scalars['String']>;
  fatherName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  noDues: Scalars['Boolean'];
  room?: Maybe<Scalars['String']>;
  roomAllotted: Scalars['Boolean'];
  studentName?: Maybe<Scalars['String']>;
  studentinouttimeSet: Array<StudentInOutTimeType>;
};

/**
 * Update user model fields, defined on settings.
 *
 * User must be verified.
 */
export type UpdateAccount = {
  __typename?: 'UpdateAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type UpdateComplaint = {
  __typename?: 'UpdateComplaint';
  complaint?: Maybe<ComplaintType>;
};

export type UpdateRide = {
  __typename?: 'UpdateRide';
  ride?: Maybe<RideType>;
};

export type UpdateStudent = {
  __typename?: 'UpdateStudent';
  student?: Maybe<StudentType>;
};

export type UserNode = Node & {
  __typename?: 'UserNode';
  archived?: Maybe<Scalars['Boolean']>;
  dateJoined: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** The ID of the object. */
  id: Scalars['ID'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  isStudent: Scalars['Boolean'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  lastName: Scalars['String'];
  pk?: Maybe<Scalars['Int']>;
  rideSet: Array<RideType>;
  secondaryEmail?: Maybe<Scalars['String']>;
  student?: Maybe<StudentType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
};

/**
 * Verify user account.
 *
 * Receive the token that was sent by email.
 * If the token is valid, make the user verified
 * by making the `user.status.verified` field true.
 */
export type VerifyAccount = {
  __typename?: 'VerifyAccount';
  errors?: Maybe<Scalars['ExpectedErrorType']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type LoginMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', tokenAuth?: { __typename?: 'ObtainJSONWebToken', token?: string | null, success?: boolean | null, user?: { __typename?: 'UserNode', id: string, username: string } | null } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'Register', success?: boolean | null, token?: string | null } | null };

export type VerifyTokMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyTokMutation = { __typename?: 'Mutation', verifyAccount?: { __typename?: 'VerifyAccount', success?: boolean | null, errors?: any | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', me?: { __typename?: 'UserNode', id: string, username: string, isStudent: boolean } | null };

export type UpdateStudMutationVariables = Exact<{
  course?: InputMaybe<Scalars['String']>;
  enrollmentNo?: InputMaybe<Scalars['String']>;
  fatherName?: InputMaybe<Scalars['String']>;
  studentName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateStudMutation = { __typename?: 'Mutation', updateStudent?: { __typename?: 'UpdateStudent', student?: { __typename?: 'StudentType', id: string, enrollmentNo?: string | null, studentName?: string | null, fatherName?: string | null, course?: string | null } | null } | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UserNode', student?: { __typename?: 'StudentType', id: string, enrollmentNo?: string | null, studentName?: string | null, fatherName?: string | null, course?: string | null } | null } | null };


export const LoginDocument = gql`
    mutation login($username: String, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    success
    user {
      id
      username
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $username: String!, $password: String!) {
  register(
    email: $email
    username: $username
    password1: $password
    password2: $password
  ) {
    success
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const VerifyTokDocument = gql`
    mutation verifyTok($token: String!) {
  verifyAccount(token: $token) {
    success
    errors
  }
}
    `;
export type VerifyTokMutationFn = Apollo.MutationFunction<VerifyTokMutation, VerifyTokMutationVariables>;

/**
 * __useVerifyTokMutation__
 *
 * To run a mutation, you first call `useVerifyTokMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyTokMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyTokMutation, { data, loading, error }] = useVerifyTokMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyTokMutation(baseOptions?: Apollo.MutationHookOptions<VerifyTokMutation, VerifyTokMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyTokMutation, VerifyTokMutationVariables>(VerifyTokDocument, options);
      }
export type VerifyTokMutationHookResult = ReturnType<typeof useVerifyTokMutation>;
export type VerifyTokMutationResult = Apollo.MutationResult<VerifyTokMutation>;
export type VerifyTokMutationOptions = Apollo.BaseMutationOptions<VerifyTokMutation, VerifyTokMutationVariables>;
export const UserDocument = gql`
    query user {
  me {
    id
    username
    isStudent
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UpdateStudDocument = gql`
    mutation updateStud($course: String, $enrollmentNo: String, $fatherName: String, $studentName: String) {
  updateStudent(
    course: $course
    enrollmentNo: $enrollmentNo
    fatherName: $fatherName
    studentName: $studentName
  ) {
    student {
      id
      enrollmentNo
      studentName
      fatherName
      course
    }
  }
}
    `;
export type UpdateStudMutationFn = Apollo.MutationFunction<UpdateStudMutation, UpdateStudMutationVariables>;

/**
 * __useUpdateStudMutation__
 *
 * To run a mutation, you first call `useUpdateStudMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudMutation, { data, loading, error }] = useUpdateStudMutation({
 *   variables: {
 *      course: // value for 'course'
 *      enrollmentNo: // value for 'enrollmentNo'
 *      fatherName: // value for 'fatherName'
 *      studentName: // value for 'studentName'
 *   },
 * });
 */
export function useUpdateStudMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStudMutation, UpdateStudMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStudMutation, UpdateStudMutationVariables>(UpdateStudDocument, options);
      }
export type UpdateStudMutationHookResult = ReturnType<typeof useUpdateStudMutation>;
export type UpdateStudMutationResult = Apollo.MutationResult<UpdateStudMutation>;
export type UpdateStudMutationOptions = Apollo.BaseMutationOptions<UpdateStudMutation, UpdateStudMutationVariables>;
export const ProfileDocument = gql`
    query profile {
  me {
    student {
      id
      enrollmentNo
      studentName
      fatherName
      course
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;