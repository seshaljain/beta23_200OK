import graphene

from graphql_auth.schema import MeQuery
from graphql_auth import mutations

from user.schema import StudentMutation, ComplaintMutation
from user.schema import ComplaintQuery

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_account = mutations.UpdateAccount.Field()

class Query(MeQuery, ComplaintQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, StudentMutation, ComplaintMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)