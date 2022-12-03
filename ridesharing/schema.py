import graphene
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from .models import Ride


class RideType(DjangoObjectType):
    class Meta:
        model = Ride


class CreateRide(graphene.Mutation):
    ride = graphene.Field(RideType)

    class Arguments:
        has_vehicle = graphene.Boolean()
        vehicle_type = graphene.String()
        start_time = graphene.DateTime()

    @classmethod
    @login_required
    def mutate(cls, root, info, has_vehicle, vehicle_type, start_time):
        ride = Ride(user=info.context.user, has_vehicle=has_vehicle,
                    vehicle_type=vehicle_type, start_time=start_time)
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
    all_rides = graphene.List(RideType, finished=graphene.Boolean())

    def resolve_all_rides(self, info, finished=False):
        return Ride.objects.filter(finished=finished)
