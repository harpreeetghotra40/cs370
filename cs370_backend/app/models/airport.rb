class Airport < ApplicationRecord
  validates :name, uniqueness: true
end
