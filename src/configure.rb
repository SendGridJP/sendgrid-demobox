module Configure

  TEMP_NAME = [
    "sendgrid_demo_template_1", "sendgrid_demo_template_2", "sendgrid_demo_template_3"
  ]

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
    puts "---- init apps"
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    url = get_url(
      setting.app_url, setting.basic_auth_username, setting.basic_auth_password
    ) + "/event"
    data = {
      bounce: true,
      click: true,
      deferred: true,
      delivered: true,
      dropped: true,
      enabled: true,
      group_resubscribe: true,
      group_unsubscribe: true,
      open: true,
      processed: true,
      spam_report: true,
      unsubscribe: true,
      url: url
    }
    puts sg.client.user.webhooks.event.settings.patch(request_body: data).body
  end

  def init_parse_webhook(setting)
    puts "---- init parse webhook"
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    puts sg.client.user.webhooks.parse.settings._(setting.parse_host).delete.body
    url = get_url(
      setting.app_url, setting.basic_auth_username, setting.basic_auth_password
    ) + "/receive"
    data = {
      hostname: setting.parse_host,
      send_raw: false,
      spam_check: false,
      url: url
    }
    puts sg.client.user.webhooks.parse.settings.post(request_body: data).body
  end

  def init_template(setting)
    puts "---- init transactional template"
    # Retrieve template list
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    response = sg.client.templates.get
    templates = JSON.parse(response.body)
    # puts templates['templates']
    TEMP_NAME.each_with_index do |name, index|
      exist = templates['templates'].find do |template|
        template['name'] == name
      end
      Configure.create_template(setting, index) unless exist
    end
  end

  def create_template(setting, index)
    puts "---- create transactional template"
    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    # Create template
    response = sg.client.templates.post(request_body: {name: TEMP_NAME[index]})
    puts response.body
    # Create version
    plain_content = open("./template/#{TEMP_NAME[index]}.txt").read
    html_content = open("./template/#{TEMP_NAME[index]}.html").read
    template_id = JSON.parse(response.body)['id']
    data = {
      active: 1,
      html_content: html_content,
      name: TEMP_NAME[index],
      plain_content: plain_content,
      subject: "<%subject%>",
      template_id: template_id
    }
    sg.client.templates._(template_id).versions.post(request_body: data)
  end

  module_function :get_url
  module_function :init_sendgrid
  module_function :init_apps
  module_function :init_template
  module_function :get_template
  module_function :create_template
  module_function :init_parse_webhook

end
