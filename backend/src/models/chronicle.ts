import mongoose, { Schema } from 'mongoose';
import { ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

interface ChronicleInterfaceExtended extends ChronicleInterface {}

const chronicleSchema = new Schema({
  title: { type: String, required: true, maxLength: 50 },
  date: { type: Date, required: true },
  image_url: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, minLength: 10, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  sub_chronicles: [{ type: Schema.Types.ObjectId, ref: 'SubChronicle' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model<ChronicleInterfaceExtended>(
  'Chronicle',
  chronicleSchema
);
