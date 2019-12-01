class FlightsController < ApplicationController
  skip_before_action :authorized, only: [:index]
  def index
    # byebug
    airportSource = Airport.find_by(:location => params[:airportSource])
    airportDestination = Airport.find_by(:location => params[:airportDestination])
    date = DateTime.strptime(params[:date], "%Y-%m-%d")
    flights = Flight.all.select do |flight|
      flight.airportSource == airportSource.id && flight.airportDestination == airportDestination.id && ((flight.timeOfDeparture - date) > 0)
    end
    render json: flights.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end
end
