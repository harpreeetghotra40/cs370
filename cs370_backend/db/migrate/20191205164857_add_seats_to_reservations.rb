class AddSeatsToReservations < ActiveRecord::Migration[6.0]
  def change
    add_column :reservations, :seats, :integer
  end
end
