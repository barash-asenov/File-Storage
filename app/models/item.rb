# app/models/item.rb
class Item < ApplicationRecord
  # Model association
  belongs_to :todo

  # Validation
  validates_presence_of :name
end
