class AirportsController < ApplicationController
  skip_before_action :authorized, only: [:index]

  def arrival
    flights = Flight.all.select do |flight|
      flight.airportDestination == params[:destination].to_i && flight.timeOfDeparture > DateTime.now
    end
    render json: flights.as_json(
      except: [:updated_at, :created_at],
    )
  end

  def destination
    flights = Flight.all.select do |flight|
      flight.airportSource == params[:source].to_i && flight.timeOfArrival > DateTime.now
    end
    render json: flights.as_json(
      except: [:updated_at, :created_at],
    )
  end
end
