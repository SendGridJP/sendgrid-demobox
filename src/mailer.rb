# -*- encoding: utf-8 -*-

require 'sendgrid_ruby'
require 'sendgrid_ruby/version'
require 'sendgrid_ruby/email'

class Mailer

  def initialize
    @logger = Logger.new(STDOUT)
    @setting = Setting.new
  end

  def send(data)
    sendgrid = SendgridRuby::Sendgrid.new(
      @setting.sendgrid_username, @setting.sendgrid_password)
    sendgrid.send(get_email(data))
  end

  def get_email(data)
    email = SendgridRuby::Email.new
    email.set_tos(data["tos"].split(","))
    email.set_from(data["from"])
    email.set_subject(data["subject"])
    email.set_text(data["body"])
    email.set_html(data["body"].gsub(/(\r\n|\r|\n)/, "<br>"))
    if data["usesub"] == "true" then
      email.add_substitution(data["subkey"], data["subval"].split(","))
    end
    if data["usebcc"] == "true" then
      email.add_filter("bcc", "enable", 1)
      email.add_filter("bcc", "email", data["bcc"])
    end
    if data["usecategory"] == "true" then
      email.add_category(data["category"])
    end
    if data["useuniqueargs"] == "true" then
      email.add_unique_arg(data["uniquekey"], data["uniqueval"])
    end
    if data["useclick"] == "true" then
      email.add_filter("clicktrack", "enable", 1)
    end
    if data["useopen"] == "true" then
      email.add_filter("opentrack", "enable", 1)
    end
    if data["usesubscription"] == "true" then
      email.add_filter("subscriptiontrack", "enable", 1)
      email.add_filter("subscriptiontrack", "text/html", "<br>配信停止の方は<% こちら %>。")
      email.add_filter("subscriptiontrack", "text/plain", "\r\n配信停止希望のかたはこちら。<% %>")
    end
    if data["usetemplate"] == "true" then
      tmp = Configure.get_template(@setting, data["template"])
      email.add_filter("templates", "enable", 1)
      email.add_filter("templates", "template_id", tmp.id)
    end
    if data["usefooter"] == "true" then
      email.add_filter("footer", "enable", 1)
      email.add_filter("footer", "text/html", "<br><br><HR color='lightgray'><div style='background-color: lightgray;'>本メールの送信元はSendGrid DemoBoxです。</div>")
      email.add_filter("footer", "text/plain", "\r\n\r\n------------------------------------\r\n本メールの送信元はSendGrid DemoBoxです。")
    end
    if data["usesendat"] == "true" then
      sendat = data["sendat"].split(":")
      now_time = Time.now
      sendat_time = Time.local(now_time.year, now_time.month, now_time.day, sendat[0].to_i, sendat[1].to_i, 0)
      email.set_send_at(get_send_at(sendat_time, now_time))
    end
    @logger.info JSON.pretty_generate(email.to_web_format)
    email

  end

  def get_send_at(sendat_time, now_time)
    if sendat_time < now_time then
      sendat_time = sendat_time + 24 * 60 * 60
    end
    sendat_time.to_i
  end

end
