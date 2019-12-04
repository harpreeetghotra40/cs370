class AddSeatsToFlights < ActiveRecord::Migration[6.0]
  def change
    add_column :flights, :seats, :integer
  end
end
