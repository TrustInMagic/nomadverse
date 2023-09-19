export interface CategoryInterface {
  name: string;
}

export interface ChronicleInterface {
  title: string;
  date: Date;
  image_url: string;
  author: mongoose.Types.ObjectId | string;
  description: string;
  category: mongoose.Types.ObjectId | string;
  sub_chronicles?: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
  _id: string;
}

export interface UserInterface {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
  url: string;
}

export interface SubChronicleInterface {
  image_url: string;
  description: string;
  chronicle: mongoose.Types.ObjectId | string;
}

export interface CommentInterface {
  author: string;
  date: Date;
  content: string;
  likes: mongoose.Types.ObjectId[];
  replies: mongoose.Types.ObjectId[];
  _id: string;
}
