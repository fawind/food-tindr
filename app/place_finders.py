import logging

from flask.json import JSONEncoder
from googleplaces import GooglePlaces, types, _get_place_details

from api_key import API_KEY


logger = logging.getLogger()


class NonASCIIJSONEncoder(JSONEncoder):
    def __init__(self, **kwargs):
        super(NonASCIIJSONEncoder, self).__init__(**kwargs)
        self.ensure_ascii = False


def _get_photo(place):
    # logger.warning(place.photos[0].html_attributions)
    # logger.warning(place.photos[0].photo_reference)
    return ''


def _is_open(place_details):
    try:
        return place_details['opening_hours']['open_now']
    except (KeyError, AttributeError):
        return False


def _filter_place_data(place):
    data = {}
    data['id'] = place.place_id
    data['name'] = place.name
    data['rating'] = place._rating
    data['address'] = place.vicinity
    data['geo_location'] = place.geo_location

    # Retrieve additional information
    # details = place.details
    # additionals = []
    # data.update({key: details[key] for key in additionals if key in details})
    # data['is_open'] = _is_open(details)
    # data['photo'] = _get_photo(place)

    return data


def _find_places(request, place_type):
    g_places = GooglePlaces(API_KEY)
    request_fields = ['lat_lng', 'radius']
    api_req = {k: request[k] for k in request_fields}

    query_result = g_places.nearby_search(types=place_type, **api_req)
    places = map(_filter_place_data, query_result.places)
    return {'places': places}


def find_restaurants(request):
    return _find_places(request, [types.TYPE_FOOD, types.TYPE_MEAL_TAKEAWAY,
                                  types.TYPE_RESTAURANT])


def find_drinks(request):
    return _find_places(request, [types.BAR, types.CAFE])


def get_details(place_id):
    return {'details': _get_place_details(place_id, API_KEY)}
