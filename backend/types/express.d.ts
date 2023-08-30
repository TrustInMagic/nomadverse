import { Request } from 'express';
import { ChronicleInterface } from '../src/models/chronicle';
import { CategoryInterface } from '../src/models/category';
// -------------------------------------------------- //

export interface ExtendedRequest extends Request {
  allChronicles?: ChronicleInterface[];
  allCategories?: CategoryInterface[];
}
