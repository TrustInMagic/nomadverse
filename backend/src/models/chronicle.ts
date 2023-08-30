import mongoose from 'mongoose';
// -------------------------------------------------- //

const Schema = mongoose.Schema;

const chronicleSchema = new Schema({
  title: { type: String, required: true, maxLength: 20 },
  date: { type: Date, required: true },
  image_url: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, minLength: 10, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_chronicles: { type: Schema.Types.ObjectId, ref: 'SubChronicle' },
});

chronicleSchema.virtual('url').get(function () {
  return `/chronicle/${this._id}`;
});

export default mongoose.model('Chronicle', chronicleSchema);
