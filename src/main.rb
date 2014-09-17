# -*- encoding: utf-8 -*-

module SendGridDemo
  class Main < Sinatra::Base

    register Sinatra::RocketIO
    io = Sinatra::RocketIO

    configure :production, :development do
      begin
        enable :logging
        use Rack::Auth::Basic do |username, password|
          username == ENV['BASIC_AUTH_USERNAME'] && password == ENV['BASIC_AUTH_PASSWORD']
        end
        # init sendgrid
        setting = Setting.new
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
      redirect to('/send')
    end

    get '/send' do
      @now_time = Time.now.strftime("%H:%M")
      setting = Setting.new
      @tos = setting.tos
      @from = setting.from
      @bcc = setting.bcc
      erb :send
    end

    get '/receive' do
      setting = Setting.new
      @receive_address = "demo@#{setting.parse_host}"
      erb :receive
    end

    post '/send' do
      res = ""
      begin
        request.body.rewind
        body = request.body.read
        if body.length > 0 then
          data = JSON.parse(body)
          logger.info "data: #{data.inspect}"
          mailer = Mailer.new
          res = JSON.pretty_generate(mailer.send(to_kv(data)))
        end
      rescue => e
        logger.error e.backtrace
        logger.error e.inspect
        res = e.inspect
      end
      res
    end

    post '/event' do
      begin
        request.body.rewind
        data = JSON.parse(request.body.read)
        data.each{|event|
          logger.info JSON.generate(event)
          io.push :event, JSON.generate(event)
        }
      rescue => e
        logger.error e.backtrace
        logger.error e.inspect
      end
      'Success'
    end

    post '/receive' do
      begin
        # push the received email to the clients
        logger.info JSON.generate(params)
        io.push :receive, JSON.generate(params)
      rescue => e
        logger.error e.backtrace
        logger.error e.inspect
      end
      'Success'
    end
  end

end