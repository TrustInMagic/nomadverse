import { Request } from 'express';
import { ChronicleInterface } from '../backend/src/models/chronicle';
import { CategoryInterface } from '../backend/src/models/category';
// -------------------------------------------------- //

export interface ExtendedRequest extends Request {
  allChronicles?: ChronicleInterface[];
  allCategories?: CategoryInterface[];
}
