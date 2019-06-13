# gracessshopper

Snakes Selling Stuff for Senior Studies

# SPOILER ALERT

if you are part of the 1% of people that has not seen the following movies, "The Shining", "Fight Club", or "Sixth Sense" - we apologize in advance!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

* Update project name and description in `package.json` and `.travis.yml` files
* `npm install`, or `yarn install` - whatever you're into
* Create two postgres databases: `imagine-nation` and `imagine-nation-test` (you can substitute these with the name of your own application - just be sure to go through and change the `package.json` and `.travis.yml` to refer to the new name)

* Create a file called `secrets.js` in the project root

  * This file is `.gitignore`'d, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials
* Finally, complete the section below to set up your linter

## Linting

Linters are fundamental to any project - they ensure that your code has a consistent style, which is critical to writing readable code.

This project comes with a working linter (ESLint, with `eslint-config-fullstack`) "out of the box." However, everyone has their own style, so we recommend that you set your preference. Any linter rule that you object to can be "turned off" in `.eslintrc.json`. You may also choose an entirely different config if you don't like ours:

* [Standard style guide](https://standardjs.com/)
* [Airbnb style guide](https://github.com/airbnb/javascript)
* [Google style guide](https://google.github.io/styleguide/jsguide.html)

## Start

```
npm run start-dev
```

will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Running the tests

* By default, running `npm test` will use `imagine-nation-test`, while regular development uses `imagine-nation`

## Deployment

* [Live](https://silver-snakes-grace-ssshopper.herokuapp.com/) - To view deployed version

## Authors

* **FullstackAcademy** - _Initial template_ - [FullstackAcademy](https://github.com/FullstackAcademy/boilermaker)

See also the list of [contributors](https://github.com/the-silver-snakesss/gracessshopper/people) who participated in this project.

## Acknowledgments

* Thanks to all the instructors and fellows!
