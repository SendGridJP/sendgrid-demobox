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
      #Configure.init_sendgrid(setting)
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
    redirect to('/send')
  end

  get '/send' do
    @now_time = Time.now.strftime("%H:%M")
    setting = Setting.new
    @tos = setting.tos
    @from = setting.from
    @bcc = setting.bcc
    @timezone = Time.now.strftime("%Z")
    erb :send
  end

  get '/receive' do
    setting = Setting.new
    @receive_address = "demo@#{setting.parse_host}"
    erb :receive
  end

  post '/send' do
    res = {}
    begin
      request.body.rewind
      body = request.body.read
      if body.length > 0 then
        data = JSON.parse(body)
        #logger.info "data: #{data.inspect}"
        logger.info "body: #{body}"
        #mail = MailFormParser.get_mail(data)
        #mail.mail_settings = MailFormParser.get_mail_settings(data)
        sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
        response = sg.client.mail._('send').post(request_body: data)
        # res['request'] = mail.to_json.inspect
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
      io.push :event, request.body.read
    rescue => e
      logger.error e.backtrace
      logger.error e.inspect
    end
    'Success'
  end

  # TODO fix return 500 if received mail has attachment from Gmail
  post '/receive' do
    begin
      # push the received email to the clients
      logger.info JSON.generate(params)
      io.push :receive, JSON.generate(params)
      # insert to datastore
      dba = MailCollection.new
      mail = Mail.create_new(params)
      dba.insert(mail.to_array)
    rescue => e
      logger.error e.backtrace
      logger.error e.inspect
    end
    'Success'
  end

  get '/eventtest' do

    io.push :event, JSON.generate("{\"timestamp\": #{Time.now.to_i}}")
    'hello'
  end
end
