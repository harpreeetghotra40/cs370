class FlightsController < ApplicationController
  def index
    airportSource = Airport.find_by(:name => params[:airportSource]).id
    airportDestination = Airport.find_by(:name => params[:airportDestination]).id
    flights = Flight.all.select do |flight|
      flight.airportSource == airpordSource && flight.airportDestination == airportDestination
    end
    render json: flights.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end
end
