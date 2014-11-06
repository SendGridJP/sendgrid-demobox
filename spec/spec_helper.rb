require 'sinatra'
require 'sinatra/base'
require 'sinatra/rocketio'
require 'json'
require 'dotenv'
require 'logger'
require 'mongo'

require File.join(File.dirname(__FILE__), '../src', 'sendgrid.rb')
require File.join(File.dirname(__FILE__), '../src', 'setting.rb')
require File.join(File.dirname(__FILE__), '../src', 'configure.rb')
require File.join(File.dirname(__FILE__), '../src', 'main.rb')
require File.join(File.dirname(__FILE__), '../src', 'mailer.rb')
require File.join(File.dirname(__FILE__), '../src/controls', 'db_access.rb')
require File.join(File.dirname(__FILE__), '../src/controls', 'mail_collection.rb')
require File.join(File.dirname(__FILE__), '../src/models', 'mail.rb')


set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false
