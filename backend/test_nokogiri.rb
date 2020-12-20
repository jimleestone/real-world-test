require 'nokogiri'
require 'open-uri'

url = 'http://share.dmhy.org/topics/view/311586_130724_TV_OP_ED_-_Jumping%21%21_Your_Voice_Rhodanthe_FLAC_BK.html'
url = URI(url)

raise StandardError, 'url was invalid' unless url.respond_to?(:open)

options = {}

options['Accept'] = 'test/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
options['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5)'
options['Accept-Language'] = 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2'
options['Referer'] = 'http://www.google.com/'

options[:proxy] = URI.parse('http://129.204.116.98:9876/')

doc = Nokogiri::HTML(url.open(options))
torrent_area = doc.at_css('.dis')
torrent_area.css('a').each do |a|
  p a[:href]
end
