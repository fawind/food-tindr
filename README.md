# food-tindr
Find restaurants and bars in your area.

#### Installation
Requires the [Google App Engine](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python) and [bower](http://bower.io/#install-bower).

1. Modify the `app/api_key.py.template` file and fill in your API-key.

2. Install the dependencies:
  ```bash
  pip install -r requirements.txt -t lib
  bower install
  ```

3. Run the server:
  ```bash
  dev_appserver.py .
  ```

#### Build
To build a non dev version install the dev dependencies and run the build chain.

```bash
# Install dev dependencies
npm install
# Rund the build chain
gulp build
```
