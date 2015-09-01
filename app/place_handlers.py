from flask.json import JSONEncoder
from googleplaces import GooglePlaces, types

from api_key import API_KEY


class NonASCIIJSONEncoder(JSONEncoder):
    def __init__(self, **kwargs):
        super(NonASCIIJSONEncoder, self).__init__(**kwargs)
        self.ensure_ascii = False


def _filter_place_data(place):
    place.get_details()
    data = place.details
    # TODO: FILTER
    return data


def find_restaurants(request):
    g_places = GooglePlaces(API_KEY)
    query_result = g_places.nearby_search(types=[types.TYPE_FOOD], **request)
    places = map(_filter_place_data, query_result.places)

    return {'places': places}
