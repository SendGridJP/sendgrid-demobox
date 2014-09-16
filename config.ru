require 'sinatra'
require 'sinatra/base'
require 'sinatra/rocketio'
require 'json'
require 'dotenv'
require 'logger'

require File.join(File.dirname(__FILE__), 'src', 'main')
require "./src/mailer"
require "./src/setting"
require './src/configure'
require './src/sendgrid'

use Rack::Reloader, 0
run SendGridDemo::Main
