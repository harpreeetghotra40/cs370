class Flight < ApplicationRecord
  belongs_to :airline
  has_many :reservations
  has_many :users, through: :reservations
end
