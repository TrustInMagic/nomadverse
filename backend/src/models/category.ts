import mongoose, { Document, Schema } from 'mongoose';
// types
import { CategoryInterface } from '../../types/models';
// -------------------------------------------------- //

interface CategoryInterfaceExtended extends Document, CategoryInterface {}

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<CategoryInterfaceExtended>(
  'Category',
  categorySchema
);
