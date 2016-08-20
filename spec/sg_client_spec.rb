# encoding: utf-8
require File.dirname(__FILE__) + '/spec_helper'

describe "SgClient" do
  let(:data) do
    {
      "personalizations[0].to[0].email"=>"recipient@example.com",
      "personalizations[0].to[0].name"=>"To Name",
      "personalizations[0].cc[0].email"=>"cc@example.com",
      "personalizations[0].cc[0].name"=>"Cc Name",
      "personalizations[0].bcc[0].email"=>"bcc@example.com",
      "personalizations[0].bcc[0].name"=>"Bcc Name",
      "personalizations[0].subject"=>"これは件名です",
      "personalizations[0].headers[0].key"=>"header_key",
      "personalizations[0].headers[0].value"=>"header_value",
      "personalizations[0].substitutions[0].key"=>"sub_key",
      "personalizations[0].substitutions[0].value"=>"sub_value",
      "personalizations[0].custom_args[0].key"=>"custom_args_key",
      "personalizations[0].custom_args[0].value"=>"custom_args_value",
      "personalizations[0].send_at"=>"123456789",
      "from.email"=>"from@example.com",
      "from.name"=>"From Name",
      "reply-to.email"=>"reply-to@example.com",
      "subject"=>"-name-さんへ　テストメール",
      "content[0].type"=>"text/plain",
      "content[0].value"=>"-name-さんへ　TEXT本文 SendGrid https://sendgrid.com",
      "content[1].type"=>"text/html",
      "content[1].value"=>"<p>-name-さんへ　HTML本文</p> <a href='https://sendgrid.com'>センドグリッド</a>",
      "mail_settings.sandbox_mode.enable"=>"true"
    }
  end

  let(:sgc) do
    SgClient.new
  end

  it 'send' do
    mail = sgc.get_mail(data)
    mail.mail_settings = sgc.get_mail_settings(data)

    sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    response = sg.client.mail._('send').post(request_body: mail.to_json)
    puts response.status_code
    puts response.body
    puts response.headers
  end

  it 'get_mail' do
    mail = sgc.get_mail(data)
    expect(mail.personalizations.length).to eq(1)
  end

  it 'get_personalizations' do
    personalizations = sgc.get_personalizations(data)
    expect(personalizations.length).to eq(1)
  end

  it 'gen_classes Substitution' do
    substitutions = sgc.gen_classes(
      data, 'personalizations[0].substitutions', Substitution, [:key, :value]
    )
    expect(substitutions.length).to eq(1)
    expect(substitutions[0].substitution.has_key?("sub_key")).to eq(true)
    expect(substitutions[0].substitution["sub_key"]).to eq("sub_value")
  end

  it 'gen_classes Header' do
    headers = sgc.gen_classes(
      data, 'personalizations[0].headers', Header, [:key, :value]
    )
    expect(headers.length).to eq(1)
    expect(headers[0].header.has_key?("header_key")).to eq(true)
    expect(headers[0].header["header_key"]).to eq("header_value")
  end

  it 'gen_classes CustomArg' do
    custom_args = sgc.gen_classes(
      data, 'personalizations[0].custom_args', CustomArg, [:key, :value]
    )
    expect(custom_args.length).to eq(1)
    expect(custom_args[0].custom_arg.has_key?("custom_args_key")).to eq(true)
    expect(
      custom_args[0].custom_arg["custom_args_key"]
    ).to eq("custom_args_value")
  end

  it 'gen_classes Email' do
    emails = sgc.gen_classes(
      data, 'personalizations[0].to', Email, [:email, :name]
    )
    expect(emails.length).to eq(1)
    expect(emails[0].email).to eq("recipient@example.com")
    expect(emails[0].name).to eq("To Name")
  end

  it 'gen_classes Content' do
    contents = sgc.gen_classes(data, 'content', Content, [:type, :value])
    expect(contents.length).to eq(2)
    expect(contents[0].type).to eq('text/plain')
    expect(contents[0].value).to eq('-name-さんへ　TEXT本文 SendGrid https://sendgrid.com')
    expect(contents[1].type).to eq('text/html')
    expect(contents[1].value).to eq("<p>-name-さんへ　HTML本文</p> <a href='https://sendgrid.com'>センドグリッド</a>")
  end

  it 'gen_class from' do
    klass = sgc.gen_class(
      data, 'from', Email, [:email, :name]
    )
    expect(klass).to be_a(Email)
    expect(klass.email).to eq('from@example.com')
    expect(klass.name).to eq('From Name')
  end


  it 'gen_class' do
    klass = sgc.gen_class(
      data, 'personalizations[0].to[0]', Email, [:email, :name]
    )
    expect(klass).to be_a(Email)
  end

  it 'max_index' do
    max_index = sgc.max_index(data, 'content')
    expect(max_index).to eq(1)
  end

  # it "get /" do
  #   get "/"
  #   expect(last_response).to be_ok
  # end


  # describe "get /" do
  #   before { get "/" }
  #   subject { last_response }
  #   it "Validate normal response" do
  #     should be_ok
  #   end
  #   # it "Validate the response message is 'Fail to parse to and from address'" do
  #   #   expect(subject.body).to eq('Fail to parse to and from address')
  #   # end
  # end

  # describe "post /event" do
  #   before { post '/event'}
  #   subject { last_response }
  #   it "Validate normal response" do
  #     should be_ok
  #   end
  #   it "Validate the response message is 'Success'" do
  #     expect(subject.body).to eq('Success')
  #   end
  # end
end
