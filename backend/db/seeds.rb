20.times do
  user = User.create(username: Faker::JapaneseMedia::SwordArtOnline.game_name.downcase,
                     email: Faker::Internet.email,
                     password: '123456')
end
