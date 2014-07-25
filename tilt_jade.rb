# encoding: utf-8

require 'tilt'
require 'open3'
if defined? Serve
  if !Serve::DynamicHandler.extensions.include?('jade')
    App.alert('Jade Template engine is not loaded, restart Fire.app and watch this project first')
  end
end

module Tilt
  class JadeTemplate < Template
    self.default_mime_type = "text/html"

    def prepare
    end

    def evaluate(scope, locals, &block)

      if File.exists?('c:/users/etblue/appdata/roaming/npm/node_modules/jade/bin/jade.js')
        jade_cmd = 'node c:/users/etblue/appdata/roaming/npm/node_modules/jade/bin/jade.js --path . -O "{require: require}" -P '
      else
        jade_cmd = 'jade --path . -O "{require: require}" -P'
      end

      pwd = Dir.pwd
      Dir.chdir('views')
      body = Open3.popen3(jade_cmd) do |stdin, stdout, stderr|
        stdin.write data
        stdin.close

        stdout.read + stderr.read.gsub(/\n/, '<br>')
      end
      Dir.chdir(pwd)
      body
    end
  end

  register JadeTemplate, 'jade'
end
