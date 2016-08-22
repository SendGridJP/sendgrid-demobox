include SendGrid

module MailFormParser
  def self.get_mail(data)
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
    puts mail.to_json
    mail
  end

  def self.get_personalizations(data)
    personalizations = []
    for num in 0..max_index(data, 'personalizations')
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

  def self.get_mail_settings(data)
    mail_settings = MailSettings.new
    mail_settings.sandbox_mode = SandBoxMode.new(enable: true)
    mail_settings
  end

  def self.gen_classes(data, target, klass, params)
    (0..max_index(data, target)).map do |num|
      gen_class(data, "#{target}[#{num}]", klass, params)
    end
  end

  def self.gen_class(data, target, klass, params)
    pp = {}
    params.each do |param|
      pp.store(param, data["#{target}.#{param}"])
    end
    klass.new(pp) unless pp.values.delete_if { |value| value.nil? }.empty?
  end

  def self.max_index(data, target)
    max_index = -1
    sorteddata = data.sort
    sorteddata.each do |pair|
      t = Regexp.escape(target)
      pair[0] =~ /(#{t})(\[(\d+)\])*/
      if $3 != nil && max_index < $3.to_i
        max_index = $3.to_i
      end
    end
    max_index
  end
end
