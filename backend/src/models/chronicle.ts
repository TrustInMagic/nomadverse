import mongoose from 'mongoose';
// -------------------------------------------------- //

const Schema = mongoose.Schema;

const chronicleSchema = new Schema({
  title: { type: String, required: true, maxLength: 20 },
  date: { type: Date, required: true },
  imageURL: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, minLength: 10 },
  category: {},
  sub_chronicles: {},
});

chronicleSchema.virtual('url').get(function () {
  return `/chronicle/${this._id}`;
});

export default mongoose.model('Chronicle', chronicleSchema);
