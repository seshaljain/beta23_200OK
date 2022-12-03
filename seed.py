from user.models import Student
from posting.models import Post
from user.models import StudentInOutTime
from django.contrib.auth import get_user_model
import datetime
import random

import lorem

User = get_user_model()


def create_user(n, cnt=10):
    for i in range(n, n+cnt):
        User.objects.create(username=f'user{i+100}', password=f'password{i+100}!!', email=f'user{i+100}@email.com')

def create_student(n, cnt = 10):
    for i in range(n, n+cnt):
        user = User.objects.get(username=f'user{i+100}')
        Student.objects.create(
            user_id = user.id,
            student_name = 'student' + str(i),
            father_name = 'fathers' + str(i),
            enrollment_no = 'en' + str(i),
            course = ["cse", "mech", "ece", "eee", "civil"][i%5]
        )


# create_user(10)
# create_student(10)

def create_post(n, cnt=10):
    for i in range(n, n+cnt):
        student = Student.objects.get(enrollment_no=f'en{i}')

        Post.objects.create(
            student_id=student.id,
            title=f'{lorem.sentence()}',
            content=f'{lorem.paragraph()}',
            tags=f'{["one", "two", "three", "four", "five"][i%5]}'
        )

# create_post(10)


def create_student_inout_time(n, cnt=10):
    for i in range(n, n+cnt):
        studentId = 110+random.randint(0, 10)
        user = User.objects.get(username=f'user{studentId}')
        if not user:
            continue

        student = Student.objects.filter(user=user).first()

        if not student:
            continue

        in_time = datetime.datetime.now()
        in_time_delta = random.randint(300, 600);
        in_time = in_time + datetime.timedelta(seconds=in_time_delta)
        
        out_time_delta = random.randint(0, 100)
        out_time = in_time + datetime.timedelta(minutes=out_time_delta)

        StudentInOutTime.objects.create(
            student=student,
            in_time=in_time,
            out_time=out_time,
            # date=datetime.date()
        )

create_student_inout_time(10, 25)