from mess.schema import MessNotEatingType
import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from mess.models import MessNotEating

from .models import Student, Warden, Complaint, StudentInOutTime

from datetime import datetime


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

    @classmethod
    @login_required
    def mutate(cls, root, info, **kwargs):
        student = Student.objects.get_or_create(user=info.context.user)[0]

        for key, value in kwargs.items():
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


class WardenType(DjangoObjectType):
    class Meta:
        model = Warden


# class UpdateWarden(DjangoObjectType):
#     pass

class WardenQuery(graphene.ObjectType):
    get_all_students = graphene.List(StudentType)
    get_student = graphene.Field(StudentType, id=graphene.Int())

    @classmethod
    def resolve_get_student(cls, info, id):
        return Student.objects.get(id=id)

    def resolve_get_all_students(self, info):
        return Student.objects.all()

    all_wardens = graphene.List(WardenType)
    warden = graphene.Field(WardenType, id=graphene.Int())

    def resolve_all_wardens(self, info):
        return Warden.objects.all()

    def resolve_warden(self, info, id):
        return Warden.objects.get(id=id)


class ComplaintType(DjangoObjectType):
    class Meta:
        model = Complaint


class CreateComplaint(graphene.Mutation):
    complaint = graphene.Field(ComplaintType)

    class Arguments:
        complaint = graphene.String()

    @classmethod
    @login_required
    def mutate(cls, root, info, complaint):
        complaint = Complaint(
            student=info.context.user.student, complaint=complaint)
        complaint.save()

        return CreateComplaint(complaint=complaint)


class UpdateComplaint(graphene.Mutation):
    complaint = graphene.Field(ComplaintType)

    class Arguments:
        id = graphene.Int(required=True)
        status = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate(cls, root, info, id, status):
        complaint = Complaint.objects.get(id=id)
        complaint.status = True if status == 'true' else False
        complaint.save()

        return UpdateComplaint(complaint=complaint)


class ComplaintMutation(graphene.ObjectType):
    create_complaint = CreateComplaint.Field()
    update_complaint = UpdateComplaint.Field()


class ComplaintQuery(graphene.ObjectType):
    user_complaint = graphene.Field(ComplaintType, id=graphene.Int())
    user_complaints_all = graphene.List(ComplaintType)
    complaints_all = graphene.List(ComplaintType)

    @classmethod
    @login_required
    def resolve_user_complaint(cls, root, info, id):
        return Complaint.objects.get(id=id)

    @classmethod
    @login_required
    def resolve_user_complaints_all(cls, root, info):
        return Complaint.objects.filter(student=info.context.user.student)

    @classmethod
    @login_required
    def resolve_complaints_all(cls, root, info):
        if not info.context.user.is_student:
            return Complaint.objects.all()
        else:
            return None


class StudentInOutTimeType(DjangoObjectType):
    class Meta:
        model = StudentInOutTime


class StudentGoingOutTime(graphene.Mutation):
    studentGoingOutTime = graphene.Field(StudentInOutTimeType)

    class Arguments:
        username = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate(cls, root, info, username):
        student = Student.objects.filter(user__username=username).first()
        # check if any out time already exists for the student
        student_out = StudentInOutTime.objects.filter(
            student=student, in_time=None)
        if student_out:
            return None
        going_out = StudentInOutTime(student=student, out_time=datetime.now())
        going_out.save()

        return StudentGoingOutTime(studentGoingOutTime=going_out)


class StudentGoingInTime(graphene.Mutation):
    studentGoingInTime = graphene.Field(StudentInOutTimeType)

    class Arguments:
        username = graphene.String(required=True)

    @classmethod
    @login_required
    def mutate(cls, root, info, username):
        student = Student.objects.filter(user__username=username).first()
        student_last_going_out = StudentInOutTime.objects.filter(
            student=student).last()
        student_last_going_out.in_time = datetime.now()
        student_last_going_out.save()

        return StudentGoingInTime(studentGoingInTime=student_last_going_out)


class StudentInOutTimeMutation(graphene.ObjectType):
    in_time = StudentGoingInTime.Field()
    out_time = StudentGoingOutTime.Field()


class StudentInOutTimeQuery(graphene.ObjectType):
    student_in_out_time = graphene.Field(
        StudentInOutTimeType, id=graphene.Int())
    student_in_out_times = graphene.List(
        StudentInOutTimeType, username=graphene.String())
    all_student_in_out_times = graphene.List(StudentInOutTimeType)
    all_student_in_out_times_today = graphene.List(StudentInOutTimeType)

    @classmethod
    @login_required
    def resolve_student_in_out_time(cls, root, info, id):
        return StudentInOutTime.objects.get(id=id)

    @classmethod
    @login_required
    def resolve_student_in_out_times(cls, root, info, username):
        student = Student.objects.filter(user__username=username).first()
        return StudentInOutTime.objects.filter(student=student)

    @classmethod
    @login_required
    def resolve_all_student_in_out_times(cls, root, info):
        return StudentInOutTime.objects.all()

    @classmethod
    @login_required
    def resolve_all_student_in_out_times_today(cls, root, info):
        return StudentInOutTime.objects.filter(date=datetime.now())


# class InfoType(DjangoObjectType):


class InfoType(graphene.ObjectType):
    mess_not_eating = graphene.List(MessNotEatingType)
    mess_not_eating_cnt = graphene.Int()
    days_gone_out = graphene.List(StudentInOutTimeType)
    days_gone_out_cnt = graphene.Int()
    complaints_pending_cnt = graphene.Int()


class InfoQuery(graphene.ObjectType):
    user_info = graphene.Field(InfoType)

    @classmethod
    @login_required
    def resolve_user_info(cls, root, info):
        days_gone_out = StudentInOutTime.objects.filter(
            student=info.context.user.student, date__month=datetime.now().month)
        mess_not_eaten = MessNotEating.objects.filter(
            student=info.context.user.student, date__month=datetime.now().month)
        complaints_pending = Complaint.objects.filter(
            student=info.context.user.student, status=False)

        return InfoType(days_gone_out=days_gone_out
                        , mess_not_eating=mess_not_eaten
                        , days_gone_out_cnt=days_gone_out.count()
                        , mess_not_eating_cnt=mess_not_eaten.count()
                        , complaints_pending_cnt=complaints_pending.count())
