class AirlinesController < ApplicationController
  def index
    begin
      if @user.admin
        airline = Airline.find_by(:name => params[:airline_name])
        render json: airline.flights.as_json(
          except: [:id, :updated_at, :created_at],
        )
      else
        render json: ({ 'error': "Airline admin priviledges required." })
      end
    rescue
      render json: ({ 'error': "Airline could not be found" })
    end
  end
end
