import graphene

from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Post
from user.models import Student

class PostType(DjangoObjectType):
    class Meta:
        model = Post

class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        title = graphene.String()
        content = graphene.String()
        tags = graphene.String()

    @classmethod
    @login_required
    def mutate(cls, root, info, title, content, tags):
        student = Student.objects.get(user=info.context.user)
        post = Post(student=student, title=title, content=content, tags=tags)
        post.save()

        return CreatePost(post=post)

class PostMutation(graphene.ObjectType):
    create_post = CreatePost.Field()

class PostQuery(graphene.ObjectType):
    all_posts = graphene.List(PostType)
    post = graphene.Field(PostType, id=graphene.Int())

    def resolve_all_posts(self, info):
        return Post.objects.all()

    def resolve_post(self, info, id):
        return Post.objects.get(id=id)