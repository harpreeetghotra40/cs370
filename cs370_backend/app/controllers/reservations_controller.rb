class ReservationsController < ApplicationController
  def index
    render json: @user.reservations.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end

  def new
    begin
      reserve = Reservation.create!(:user_id => @user.id, :flight_id => params[:flight_id])
      render json: @user.reservations.as_json(
        except: [:id, :updated_at, :created_at],
      )
    rescue
      render json: ({ 'error': "reservation declined!" })
    end
  end
end
