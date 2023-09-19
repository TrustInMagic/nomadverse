import mongoose, { Schema } from 'mongoose';
import { CommentInterface } from '../../../types/models';
// -------------------------------------------------- //

interface CommentInterfaceExtended extends CommentInterface, Document {}

const commentSchema = new Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true },
  content: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  chronicle: { type: Schema.Types.ObjectId, ref: 'Chronicle' },
  parent_comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
  replies: [
    { type: Schema.Types.ObjectId, ref: 'Comment', autopopulate: true },
  ],
});

commentSchema.plugin(require('mongoose-autopopulate'));

export default mongoose.model<CommentInterfaceExtended>(
  'Comment',
  commentSchema
);
