from flask.json import JSONEncoder
from googleplaces import GooglePlaces, types

from api_key import API_KEY


class NonASCIIJSONEncoder(JSONEncoder):
    def __init__(self, **kwargs):
        super(NonASCIIJSONEncoder, self).__init__(**kwargs)
        self.ensure_ascii = False


def _get_photo(place):
    pass


def _is_open(place_details):
    try:
        return place_details['opening_hours']['open_now']
    except (KeyError, AttributeError):
        return False


def _filter_place_data(place):
    place.get_details()
    data = {}
    data['name'] = place.name
    data['rating'] = place.rating
    data['formatted_address'] = place.formatted_address
    data['tel_number'] = place.international_phone_number
    data['website'] = place.website
    data['geo_location'] = place.geo_location

    # Retrieve additional information
    details = place.details
    additionals = []
    data.update({key: details[key] for key in additionals if key in details})

    data['is_open'] = _is_open(details)
    return data


def find_restaurants(request):
    g_places = GooglePlaces(API_KEY)
    request_fields = ['lat_lng', 'radius']
    api_req = {k: request[k] for k in request_fields}
    query_result = g_places.nearby_search(types=[types.TYPE_FOOD], **api_req)

    places = map(_filter_place_data, query_result.places)

    return {'places': places}
