class Airline < ApplicationRecord
  has_many :users, through: :reservations
  validates :name, presence: true
  validates :name, uniqueness: true
end
