import graphene

from graphql_auth.schema import MeQuery
from graphql_auth import mutations

from user.schema import StudentMutation, ComplaintMutation, StudentInOutTimeMutation
from user.schema import ComplaintQuery, StudentInOutTimeQuery

from ridesharing.schema import RideMutation
from ridesharing.schema import RideQuery


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_account = mutations.UpdateAccount.Field()


class Query(MeQuery, ComplaintQuery, StudentInOutTimeQuery, RideQuery, graphene.ObjectType):
    pass


class Mutation(AuthMutation, StudentMutation, ComplaintMutation, StudentInOutTimeMutation, RideMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
