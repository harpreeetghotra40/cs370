class AirportsController < ApplicationController
  skip_before_action :authorized, only: [:arrivals , :departures]

  def arrivals
    flights = Flight.all.select do |flight|
      flight.airportDestination == params[:destination].to_i && flight.timeOfDeparture.day == 11
    end
    render json: flights.as_json(
      except: [:updated_at, :created_at],
    )
  end

  def departures
    flights = Flight.all.select do |flight|
      flight.airportSource == params[:source].to_i && flight.timeOfArrival.day == 11
    end
    render json: flights.as_json(
      except: [:updated_at, :created_at],
    )
  end
end
