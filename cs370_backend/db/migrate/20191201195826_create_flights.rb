class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.references :airline, null: false, foreign_key: true
      t.datetime :timeOfDeparture
      t.datetime :timeOfArrival
      t.integer :airportSource
      t.integer :airportDestination

      t.timestamps
    end
  end
end
