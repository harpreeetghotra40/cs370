class AddStatusToFlights < ActiveRecord::Migration[6.0]
  def change
    add_column :flights, :status, :integer
  end
end
