# -*- encoding: utf-8 -*-

class Setting

  attr_accessor :sendgrid_username, :sendgrid_password, :app_url, :parse_host, :basic_auth_username, :basic_auth_password

  def initialize(file=nil)
    if file == nil
      config = Dotenv.load
    else
      config = Dotenv.overload(file)
    end
    @sendgrid_username = ENV["SENDGRID_USERNAME"]
    @sendgrid_password = ENV["SENDGRID_PASSWORD"]
    @app_url = ENV["APP_URL"]
    @parse_host = ENV["PARSE_HOST"]
    @basic_auth_username = ENV["BASIC_AUTH_USERNAME"]
    @basic_auth_password = ENV["BASIC_AUTH_PASSWORD"]
  end

end
