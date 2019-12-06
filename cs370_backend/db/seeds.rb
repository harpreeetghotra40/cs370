# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# require date library
require "date"

#createing airlines
Airline.find_or_create_by(:name => "Hairline")
Airline.find_or_create_by(:name => "Pairline")
Airline.find_or_create_by(:name => "Kairline")

#creating airports
Airport.find_or_create_by(:name => "JFK", :location => "New York, NY")
Airport.find_or_create_by(:name => "LAX", :location => "Los Angeles, CA")
Airport.find_or_create_by(:name => "LAS", :location => "Las Vegas, NV")
Flight.find_or_create_by(:airline_id => 3, :timeOfDeparture => DateTime.now + 10, :timeOfArrival => DateTime.now + 11, :airportSource => 1, :airportDestination => 3, :price => rand(300..500), :seats => 1, :status => 1)
Flight.find_or_create_by(:airline_id => 3, :timeOfDeparture => DateTime.now + 11, :timeOfArrival => DateTime.now + 12, :airportSource => 3, :airportDestination => 1, :price => rand(300..500), :seats => 1, :status => 1)
# #destroy all flights
# # Flight.destroy_all
# #creaing flights
# Flight.find_or_create_by(:airline_id => 3, :timeOfDeparture => DateTime.now + 5, :timeOfArrival => DateTime.now + 6, :airportSource => 1, :airportDestination => 3, :price => rand(300..500), :seats => 0, :status => 1)
# Flight.find_or_create_by(:airline_id => 3, :timeOfDeparture => DateTime.now + 4, :timeOfArrival => DateTime.now + 5, :airportSource => 1, :airportDestination => 3, :price => rand(300..500), :seats => 0, :status => 1)
# Flight.find_or_create_by(:airline_id => 3, :timeOfDeparture => DateTime.now + 5, :timeOfArrival => DateTime.now + 6, :airportSource => 3, :airportDestination => 1, :price => rand(300..500), :seats => 0, :status => 1)
# Flight.find_or_create_by(:airline_id => 3, :timeOfDeparture => DateTime.now + 4, :timeOfArrival => DateTime.now + 5, :airportSource => 3, :airportDestination => 1, :price => rand(300..500), :seats => 0, :status => 1)
# for i in 0..200                                                
  # randDate = DateTime.now + rand(30)-2                         
  # randArrival = randDate + 0.3                                 
  # airlineID = Airline.find_by(:name => "Hairline").id          
  # airportSource = Airport.all.sample                           
  # airportDestination = Airport.all.sample                      
  # while airportSource.id == airportDestination.id              
    # airportDestination = Airport.all.sample                    
  # end                                                          
  # Flight.find_or_create_by(:airline_id => airlineID, :timeOfDeparture => randDate, :timeOfArrival => randArrival, :airportSource => airportSource.id, :airportDestination => airportDestination.id, :price => rand(300..500), :seats => rand(100..200), :status => 1)
# end                                                            
                                                               
#creaing flights                                               
# for i in 0..200                                                
  # randDate = DateTime.now + rand(30)-2                         
  # randArrival = randDate + 0.3                                 
  # airlineID = Airline.find_by(:name => "Pairline").id          
  # airportSource = Airport.all.sample                           
  # airportDestination = Airport.all.sample                      
  # while airportSource.id == airportDestination.id              
    # airportDestination = Airport.all.sample                    
  # end                                                          
  # Flight.find_or_create_by(:airline_id => airlineID, :timeOfDeparture => randDate, :timeOfArrival => randArrival, :airportSource => airportSource.id, :airportDestination => airportDestination.id, :price => rand(300..500), :seats => rand(100..200), :status => 1)
# end                                                            
                                                               
# #creaing flights                                               
# for i in 0..200                                                
  # randDate = DateTime.now + rand(30)-2                         
  # randArrival = randDate + 0.3                                 
  # airlineID = Airline.find_by(:name => "Jairline").id          
  # airportSource = Airport.all.sample                           
  # airportDestination = Airport.all.sample                      
  # while airportSource.id == airportDestination.id              
    # airportDestination = Airport.all.sample                    
  # end                                                          
  # Flight.find_or_create_by(:airline_id => airlineID, :timeOfDeparture => randDate, :timeOfArrival => randArrival, :airportSource => airportSource.id, :airportDestination => airportDestination.id, :price => rand(300..500), :seats => rand(100..200), :status => 1)
# end                                                            
                                                               