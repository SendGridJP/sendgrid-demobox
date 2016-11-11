class Setting
  attr_accessor :apikey, :app_url, :parse_host
  attr_accessor :basic_auth_username, :basic_auth_password
  attr_accessor :to, :from
  attr_accessor :mongo_url

  def initialize(file=nil)
    if file == nil
      config = Dotenv.load
    else
      config = Dotenv.overload(file)
    end
    @sendgrid_username = ENV["APIKEY"]
    @app_url = ENV["APP_URL"]
    @parse_host = ENV["PARSE_HOST"]
    @basic_auth_username = ENV["BASIC_AUTH_USERNAME"]
    @basic_auth_password = ENV["BASIC_AUTH_PASSWORD"]
    @to = ENV["TO"]
    @from = ENV["FROM"]
    @mongo_url = ENV["MONGO_URL"] || ENV["MONGOHQ_URL"]
  end
end
