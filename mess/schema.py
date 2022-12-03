import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import MessNotEating
from user.models import Student

import datetime


class MessNotEatingType(DjangoObjectType):
    class Meta:
        model = MessNotEating


class CreateMessNotEating(graphene.Mutation):
    mess_not_eating = graphene.Field(MessNotEatingType)

    class Arguments:
        pass

    @classmethod
    @login_required
    def mutate(cls, root, info):
        student = Student.objects.get(user=info.context.user)
        # check if there is already an entry for today
        mess_not_eating_today = MessNotEating.objects.filter(
            student=student, date=datetime.date.today())

        if mess_not_eating_today is None:
            mess_not_eating = MessNotEating(
                student=student, date=datetime.datetime.date(datetime.datetime.now()))
            mess_not_eating.save()
            return CreateMessNotEating(mess_not_eating=mess_not_eating)

        return CreateMessNotEating(mess_not_eating=mess_not_eating_today[0])


class MessNotEatingMutation(graphene.ObjectType):
    create_mess_not_eating = CreateMessNotEating.Field()


class MessNotEatingQuery(graphene.ObjectType):
    mess_not_eating_today = graphene.List(
        MessNotEatingType, date=graphene.Date())
    student_not_eaten = graphene.List(
        MessNotEatingType, username=graphene.String())

    @classmethod
    @login_required
    def resolve_mess_not_eating_today(cls, root, info, **kwargs):
        date = kwargs.get('date', None)
        if date is not None:
            return MessNotEating.objects.filter(date=date)
        return MessNotEating.objects.filter(date=datetime.datetime.date(datetime.datetime.now()))

    @classmethod
    @login_required
    def resolve_student_not_eaten(cls, root, info, **kwargs):
        username = kwargs.get('username', None)
        if username is not None:
            student = Student.objects.get(user__username=username)
            return MessNotEating.objects.filter(student=student)
        return MessNotEating.objects.none()
