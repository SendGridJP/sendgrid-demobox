require File.join(File.dirname(__FILE__), 'src', 'main')
use Rack::Reloader, 0
run SendGridDemo::Main
