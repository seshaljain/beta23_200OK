import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Ride
from user.models import Student


class RideType(DjangoObjectType):
    class Meta:
        model = Ride
        # fields = ('id', 'user', 'has_vehicle', 'vehicle_type', 'finished', 'start_time')


class CreateRide(graphene.Mutation):
    ride = graphene.Field(RideType)

    class Arguments:
        has_vehicle = graphene.Boolean()
        vehicle_type = graphene.String()
        start_time = graphene.DateTime()
        end_time = graphene.DateTime()

    @classmethod
    @login_required
    def mutate(cls, root, info, has_vehicle, vehicle_type, start_time, end_time):
        student = Student.objects.get(user=info.context.user)
        ride = Ride(student=student, has_vehicle=has_vehicle,
                    vehicle_type=vehicle_type, start_time=start_time, end_time=end_time)
        ride.save()

        return CreateRide(ride=ride)


class UpdateRide(graphene.Mutation):
    ride = graphene.Field(RideType)

    class Arguments:
        id = graphene.Int()
        has_vehicle = graphene.Boolean()
        vehicle_type = graphene.String()
        finished = graphene.Boolean()

    @classmethod
    @login_required
    def mutate(cls, root, info, id, finished):
        ride = Ride.objects.get(id=id)
        if ride is None:
            return None
        ride.finished = finished
        ride.save()

        return UpdateRide(ride=ride)


class RideMutation(graphene.ObjectType):
    create_ride = CreateRide.Field()
    update_ride = UpdateRide.Field()


class RideQuery(graphene.ObjectType):
    all_rides = graphene.List(RideType, only_not_finished=graphene.Boolean())

    def resolve_all_rides(self, info, only_not_finished=False):
        if only_not_finished:
            return Ride.objects.filter(finished=False)
        else:
            return Ride.objects.all()
