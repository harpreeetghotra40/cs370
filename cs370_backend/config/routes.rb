Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # login routes
  post "/login", to: "auth#create"

  #signup
  post "/users", to: "users#create"
  #get user info
  get "/users", to: "users#index"

  #get flights
  post "/flights", to: "flights#index"

  #get reservations
  get "/reservations", to: "reservations#index"
  #make new reservation
  post "/reservations/new", to: "reservations#new"
end
