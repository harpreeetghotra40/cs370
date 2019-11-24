class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def index
    render json: @user.as_json(
             except: [:id, :password_digest, :updated_at, :created_at],
           )
  end

  def create
    begin
      @user = User.create!(user_params)
      token = encode_token(user_id: @user.id)
      render json: {
        jwt: token,
        username: @user.name,
      }, status: :created
    rescue ActiveRecord::RecordInvalid => invalid
      render json: {
        errors: {
          message: ["user information is not valid!"],
          errors: invalid,
        },
      }, status: :unauthorized
    end
  end

  def get_reservations
    render json: @user.reservations.as_json(
      except: [:id, :user_id, :updated_at, :created_at],
    )
  end

  # def show
  #   if (params[:id].to_i == session[:user_id])
  #     @user = User.find(params[:id])
  #   else
  #     redirect_to "/users"
  #   end
  # end

  # def edit
  #   if (params[:id].to_i == session[:user_id])
  #     @user = User.find(params[:id])
  #     @grapes = ["Cabernet Sauvginon", "Merlot", "Sauvginon Blanc", "Pinot Noir", "Reisling", "Malbec", "Pinot Grigio"]
  #     render :edit
  #   else
  #     redirect_to "/users/#{session[:user_id]}/edit"
  #   end
  # end

  # def update
  #   @user = User.find(params[:id])
  #   @user.update(name: params[:user][:name], preferences: params[:user][:preferences])
  #   redirect_to user_path(@user.id)
  # end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password_digest)
  end
end
