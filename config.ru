require 'sinatra'
require 'sinatra/base'
require 'sinatra/rocketio'
require 'json'
require 'dotenv'
require 'logger'

require "./src/mailer"
require "./src/setting"
require './src/configure'
require './src/sendgrid'
require File.join(File.dirname(__FILE__), 'src', 'main')

use Rack::Reloader, 0
run Main
