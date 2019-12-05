class ReservationsController < ApplicationController
  def index
    render json: @user.flights.as_json(
      except: [:updated_at, :created_at],
    )
  end

  def new

    #begin and rescue for catching errors
    begin
      flight = Flight.find(params[:flight_id])
      #check if there are enough seats
      if flight.seats >= params[:seats].to_i
        flight.seats -= params[:seats].to_i
        flight.save
        reserve = Reservation.create!(:user_id => @user.id, :flight_id => flight.id, :seats => params[:seats])
        render json: reserve.as_json(
          except: [:updated_at, :created_at],
        )
      else
        render json: ({ 'error': "reservation declined! Not enough seats" })
      end
    rescue
      render json: ({ 'error': "reservation declined!" })
    end
  end

  def delete
    begin
      reservation = @user.reservations.where(:flight_id => params[:flight_id])
      flight = reservation.flight
      flight.seats += reservation.seats
      reservation.destroy
      flight.save
      render json: @user.reservations.as_json(
        except: [:id, :updated_at, :created_at],
      )
    rescue
      render json: ({ 'error': "no such reservation found!" })
    end
  end
end
