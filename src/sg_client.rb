include SendGrid

#$:.unshift File.dirname(__FILE__)
# require "net/https"
# require "rest-client"

class SgClient

  # attr_accessor :debug_output

  # def initialize(apikey)
  #   @apikey = apikey
  # end

  def send(data)
    # mail = get_mail(data)
    # mail.mail_settings = get_mail_settings(data)

  end

  def get_mail(data)
    mail = Mail.new
    mail.from = gen_class(data, 'from', Email, [:email, :name])
    mail.reply_to = gen_class(data, 'reply-to', Email, [:email, :name])
    mail.subject = data['subject']
    gen_classes(data, 'content', Content, [:type, :value]).each do |content|
      mail.contents = content
    end
    get_personalizations(data).each do |personalization|
      mail.personalizations = personalization
    end
    puts mail.inspect
    mail
  end

  def get_personalizations(data)
    personalizations = []
    max_index = max_index(data, 'personalization')
    for num in 0..max_index
      personalization = Personalization.new
      # to
      gen_classes(
        data, "personalizations[#{num}].to", Email, [:email, :name]
      ).each do |to|
        personalization.to = to
      end
      # cc
      gen_classes(
        data, "personalizations[#{num}].cc", Email, [:email, :name]
      ).each do |cc|
        personalization.cc = cc
      end
      # bcc
      gen_classes(
        data, "personalizations[#{num}].bcc", Email, [:email, :name]
      ).each do |bcc|
        personalization.bcc = bcc
      end
      # subject
      personalization.subject = data["personalizations[#{num}].subject"]
      # headers
      gen_classes(
        data, "personalizations[#{num}].headers", Header, [:key, :value]
      ).each do |header|
        personalization.headers = header
      end
      # substitutions
      gen_classes(
        data,
        "personalizations[#{num}].substitutions",
        Substitution,
        [:key, :value]
      ).each do |substitution|
        personalization.substitutions = substitution
      end
      # custom_args
      gen_classes(
        data,
        "personalizations[#{num}].custom_args",
        CustomArg,
        [:key, :value]
      ).each do |custom_arg|
        personalization.custom_args = custom_arg
      end
      # send_at
      personalization.send_at = data["personalizations[#{num}].send_at"].to_i

      personalizations.push(personalization)
    end
    personalizations
  end

  def get_mail_settings(data)
    mail_settings = MailSettings.new
    mail_settings.sandbox_mode = SandBoxMode.new(enable: true)
    mail_settings
  end

  def gen_classes(data, target, klass, params)
    (0..max_index(data, target)).map do |num|
      gen_class(data, "#{target}[#{num}]", klass, params)
    end
  end

  def gen_class(data, target, klass, params)
    pp = {}
    params.each do |param|
      pp.store(param, data["#{target}.#{param}"])
    end
    klass.new(pp)
  end

  def max_index(data, name)
    max_index = 0
    sorteddata = data.sort
    sorteddata.each do |pair|
      keys = pair[0].split('.')
      keys.each do |key|
        key =~ /(#{name})(\[(\d+)\])*/
        if $3 != nil && max_index < $3.to_i
          max_index = $3.to_i
        end
      end
    end
    max_index
  end

  # def parse_data(data, key)
  #   sorteddata = data.sort
  #   sorteddata.each do |pair|
  #     if pair[0].start_with?(key)
  #
  #     end
  #
  #   end
  # end

  # def parse_delete(hostname)
  #   form              = Hash.new
  #   form['hostname']  = hostname
  #   form['api_user']  = @username
  #   form['api_key']   = @password
  #
  #   RestClient.log = $stderr if @debug_output
  #
  #   headers        = Hash.new
  #   headers[:content_type] = :json
  #   response = RestClient.post 'https://api.sendgrid.com/api/parse.delete.json', form, :content_type => :json, "User-Agent" => "sendgrid/#{SendgridRuby::VERSION};ruby"
  #
  #   JSON.parse(response.body)
  # end
  #
  # def parse_set(hostname, url, spam_check)
  #   form              = Hash.new
  #   form['hostname']  = hostname
  #   form['url']       = url
  #   form['spam_check'] = spam_check
  #   form['api_user']  = @username
  #   form['api_key']   = @password
  #
  #   RestClient.log = $stderr if @debug_output
  #
  #   headers          = Hash.new
  #   headers[:content_type] = :json
  #   response = RestClient.post 'https://api.sendgrid.com/api/parse.set.json', form, :content_type => :json, "User-Agent" => "sendgrid/#{SendgridRuby::VERSION};ruby"
  #
  #   JSON.parse(response.body)
  # end
  #
  # def activate_app(name)
  #   form              = Hash.new
  #   form['name']      = name
  #   form['api_user']  = @username
  #   form['api_key']   = @password
  #
  #   RestClient.log = $stderr if @debug_output
  #
  #   headers          = Hash.new
  #   headers[:content_type] = :json
  #   response = RestClient.post 'https://api.sendgrid.com/api/filter.activate.json', form, :content_type => :json, "User-Agent" => "sendgrid/#{SendgridRuby::VERSION};ruby"
  #
  #   JSON.parse(response.body)
  # end
  #
  # def filter_setup(filter)
  #   form              = filter.to_web_format
  #   form['api_user']  = @username
  #   form['api_key']   = @password
  #
  #   RestClient.log = $stderr if @debug_output
  #
  #   headers          = Hash.new
  #   headers[:content_type] = :json
  #   response = RestClient.post 'https://api.sendgrid.com/api/filter.setup.json', form, :content_type => :json, "User-Agent" => "sendgrid/#{SendgridRuby::VERSION};ruby"
  #
  #   JSON.parse(response.body)
  # end

end

class FilterSettings

  # attr_accessor :params
  #
  # def initialize
  #   @params = {}
  # end
  #
  # def to_web_format
  #   return params
  # end
end
