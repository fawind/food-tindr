# food-tindr
Find restaurants and bars in your area.

<p align="center">
  <img height="400" src="https://cloud.githubusercontent.com/assets/7422050/19022041/21c55b28-88cf-11e6-9b43-b1d23d504b8c.gif" alt="Food-Tindr"/>
</p>

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
