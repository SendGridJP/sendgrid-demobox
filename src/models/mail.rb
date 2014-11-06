# -*- encoding: utf-8 -*-
require 'nkf'

class Mail

  def initialize
    @_id = BSON::ObjectId.new
  end

  def to_array
    data = {}
    self.instance_variables.each{|variable_name|
      data[variable_name.to_s.gsub(/@/, '')] = self.instance_variable_get(variable_name)
    }
    data
  end

  def self.create_new(data)
    obj = Mail.new
    data.each{|key, value|
      prop_name = key
      case key
      when "headers"
        obj.instance_variable_set("@#{prop_name}", value.split("\n"))
      when "attachment-info"
        prop_name = "attachment_info"
        obj.instance_variable_set("@#{prop_name}", JSON.parse(value))
      when "text"
        obj.instance_variable_set("@#{prop_name}", NKF.nkf('-w', value))
      when "html"
        obj.instance_variable_set("@#{prop_name}", NKF.nkf('-w', value))
      when "envelope"
        obj.instance_variable_set("@#{prop_name}", JSON.parse(value))
      when "charsets"
        obj.instance_variable_set("@#{prop_name}", JSON.parse(value))
      when "SPF"
        prop_name = "spf"
        obj.instance_variable_set("@#{prop_name}", value)
      when /attachment\d/
        # ignore temp file
        next
      else
        obj.instance_variable_set("@#{prop_name}", value)
      end
      obj.class.send(:attr_accessor, prop_name)
    }
    obj
  end
end
