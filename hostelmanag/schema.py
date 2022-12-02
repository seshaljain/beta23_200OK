import graphene

from graphql_auth.schema import MeQuery
from graphql_auth import mutations

from user.schema import StudentMutation, ComplaintMutation, StudentInOutTimeMutation
from user.schema import ComplaintQuery, StudentInOutTimeQuery

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_account = mutations.UpdateAccount.Field()

class Query(MeQuery, ComplaintQuery, StudentInOutTimeQuery, graphene.ObjectType):
    pass

class Mutation(AuthMutation, StudentMutation, ComplaintMutation, StudentInOutTimeMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)