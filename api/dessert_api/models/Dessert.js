import Mongoose from 'mongoose';
const DessertSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    rating: {
      type: Number,
      required: false
    },
  }
);

module.exports = Mongoose.models && Mongoose.models.Dessert
  ? Mongoose.models.Dessert
  : Mongoose.model('Dessert', DessertSchema);

