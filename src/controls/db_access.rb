# -*- encoding: utf-8 -*-
class DbAccess

  attr_accessor :db, :coll

  def initialize(coll_name)
    setting = Setting.new

    db = URI.parse(setting.mongo_url)
    db_name = db.path.gsub(/^\//, '')

    @connection = Mongo::Connection.new(db.host, db.port)
    @db = @connection.db(db_name)
    if db.user != nil then
      @db.authenticate(db.user, db.password)
    end
    @coll = @db.collection(coll_name)
  end

  def insert(doc)
    @coll.insert(doc)
  end

  def update(doc)
    @coll.update({:_id => doc._id}, doc)
  end

  def remove(id)
    @coll.remove({:_id => id})
  end

  def drop_all
    @coll.drop
  end


end
