from flask.json import JSONEncoder
from googleplaces import GooglePlaces, types

from api_key import API_KEY


class NonASCIIJSONEncoder(JSONEncoder):
    def __init__(self, **kwargs):
        super(NonASCIIJSONEncoder, self).__init__(**kwargs)
        self.ensure_ascii = False


def _replace_umlauts(string):
    umlauts = ['\u00df']
    for u in umlauts:
        string = string.replace(u, unicode(u))
    return string


def find_restaurants(request):
    google_places = GooglePlaces(API_KEY)

    query_result = google_places.nearby_search(
            lat_lng={'lat': 49.4137500, 'lng': 8.7173000},
            radius=2000,
            types=[types.TYPE_FOOD])

    places = []
    for place in query_result.places:
        place.get_details()
        dets = place.details
        new = _replace_umlauts(dets['adr_address'])
        places.append(new)
        break

    return {'places': places}
