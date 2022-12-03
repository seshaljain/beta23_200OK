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

export type CreateMessNotEating = {
  __typename?: 'CreateMessNotEating';
  messNotEating?: Maybe<MessNotEatingType>;
};

export type CreatePost = {
  __typename?: 'CreatePost';
  post?: Maybe<PostType>;
};

export type CreateRide = {
  __typename?: 'CreateRide';
  ride?: Maybe<RideType>;
};

export type CreateStudent = {
  __typename?: 'CreateStudent';
  student?: Maybe<StudentType>;
};

export type InfoType = {
  __typename?: 'InfoType';
  complaintsPendingCnt?: Maybe<Scalars['Int']>;
  daysGoneOut?: Maybe<Array<Maybe<StudentInOutTimeType>>>;
  daysGoneOutCnt?: Maybe<Scalars['Int']>;
  messNotEating?: Maybe<Array<Maybe<MessNotEatingType>>>;
  messNotEatingCnt?: Maybe<Scalars['Int']>;
};

export type MessNotEatingType = {
  __typename?: 'MessNotEatingType';
  date: Scalars['Date'];
  id: Scalars['ID'];
  student: StudentType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComplaint?: Maybe<CreateComplaint>;
  createMessNotEating?: Maybe<CreateMessNotEating>;
  createPost?: Maybe<CreatePost>;
  createRide?: Maybe<CreateRide>;
  createStudent?: Maybe<CreateStudent>;
  inTime?: Maybe<StudentGoingInTime>;
  outTime?: Maybe<StudentGoingOutTime>;
  qrScan?: Maybe<StudentQrScan>;
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


export type MutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCreateRideArgs = {
  endTime?: InputMaybe<Scalars['DateTime']>;
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


export type MutationQrScanArgs = {
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

export type PostType = {
  __typename?: 'PostType';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  student: StudentType;
  tags: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allPosts?: Maybe<Array<Maybe<PostType>>>;
  allRides?: Maybe<Array<Maybe<RideType>>>;
  allStudentInOutTimes?: Maybe<Array<Maybe<StudentInOutTimeType>>>;
  allStudentInOutTimesToday?: Maybe<Array<Maybe<StudentInOutTimeType>>>;
  allWardens?: Maybe<Array<Maybe<WardenType>>>;
  complaintsAll?: Maybe<Array<Maybe<ComplaintType>>>;
  getAllStudents?: Maybe<Array<Maybe<StudentType>>>;
  getStudent?: Maybe<StudentType>;
  me?: Maybe<UserNode>;
  messNotEatingToday?: Maybe<Array<Maybe<MessNotEatingType>>>;
  post?: Maybe<PostType>;
  studentInOutTime?: Maybe<StudentInOutTimeType>;
  studentInOutTimes?: Maybe<Array<Maybe<StudentInOutTimeType>>>;
  studentNotEaten?: Maybe<Array<Maybe<MessNotEatingType>>>;
  userComplaint?: Maybe<ComplaintType>;
  userComplaintsAll?: Maybe<Array<Maybe<ComplaintType>>>;
  userInfo?: Maybe<InfoType>;
  warden?: Maybe<WardenType>;
};


export type QueryAllRidesArgs = {
  onlyNotFinished?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetStudentArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryMessNotEatingTodayArgs = {
  date?: InputMaybe<Scalars['Date']>;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryStudentInOutTimeArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryStudentInOutTimesArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type QueryStudentNotEatenArgs = {
  username?: InputMaybe<Scalars['String']>;
};


export type QueryUserComplaintArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryWardenArgs = {
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
  endTime?: Maybe<Scalars['DateTime']>;
  finished: Scalars['Boolean'];
  hasVehicle: Scalars['Boolean'];
  id: Scalars['ID'];
  startTime?: Maybe<Scalars['DateTime']>;
  student?: Maybe<StudentType>;
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

export type StudentQrScan = {
  __typename?: 'StudentQRScan';
  studentQRScan?: Maybe<StudentInOutTimeType>;
};

export type StudentType = {
  __typename?: 'StudentType';
  complaintSet: Array<ComplaintType>;
  course?: Maybe<Scalars['String']>;
  enrollmentNo?: Maybe<Scalars['String']>;
  fatherName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  messnoteatingSet: Array<MessNotEatingType>;
  noDues: Scalars['Boolean'];
  postSet: Array<PostType>;
  rideSet: Array<RideType>;
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
  secondaryEmail?: Maybe<Scalars['String']>;
  student?: Maybe<StudentType>;
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  verified?: Maybe<Scalars['Boolean']>;
  warden?: Maybe<WardenType>;
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

export type WardenType = {
  __typename?: 'WardenType';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
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

export type UserComplaintsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserComplaintsQuery = { __typename?: 'Query', userComplaintsAll?: Array<{ __typename?: 'ComplaintType', complaint: string, status: boolean, date: any } | null> | null };

export type AllComplaintsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllComplaintsQuery = { __typename?: 'Query', complaintsAll?: Array<{ __typename?: 'ComplaintType', id: string, complaint: string, date: any, status: boolean, student: { __typename?: 'StudentType', id: string, studentName?: string | null, enrollmentNo?: string | null } } | null> | null };

export type CreateComplaintMutationVariables = Exact<{
  complaint: Scalars['String'];
}>;


export type CreateComplaintMutation = { __typename?: 'Mutation', createComplaint?: { __typename?: 'CreateComplaint', complaint?: { __typename?: 'ComplaintType', id: string, status: boolean, complaint: string } | null } | null };

export type OuttimeMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type OuttimeMutation = { __typename?: 'Mutation', outTime?: { __typename?: 'StudentGoingOutTime', studentGoingOutTime?: { __typename?: 'StudentInOutTimeType', id: string, inTime?: any | null, outTime?: any | null } | null } | null };

export type IntimeMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type IntimeMutation = { __typename?: 'Mutation', inTime?: { __typename?: 'StudentGoingInTime', studentGoingInTime?: { __typename?: 'StudentInOutTimeType', id: string, inTime?: any | null, outTime?: any | null } | null } | null };

export type ListLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListLogsQuery = { __typename?: 'Query', allStudentInOutTimesToday?: Array<{ __typename?: 'StudentInOutTimeType', id: string, inTime?: any | null, outTime?: any | null, date: any, student: { __typename?: 'StudentType', studentName?: string | null, enrollmentNo?: string | null } } | null> | null };

export type SetInTimeMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type SetInTimeMutation = { __typename?: 'Mutation', inTime?: { __typename?: 'StudentGoingInTime', studentGoingInTime?: { __typename?: 'StudentInOutTimeType', id: string } | null } | null };

export type CreateMessNotEatingMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateMessNotEatingMutation = { __typename?: 'Mutation', createMessNotEating?: { __typename?: 'CreateMessNotEating', messNotEating?: { __typename?: 'MessNotEatingType', id: string, date: any, student: { __typename?: 'StudentType', studentName?: string | null } } | null } | null };

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', allPosts?: Array<{ __typename?: 'PostType', id: string, title: string, tags: string, content: string, createdAt: any, student: { __typename?: 'StudentType', studentName?: string | null, enrollmentNo?: string | null } } | null> | null };

export type UpdateStudMutationVariables = Exact<{
  course?: InputMaybe<Scalars['String']>;
  enrollmentNo?: InputMaybe<Scalars['String']>;
  fatherName?: InputMaybe<Scalars['String']>;
  studentName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateStudMutation = { __typename?: 'Mutation', updateStudent?: { __typename?: 'UpdateStudent', student?: { __typename?: 'StudentType', id: string, enrollmentNo?: string | null, studentName?: string | null, fatherName?: string | null, course?: string | null } | null } | null };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', me?: { __typename?: 'UserNode', student?: { __typename?: 'StudentType', id: string, enrollmentNo?: string | null, studentName?: string | null, fatherName?: string | null, course?: string | null } | null } | null };

export type UserinfoQueryVariables = Exact<{ [key: string]: never; }>;


export type UserinfoQuery = { __typename?: 'Query', userInfo?: { __typename?: 'InfoType', messNotEatingCnt?: number | null, daysGoneOutCnt?: number | null, complaintsPendingCnt?: number | null, messNotEating?: Array<{ __typename?: 'MessNotEatingType', id: string, date: any, student: { __typename?: 'StudentType', studentName?: string | null } } | null> | null, daysGoneOut?: Array<{ __typename?: 'StudentInOutTimeType', id: string, date: any, inTime?: any | null, outTime?: any | null, student: { __typename?: 'StudentType', studentName?: string | null } } | null> | null } | null };

export type AllRidesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllRidesQuery = { __typename?: 'Query', allRides?: Array<{ __typename?: 'RideType', id: string, hasVehicle: boolean, vehicleType: string, endTime?: any | null, startTime?: any | null, student?: { __typename?: 'StudentType', studentName?: string | null, enrollmentNo?: string | null } | null } | null> | null };

export type CreateRideMutationVariables = Exact<{
  hasVehicle?: InputMaybe<Scalars['Boolean']>;
  startTime?: InputMaybe<Scalars['DateTime']>;
}>;


export type CreateRideMutation = { __typename?: 'Mutation', createRide?: { __typename?: 'CreateRide', ride?: { __typename?: 'RideType', id: string } | null } | null };

export type ListStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListStudentsQuery = { __typename?: 'Query', getAllStudents?: Array<{ __typename?: 'StudentType', id: string, studentName?: string | null, fatherName?: string | null, enrollmentNo?: string | null, course?: string | null } | null> | null };


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
export const UserComplaintsDocument = gql`
    query userComplaints {
  userComplaintsAll {
    complaint
    status
    date
  }
}
    `;

/**
 * __useUserComplaintsQuery__
 *
 * To run a query within a React component, call `useUserComplaintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserComplaintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserComplaintsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserComplaintsQuery(baseOptions?: Apollo.QueryHookOptions<UserComplaintsQuery, UserComplaintsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserComplaintsQuery, UserComplaintsQueryVariables>(UserComplaintsDocument, options);
      }
export function useUserComplaintsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserComplaintsQuery, UserComplaintsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserComplaintsQuery, UserComplaintsQueryVariables>(UserComplaintsDocument, options);
        }
export type UserComplaintsQueryHookResult = ReturnType<typeof useUserComplaintsQuery>;
export type UserComplaintsLazyQueryHookResult = ReturnType<typeof useUserComplaintsLazyQuery>;
export type UserComplaintsQueryResult = Apollo.QueryResult<UserComplaintsQuery, UserComplaintsQueryVariables>;
export const AllComplaintsDocument = gql`
    query allComplaints {
  complaintsAll {
    id
    student {
      id
      studentName
      enrollmentNo
    }
    complaint
    date
    status
  }
}
    `;

/**
 * __useAllComplaintsQuery__
 *
 * To run a query within a React component, call `useAllComplaintsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllComplaintsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllComplaintsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllComplaintsQuery(baseOptions?: Apollo.QueryHookOptions<AllComplaintsQuery, AllComplaintsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllComplaintsQuery, AllComplaintsQueryVariables>(AllComplaintsDocument, options);
      }
export function useAllComplaintsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllComplaintsQuery, AllComplaintsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllComplaintsQuery, AllComplaintsQueryVariables>(AllComplaintsDocument, options);
        }
export type AllComplaintsQueryHookResult = ReturnType<typeof useAllComplaintsQuery>;
export type AllComplaintsLazyQueryHookResult = ReturnType<typeof useAllComplaintsLazyQuery>;
export type AllComplaintsQueryResult = Apollo.QueryResult<AllComplaintsQuery, AllComplaintsQueryVariables>;
export const CreateComplaintDocument = gql`
    mutation createComplaint($complaint: String!) {
  createComplaint(complaint: $complaint) {
    complaint {
      id
      status
      complaint
    }
  }
}
    `;
export type CreateComplaintMutationFn = Apollo.MutationFunction<CreateComplaintMutation, CreateComplaintMutationVariables>;

/**
 * __useCreateComplaintMutation__
 *
 * To run a mutation, you first call `useCreateComplaintMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComplaintMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComplaintMutation, { data, loading, error }] = useCreateComplaintMutation({
 *   variables: {
 *      complaint: // value for 'complaint'
 *   },
 * });
 */
export function useCreateComplaintMutation(baseOptions?: Apollo.MutationHookOptions<CreateComplaintMutation, CreateComplaintMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComplaintMutation, CreateComplaintMutationVariables>(CreateComplaintDocument, options);
      }
export type CreateComplaintMutationHookResult = ReturnType<typeof useCreateComplaintMutation>;
export type CreateComplaintMutationResult = Apollo.MutationResult<CreateComplaintMutation>;
export type CreateComplaintMutationOptions = Apollo.BaseMutationOptions<CreateComplaintMutation, CreateComplaintMutationVariables>;
export const OuttimeDocument = gql`
    mutation outtime($username: String!) {
  outTime(username: $username) {
    studentGoingOutTime {
      id
      inTime
      outTime
    }
  }
}
    `;
export type OuttimeMutationFn = Apollo.MutationFunction<OuttimeMutation, OuttimeMutationVariables>;

/**
 * __useOuttimeMutation__
 *
 * To run a mutation, you first call `useOuttimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOuttimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [outtimeMutation, { data, loading, error }] = useOuttimeMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useOuttimeMutation(baseOptions?: Apollo.MutationHookOptions<OuttimeMutation, OuttimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OuttimeMutation, OuttimeMutationVariables>(OuttimeDocument, options);
      }
export type OuttimeMutationHookResult = ReturnType<typeof useOuttimeMutation>;
export type OuttimeMutationResult = Apollo.MutationResult<OuttimeMutation>;
export type OuttimeMutationOptions = Apollo.BaseMutationOptions<OuttimeMutation, OuttimeMutationVariables>;
export const IntimeDocument = gql`
    mutation intime($username: String!) {
  inTime(username: $username) {
    studentGoingInTime {
      id
      inTime
      outTime
    }
  }
}
    `;
export type IntimeMutationFn = Apollo.MutationFunction<IntimeMutation, IntimeMutationVariables>;

/**
 * __useIntimeMutation__
 *
 * To run a mutation, you first call `useIntimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIntimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [intimeMutation, { data, loading, error }] = useIntimeMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIntimeMutation(baseOptions?: Apollo.MutationHookOptions<IntimeMutation, IntimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IntimeMutation, IntimeMutationVariables>(IntimeDocument, options);
      }
export type IntimeMutationHookResult = ReturnType<typeof useIntimeMutation>;
export type IntimeMutationResult = Apollo.MutationResult<IntimeMutation>;
export type IntimeMutationOptions = Apollo.BaseMutationOptions<IntimeMutation, IntimeMutationVariables>;
export const ListLogsDocument = gql`
    query listLogs {
  allStudentInOutTimesToday {
    id
    student {
      studentName
      enrollmentNo
    }
    inTime
    outTime
    date
  }
}
    `;

/**
 * __useListLogsQuery__
 *
 * To run a query within a React component, call `useListLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListLogsQuery(baseOptions?: Apollo.QueryHookOptions<ListLogsQuery, ListLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListLogsQuery, ListLogsQueryVariables>(ListLogsDocument, options);
      }
export function useListLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListLogsQuery, ListLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListLogsQuery, ListLogsQueryVariables>(ListLogsDocument, options);
        }
export type ListLogsQueryHookResult = ReturnType<typeof useListLogsQuery>;
export type ListLogsLazyQueryHookResult = ReturnType<typeof useListLogsLazyQuery>;
export type ListLogsQueryResult = Apollo.QueryResult<ListLogsQuery, ListLogsQueryVariables>;
export const SetInTimeDocument = gql`
    mutation setInTime($username: String!) {
  inTime(username: $username) {
    studentGoingInTime {
      id
    }
  }
}
    `;
export type SetInTimeMutationFn = Apollo.MutationFunction<SetInTimeMutation, SetInTimeMutationVariables>;

/**
 * __useSetInTimeMutation__
 *
 * To run a mutation, you first call `useSetInTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetInTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setInTimeMutation, { data, loading, error }] = useSetInTimeMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSetInTimeMutation(baseOptions?: Apollo.MutationHookOptions<SetInTimeMutation, SetInTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetInTimeMutation, SetInTimeMutationVariables>(SetInTimeDocument, options);
      }
export type SetInTimeMutationHookResult = ReturnType<typeof useSetInTimeMutation>;
export type SetInTimeMutationResult = Apollo.MutationResult<SetInTimeMutation>;
export type SetInTimeMutationOptions = Apollo.BaseMutationOptions<SetInTimeMutation, SetInTimeMutationVariables>;
export const CreateMessNotEatingDocument = gql`
    mutation createMessNotEating {
  createMessNotEating {
    messNotEating {
      id
      student {
        studentName
      }
      date
    }
  }
}
    `;
export type CreateMessNotEatingMutationFn = Apollo.MutationFunction<CreateMessNotEatingMutation, CreateMessNotEatingMutationVariables>;

/**
 * __useCreateMessNotEatingMutation__
 *
 * To run a mutation, you first call `useCreateMessNotEatingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessNotEatingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessNotEatingMutation, { data, loading, error }] = useCreateMessNotEatingMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateMessNotEatingMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessNotEatingMutation, CreateMessNotEatingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessNotEatingMutation, CreateMessNotEatingMutationVariables>(CreateMessNotEatingDocument, options);
      }
export type CreateMessNotEatingMutationHookResult = ReturnType<typeof useCreateMessNotEatingMutation>;
export type CreateMessNotEatingMutationResult = Apollo.MutationResult<CreateMessNotEatingMutation>;
export type CreateMessNotEatingMutationOptions = Apollo.BaseMutationOptions<CreateMessNotEatingMutation, CreateMessNotEatingMutationVariables>;
export const AllPostsDocument = gql`
    query allPosts {
  allPosts {
    id
    title
    tags
    content
    createdAt
    student {
      studentName
      enrollmentNo
    }
  }
}
    `;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
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
export const UserinfoDocument = gql`
    query userinfo {
  userInfo {
    messNotEating {
      id
      student {
        studentName
      }
      date
    }
    daysGoneOut {
      id
      date
      inTime
      outTime
      student {
        studentName
      }
    }
    messNotEatingCnt
    daysGoneOutCnt
    complaintsPendingCnt
  }
}
    `;

/**
 * __useUserinfoQuery__
 *
 * To run a query within a React component, call `useUserinfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserinfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserinfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserinfoQuery(baseOptions?: Apollo.QueryHookOptions<UserinfoQuery, UserinfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserinfoQuery, UserinfoQueryVariables>(UserinfoDocument, options);
      }
export function useUserinfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserinfoQuery, UserinfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserinfoQuery, UserinfoQueryVariables>(UserinfoDocument, options);
        }
export type UserinfoQueryHookResult = ReturnType<typeof useUserinfoQuery>;
export type UserinfoLazyQueryHookResult = ReturnType<typeof useUserinfoLazyQuery>;
export type UserinfoQueryResult = Apollo.QueryResult<UserinfoQuery, UserinfoQueryVariables>;
export const AllRidesDocument = gql`
    query allRides {
  allRides {
    id
    student {
      studentName
      enrollmentNo
    }
    hasVehicle
    vehicleType
    endTime
    startTime
  }
}
    `;

/**
 * __useAllRidesQuery__
 *
 * To run a query within a React component, call `useAllRidesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllRidesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllRidesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllRidesQuery(baseOptions?: Apollo.QueryHookOptions<AllRidesQuery, AllRidesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllRidesQuery, AllRidesQueryVariables>(AllRidesDocument, options);
      }
export function useAllRidesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllRidesQuery, AllRidesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllRidesQuery, AllRidesQueryVariables>(AllRidesDocument, options);
        }
export type AllRidesQueryHookResult = ReturnType<typeof useAllRidesQuery>;
export type AllRidesLazyQueryHookResult = ReturnType<typeof useAllRidesLazyQuery>;
export type AllRidesQueryResult = Apollo.QueryResult<AllRidesQuery, AllRidesQueryVariables>;
export const CreateRideDocument = gql`
    mutation createRide($hasVehicle: Boolean, $startTime: DateTime) {
  createRide(hasVehicle: $hasVehicle, startTime: $startTime) {
    ride {
      id
    }
  }
}
    `;
export type CreateRideMutationFn = Apollo.MutationFunction<CreateRideMutation, CreateRideMutationVariables>;

/**
 * __useCreateRideMutation__
 *
 * To run a mutation, you first call `useCreateRideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRideMutation, { data, loading, error }] = useCreateRideMutation({
 *   variables: {
 *      hasVehicle: // value for 'hasVehicle'
 *      startTime: // value for 'startTime'
 *   },
 * });
 */
export function useCreateRideMutation(baseOptions?: Apollo.MutationHookOptions<CreateRideMutation, CreateRideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRideMutation, CreateRideMutationVariables>(CreateRideDocument, options);
      }
export type CreateRideMutationHookResult = ReturnType<typeof useCreateRideMutation>;
export type CreateRideMutationResult = Apollo.MutationResult<CreateRideMutation>;
export type CreateRideMutationOptions = Apollo.BaseMutationOptions<CreateRideMutation, CreateRideMutationVariables>;
export const ListStudentsDocument = gql`
    query listStudents {
  getAllStudents {
    id
    studentName
    fatherName
    enrollmentNo
    course
  }
}
    `;

/**
 * __useListStudentsQuery__
 *
 * To run a query within a React component, call `useListStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListStudentsQuery(baseOptions?: Apollo.QueryHookOptions<ListStudentsQuery, ListStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStudentsQuery, ListStudentsQueryVariables>(ListStudentsDocument, options);
      }
export function useListStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStudentsQuery, ListStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStudentsQuery, ListStudentsQueryVariables>(ListStudentsDocument, options);
        }
export type ListStudentsQueryHookResult = ReturnType<typeof useListStudentsQuery>;
export type ListStudentsLazyQueryHookResult = ReturnType<typeof useListStudentsLazyQuery>;
export type ListStudentsQueryResult = Apollo.QueryResult<ListStudentsQuery, ListStudentsQueryVariables>;