import graphene

from graphql_auth.schema import MeQuery
from graphql_auth import mutations

from user.schema import StudentMutation

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()

class Query(MeQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, StudentMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)