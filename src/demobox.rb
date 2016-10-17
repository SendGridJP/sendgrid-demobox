require 'sinatra'
require 'sinatra/base'
require 'sinatra/rocketio'
require 'dotenv'
require 'logger'
require 'sendgrid-ruby'

require File.join(File.dirname(__FILE__), '.', 'setting.rb')
require File.join(File.dirname(__FILE__), '.', 'configure.rb')
