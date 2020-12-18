class AddProfileFieldsToUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :password
    add_column :users, :image, :string
    add_column :users, :bio, :text
  end
end
