require 'sinatra'
require 'sinatra/base'
require 'sinatra/rocketio'
require 'json'
require 'dotenv'
require 'logger'
require 'mongo'
require 'sendgrid-ruby'

require File.join(File.dirname(__FILE__), '.', 'mailer.rb')
require File.join(File.dirname(__FILE__), '.', 'setting.rb')
require File.join(File.dirname(__FILE__), '.', 'configure.rb')
require File.join(File.dirname(__FILE__), '.', 'mail_form_parser.rb')
require File.join(File.dirname(__FILE__), '.', 'models/mail.rb')
require File.join(File.dirname(__FILE__), '.', 'controls/db_access.rb')
require File.join(File.dirname(__FILE__), '.', 'controls/mail_collection.rb')
