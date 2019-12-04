class Flight < ApplicationRecord
  belongs_to :airline
  has_many :users, through: :reservations
end
