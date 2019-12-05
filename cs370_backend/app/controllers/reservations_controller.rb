class ReservationsController < ApplicationController
  def index
    render json: @user.reservations.as_json(
      except: [:id, :updated_at, :created_at],
    )
  end

  def new
    begin
      flight = Flight.find(params[:flight_id])
      reserve = Reservation.create!(:user_id => @user.id, :flight_id => flight.id)
      render json: @user.reservations.as_json(
        except: [:id, :updated_at, :created_at],
      )
    rescue
      render json: ({ 'error': "reservation declined!" })
    end
  end

  def delete
    begin
      Reservation.find(params[:reservation_id]).destroy
      render json: @user.reservations.as_json(
        except: [:id, :updated_at, :created_at],
      )
    rescue
      render json: ({ 'error': "no such reservation found!" })
    end
  end
end
