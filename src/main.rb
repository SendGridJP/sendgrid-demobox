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

    # post '/game' do
    #   begin
    #     # parse email address from request
    #     from = Addresses.get_address(params[:from])
    #     to = Addresses.get_address(params[:subject])
    #
    #     # fail to parse address if it is nil
    #     mailer = Mailer.new
    #     if from != nil && to == nil then
    #       logger.info "Failed to parse opponent player email address. Subject must include email address."
    #       return 'Fail to parse to address'
    #     end
    #     logger.info "from: #{from} to: #{to}"
    #     if from == nil && to == nil then
    #       logger.info "Failed to parse email address. Please check the request."
    #       logger.info "from: #{params[:from]}"
    #       logger.info "subject: #{params[:subject]}"
    #       return 'Fail to parse to and from address'
    #     end
    #     # get game data from DB
    #     dba = GameCollection.new
    #     game = dba.find(from, to)
    #     # create game data if not exist
    #     if game == nil then
    #       game = Game.new
    #       # odd:first move:black
    #       game.player_odd = to
    #       # even:second move:white
    #       game.player_even = from
    #       id = dba.insert(game)
    #       game = dba.findById(id)
    #       #puts "create new game"
    #       logger.info "create new game"
    #     end
    #
    #     # send email for each player
    #     logger.info "game._id: #{game._id}"
    #     mailer.send(game)
    #   rescue => e
    #     logger.error e.backtrace
    #     logger.error e.inspect
    #   end
    #
    #   'Success'
    # end

  end

end
