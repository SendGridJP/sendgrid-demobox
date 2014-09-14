require 'sinatra'
require 'sinatra/rocketio'
require File.join(File.dirname(__FILE__), 'src', 'main')
#require File.join(File.dirname(__FILE__), 'src', 'socket')
use Rack::Reloader, 0
run SendGridDemo::Main
