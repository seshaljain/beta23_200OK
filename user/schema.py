import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Student, Complaint, StudentInOutTime

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
        dob = graphene.String()
        gender = graphene.String()

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
        complaint = Complaint(student=info.context.user.student, complaint=complaint)
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
        complaint = Complaint.objects.get(id = id)
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
        student_last_going_out = StudentInOutTime.objects.filter(student=student).last()
        student_last_going_out.in_time = datetime.now()
        student_last_going_out.save()

        return StudentGoingInTime(studentGoingInTime=student_last_going_out)

class StudentInOutTimeMutation(graphene.ObjectType):
    in_time = StudentGoingInTime.Field()
    out_time = StudentGoingOutTime.Field()


class StudentInOutTimeQuery(graphene.ObjectType):
    student_in_out_time = graphene.Field(StudentInOutTimeType, id=graphene.Int())
    student_in_out_times = graphene.List(StudentInOutTimeType, username=graphene.String())
    all_student_in_out_times = graphene.List(StudentInOutTimeType)
    

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