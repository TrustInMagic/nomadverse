import mongoose, { Document, Schema } from 'mongoose';
// -------------------------------------------------- //

export interface CategoryInterface extends Document {
  name: string;
}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<CategoryInterface>('Category', categorySchema);
