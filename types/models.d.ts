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
  url: string;
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
