
# Epic Mail
A  web app that helps people exchange messages/information over the internet

[![Build Status](https://travis-ci.org/victorex27/epic-mail.svg?branch=develop)](https://travis-ci.org/victorex27/epic-mail) [![Coverage Status](https://coveralls.io/repos/github/victorex27/epic-mail/badge.svg?branch=develop)](https://coveralls.io/github/victorex27/epic-mail?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/94739518ff42de6d2d80/maintainability)](https://codeclimate.com/github/victorex27/epic-mail/maintainability)


## Getting Started

```
git clone https://github.com/victorex27/epic-mail.git

cd epic-mail

npm install
```

### Prerequisites

- A browser
- A text editor
- Good internet connection
- Install Node js and npm

### Installing

After you must have cloned the repo, use the following command to test the app

```
git clone https://github.com/victorex27/epic-mail.git

cd epic-mail

npm install
```

- To build
```
    npm run build
```
- To serve
```
    npm run serve
```
- To start
```
    npm run start
```


End with an example of getting some data out of the system or using it for a little demo

## Running the tests

- To run test
```
    npm run test
```

- To run coveralls
```
    npm run coveralls
```
- For linting run
```
    npm run lint
```
- Travis was used to monitor the build 
- Coverall was used to monitor code coverage
- Code Climate was used to monitor the maintainability of the code.

To run sample test on deployed app click [Epic-Mail](https://glacial-beach-95391.herokuapp.com/api/v1/messages/2)

- Result 
```
{ 
    "status":200,
    "data":{
        "id":2,
        "createdOn":1552581702168,
        "subject":"you there",
        "message":"all",
        "parentMessageId":0,"status":"sent","senderId":1,
        "receiverId":2
    }
}
```


## Deployment

- Create an acoount on heroku
- Install heroku on your system
- Run to access heroku from your cli
```
    heroku --version
    heroku login
    heroku create
```
- use this to push from your develop branch to your account on heroku
```
    git push heroku develop:master
```

A url will be displayed to you were you can use the app
## Documentation
View Documentation [Epic-Mail](https://glacial-beach-95391.herokuapp.com/api-docs)
Vist home page on [Epic-Mail ](https://glacial-beach-95391.herokuapp.com/)
## Built With

* [Nodejs](https://nodejs.org/en/) -  JavaScript runtime built on Chrome's V8 JavaScript engine
* [Expressjs](https://expressjs.com/) -  Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* [Es6](https://es6.io/) - ECMA Script programming language
* [Nodemon](https://nodemon.io/) - Used  for restarting the node application when file changes in the directory
* [Code Climate](https://codeclimate.com/) - Used to test code maintainability
* [Coverall](https://coveralls.io/) - Used to coverage history and statistics
* [Travis](https://travis-ci.org/) - Used to test code
* [Mocha](https://mochajs.org/) 
* [Chai](https://www.chaijs.com/) - Used to generate RSS Feeds
* [Istanbul](https://istanbul.js.org/) - Javascript test coverage tool
* [Heroku](https://www.heroku.com/) - Cloud application platform used for app deployment
## Contributing

Please raise a pull request.

## Versioning

Version 1.0.0 

## Authors

* **Obikobe Amaobi** - *Initial work* - [Epic-mail](https://github.com/victorex27)



## Acknowledgments
* [Andela](https://andela.com/)
* Babatunde Yakubu
* Celestine Ekoh-ordan
* [unsplash](https://unsplash.com)
* Hat tip to anyone whose code was used
* Inspiration

