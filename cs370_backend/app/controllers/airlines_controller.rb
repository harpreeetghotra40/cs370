class AirlinesController < ApplicationController
  skip_before_action :authorized, only: [:index]

  def index
    airline = Airline.find(params[:airline_id])
    render json: airline.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end
end
