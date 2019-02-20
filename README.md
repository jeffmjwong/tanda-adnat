# ADNAT

## Introduction

This is a Ruby on Rails based application for Tanda's Challenge - Adnat.
* Ruby 2.5.1
* Rails 5.2.2
* SQLite3 1.3.13

## Getting Started

1. Clone the project.
```
$ git clone https://github.com/jeffmjwong/tanda-adnat.git
$ cd tanda-adnat
```

2. Install application dependencies.
```
bundle install
yarn install
```

3. Run migration to set up the database.
```
bin/rake db:migrate
```

4. Start the server.
```
bin/rails s
```

5. Additionally, open a new tab and start webpack development mode to compile front-end more quickly.
```
bin/webpack-dev-server
```

6. To run the tests, type the following command.
```
bundle exec rspec
```

And that's it! The application should now be accessible on localhost:3000. Feel free to play around the application and browse the source code.
