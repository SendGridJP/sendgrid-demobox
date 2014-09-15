# -*- encoding: utf-8 -*-

require 'sinatra/base'
#require 'sinatra/rocketio'
#require 'sinatra/reloader'
#Sinatra.register Sinatra::Reloader
require 'json'
require "./src/mailer"
require "./src/setting"
#require './lib/game_collection'
#require './lib/addresses'
#require './lib/mailer'
#require './lib/game'
require './src/configure'

module SendGridDemo
  class Main < Sinatra::Base

    register Sinatra::RocketIO
    io = Sinatra::RocketIO

    attr_accessor :tmps

    configure :production, :development do
      begin
        enable :logging
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
      erb :send
    end

    get '/send' do
      erb :send
    end

    get '/receive' do
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

    get '/boot' do
      erb :boot
    end

    get '/form' do
      erb :form
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
