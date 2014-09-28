# -*- encoding: utf-8 -*-

require 'sendgrid4r'

module Configure

  TEMP_NAME = ["sendgrid_demo_template_1", "sendgrid_demo_template_2", "sendgrid_demo_template_3"]

  def get_url(app_url, basic_auth_username, basic_auth_password)
    if basic_auth_username.length > 0 then
      return app_url.sub("://", "://#{basic_auth_username}:#{basic_auth_password}@")
    end
    app_url
  end

  def init_sendgrid(setting)
    Configure.init_apps(setting)
    Configure.init_parse_webhook(setting)
    Configure.init_template(setting)
  end

  def init_apps(setting)
    sendgrid = Sendgrid.new(setting.sendgrid_username, setting.sendgrid_password)
    filter_eventnotify = FilterSettings.new
    filter_eventnotify.params["name"] = "eventnotify"
    filter_eventnotify.params["processed"] = 1
    filter_eventnotify.params["dropped"] = 1
    filter_eventnotify.params["deferred"] = 1
    filter_eventnotify.params["delivered"] = 1
    filter_eventnotify.params["bounce"] = 1
    filter_eventnotify.params["click"] = 1
    filter_eventnotify.params["open"] = 1
    filter_eventnotify.params["unsubscribe"] = 1
    filter_eventnotify.params["spamreport"] = 1
    filter_eventnotify.params["url"] = get_url(setting.app_url, setting.basic_auth_username, setting.basic_auth_password) + "/event"
    sendgrid.filter_setup(filter_eventnotify)
    sendgrid.activate_app("eventnotify")
  end

  def init_parse_webhook(setting)
    url = get_url(setting.app_url, setting.basic_auth_username, setting.basic_auth_password) + "/receive"
    puts "init parse webhook"
    sendgrid = Sendgrid.new(setting.sendgrid_username, setting.sendgrid_password)
    sendgrid.parse_delete(setting.parse_host)
    puts sendgrid.parse_set(setting.parse_host, url, 0)
  end

  def init_template(setting)
    # Retrieve template list
    client = SendGrid4r::Client.new(setting.sendgrid_username, setting.sendgrid_password)
    all_tmps = client.get_templates
    # Find templates by name
    exist = [false, false, false]
    tmps = [nil, nil, nil]
    all_tmps.each {|tmp|
      for i in 0..2 do
        if tmp.name == TEMP_NAME[i] then
          exist[i] = true
          tmps[i] = tmp
        end
      end
    }
    # Create templates
    for i in 0..2 do
      if exist[i] == false then
        tmps[i] = Configure.create_template(setting, i)
      else
        puts "use exist template for #{i}: #{tmps[i].id}"
      end
    end
    # Return template instance array
    tmps
  end

  def get_template(setting, name)
    ret = nil
    client = SendGrid4r::Client.new(setting.sendgrid_username, setting.sendgrid_password)
    all_tmps = client.get_templates
    all_tmps.each {|tmp|
      if tmp.name == name then
        ret = tmp
      end
    }
    ret
  end

  def create_template(setting, index)
    # Create template
    client = SendGrid4r::Client.new(setting.sendgrid_username, setting.sendgrid_password)
    new_tmp = client.post_template(TEMP_NAME[index])
    # Create version
    factory = SendGrid4r::VersionFactory.new
    plain_content = open("./template/#{TEMP_NAME[index]}.txt").read
    html_content = open("./template/#{TEMP_NAME[index]}.html").read
    new_ver = factory.create(TEMP_NAME[index], "<%subject%>", html_content, plain_content, 1)
    client.post_version(new_tmp.id, new_ver)
    puts "create new template for #{index}: #{TEMP_NAME[index]}"
    new_tmp
  end

  #
  # def delete_template(settings, name)
  #   templates = SendgridTemplateEngine::Templates.new(settings.sendgrid_username, settings.sendgrid_password)
  #   tmps = templates.get_all()
  #   tmps.each {|tmp|
  #     if tmp.name == name then
  #       tmp.versions.each {|ver|
  #         versions = SendgridTemplateEngine::Versions.new(settings.sendgrid_username, settings.sendgrid_password)
  #         versions.delete(tmp.id, ver.id)
  #         ver.id
  #       }
  #       templates.delete(tmp.id)
  #     end
  #   }
  # end

  module_function :get_url
  module_function :init_sendgrid
  module_function :init_apps
  module_function :init_template
  module_function :get_template
  module_function :create_template
  module_function :init_parse_webhook
#  module_function :delete_template

end
