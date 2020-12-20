require 'open-uri'
require 'net/http'

Error = Class.new(StandardError)

DOWNLOAD_ERRORS = [
  SocketError,          # domain not found
  OpenURI::HTTPError,   # response status 4xx or 5xx
  RuntimeError,         # redirection errors (e.g. redirection loop)
  URI::InvalidURIError, # invalid URL
  Error
].freeze

def download(url, max_size: nil)
  # url = URI.encode(URI.decode(url))

  url = URI(url)

  raise Error, 'url was invalid' unless url.respond_to?(:open)

  options = {}

  options['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5)'
  options['Accept-Encoding'] = 'br, gzip, deflate'
  options['Accept-Language'] = 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2'
  options['Referer'] = 'http://www.google.com/'

  options[:proxy] = URI.parse('http://129.204.116.98:9876/')

  options[:content_length_proc] = lambda { |size|
    if max_size && size && size > max_size # sometimes "Content-Length" can be empty
      raise Error, "file is too big (max is #{max_size})"
    end
  }

  url.open(options) do |torrent|
    File.open('./test.torrent', 'wb') do |file|
      file.write(torrent.read)
    end
  end

# Finally
rescue *DOWNLOAD_ERRORS => e
  raise if e.instance_of?(RuntimeError) && e.message !~ /redirection/

  raise Error, "download failed (#{url}): #{e.message}"
end

download('https://dl.dmhy.org/2013/05/23/d9094b13f8a589c95090c9bbfdf6d280db60d3cc.torrent')
