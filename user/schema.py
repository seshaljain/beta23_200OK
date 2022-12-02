import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Student

class StudentType(DjangoObjectType):
    class Meta:
        model = Student

class UpdateStudent(graphene.Mutation):
    student = graphene.Field(StudentType)

    class Arguments:
        student_name = graphene.String()
        father_name = graphene.String()
        enrollment_no = graphene.String()
        course = graphene.String()
        dob = graphene.String()
        gender = graphene.String()

    @classmethod
    @login_required
    def mutate(cls, root, info, **kwargs):
        student = Student.objects.get(user=info.context.user)
        
        for (key, value) in kwargs.items():
            setattr(student, key, value)

        student.save()

        return UpdateStudent(student=student)


class CreateStudent(graphene.Mutation):
    student = graphene.Field(StudentType)

    class Arguments:
        name = graphene.String()

    @classmethod
    @login_required
    def mutate(cls, root, info, name):
        print("here in class: ", cls)
        print(root)
        print(info.context.user)
        print(name)
        student = Student(user=info.context.user, student_name=name)
        student.save()

        return CreateStudent(student=student)


class StudentMutation(graphene.ObjectType):
    create_student = CreateStudent.Field()
    update_student = UpdateStudent.Field()