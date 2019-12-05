class FlightsController < ApplicationController
  skip_before_action :authorized, only: [:index]

  def index
    airportSource = Airport.find_by(:location => params[:airportSource])
    airportDestination = Airport.find_by(:location => params[:airportDestination])
    date = params[:date].to_datetime
    if (params[:airline] == "null")
      flights = Flight.all.select do |flight|
        flight.airportSource == airportSource.id &&
        flight.airportDestination == airportDestination.id &&
        flight.timeOfDeparture.day == date.day &&
        flight.timeOfDeparture.year == date.year &&
        flight.timeOfDeparture.month == date.month
      end
    else
      flights = Flight.all.select do |flight|
        flight.airline.name == params[:airline]
        flight.airportSource == airportSource.id &&
        flight.airportDestination == airportDestination.id &&
        flight.timeOfDeparture.day == date.day &&
        flight.timeOfDeparture.year == date.year &&
        flight.timeOfDeparture.month == date.month
      end
    end

    render json: flights.as_json(
      except: [:updated_at, :created_at],
    )
  end

  def show
    begin
      flight = Flight.find(params[:flight_id])
      render json: flight.as_json(
        except: [:updated_at, :created_at],
      )
    rescue
      render json: ({ 'errors': "Flight not found" })
    end
  end
end
