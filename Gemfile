source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'rails', '~> 5.2.2'
gem 'sqlite3'
gem 'puma'
gem 'bootsnap', require: false
gem 'slim'
gem 'webpacker'
gem 'react-rails'
gem 'devise'

group :development, :test do
  gem 'rspec-rails'
end

group :development do
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'pry-rails'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
