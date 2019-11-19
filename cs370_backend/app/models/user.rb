class User < ApplicationRecord
  has_secure_password
  has_many :airlines, through: :reservations
  validates :name, presence: true
  validates :email, uniqueness: true
end
