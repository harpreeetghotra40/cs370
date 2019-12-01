class Airline < ApplicationRecord
  has_many :flights
  validates :name, uniqueness: true
end
