from user.models import Student
from posting.models import Post
from django.contrib.auth import get_user_model

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

create_post(10)