import mongoose, { Schema, Document } from 'mongoose';
// types
import { SubChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

interface SubChronicleInterfaceExtended
  extends SubChronicleInterface,
    Document {}

const subChronicleSchema = new Schema({
  image_url: { type: String, required: true },
  chronicle: { type: Schema.Types.ObjectId, ref: 'Chronicle' },
  description: { type: String, minLength: 10, required: true },
});

export default mongoose.model<SubChronicleInterfaceExtended>(
  'SubChronicle',
  subChronicleSchema
);
