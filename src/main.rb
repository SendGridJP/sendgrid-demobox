require File.join(File.dirname(__FILE__), '.', 'demobox.rb')
include SendGrid

class Main < Sinatra::Base

  register Sinatra::RocketIO
  io = Sinatra::RocketIO

  configure :production, :development do
    begin
      enable :logging
      setting = Setting.new

      if setting.basic_auth_username.length > 0 then
        use Rack::Auth::Basic do |username, password|
          username == setting.basic_auth_username && password == setting.basic_auth_password
        end
      end

      # init sendgrid
      Configure.init_sendgrid(setting)
    rescue => e
      puts e.backtrace
      puts e.inspect
    end
  end

  helpers do
    # name=>valueの配列を連想配列に変換
    def to_kv(data)
      ret = {}
      data.each do |kv|
        ret[kv["name"]] = kv["value"]
      end
      ret
    end
  end

  get '/' do
    redirect to('/index.html')
  end

  get '/send_init' do
    puts 'get send_init'
    setting = Setting.new
    res = {}
    res['to'] = setting.to
    res['from'] = setting.from
    res.to_json
  end

  get '/receive_init' do
    puts 'get receive_init'
    setting = Setting.new
    res = {}
    res['receive_address'] = "test@#{setting.parse_host}"
    res.to_json
  end

  post '/send' do
    res = {}
    begin
      request.body.rewind
      body = request.body.read
      if body.length > 0 then
        data = JSON.parse(body)
        logger.info "body: #{body}"
        sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
        response = sg.client.mail._('send').post(request_body: data)
        res['responseCode'] = response.status_code
        res['responseBody'] = response.body
        puts "MAIN/send #{res.inspect}"
      end
    rescue => e
      logger.error e.backtrace
      logger.error e.inspect
      res = e.inspect
    end
    res.to_json
  end

  post '/event' do
    begin
      request.body.rewind
      events = request.body.read
      logger.info events
      io.push :event, events
    rescue => e
      logger.error e.backtrace
      logger.error e.inspect
    end
    'Success'
  end

  post '/receive' do
    begin
      logger.info JSON.generate(params)
      io.push :receive, JSON.generate(params)
    rescue => e
      logger.error e.backtrace
      logger.error e.inspect
    end
    'Success'
  end
end
