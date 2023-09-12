import React from 'react';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// custom hooks
import { useDataContext } from '@/providers/DataProvider';
import { useAuthContext } from '@/providers/AuthProvider';
// types
import {
  CategoryInterface,
  UserInterface,
} from '../../../../../../types/models';
// -------------------------------------------------- //

type SetStep = (prev: (prev: number) => number) => void;
type handleChange = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type Error = { title: string; message: string };

interface NavButtonsProps {
  setStep: SetStep;
}

interface TitleProps {
  setStep: SetStep;
  handleChange: handleChange;
  title: string;
}

interface BodyProps {
  setStep: SetStep;
  handleChange: handleChange;
  body: string;
}

interface CategoryProps {
  setStep: SetStep;
  categories: CategoryInterface[];
  category: string;
  handleChange: (event: SelectChangeEvent) => void;
}

interface DisplayImageProps {
  setStep: SetStep;
  handleChange: handleChange;
  displayImg: string;
}

interface SubmitProps {
  setStep: SetStep;
  user: UserInterface | null;
  handleSubmitChronicle: () => void;
}

interface ChronicleFormProps {
  step: number;
  setStep: SetStep;
  handleTitleChange: handleChange;
  handleBodyChange: handleChange;
  handleCategoryChange: (event: SelectChangeEvent) => void;
  handleDisplayImgChange: handleChange;
  handleSubmitChronicle: () => void;
  title: string;
  body: string;
  category: string;
  displayImg: string;
  errors: Error[];
}

const NavButtons: React.FC<NavButtonsProps> = ({ setStep }) => (
  <div className='flex justify-between mt-3'>
    <Button
      color='secondary'
      onClick={() => setStep((prev) => (prev === 0 ? prev : prev - 1))}
    >
      Previous
    </Button>
    <Button
      color='secondary'
      onClick={() => setStep((prev) => (prev === 4 ? prev : prev + 1))}
    >
      Next
    </Button>
  </div>
);

const Title: React.FC<TitleProps> = ({ setStep, title, handleChange }) => (
  <div className='w-full'>
    <TextField
      variant='outlined'
      color='secondary'
      autoComplete='no'
      size='small'
      label='Title'
      sx={{ width: '100%' }}
      required
      helperText='Chronicle titles must be between 3 and 80 characters long.'
      onChange={handleChange}
      value={title}
    />
    <div className='flex mt-3 w-full justify-end'>
      <Button
        color='secondary'
        onClick={() => setStep((prev) => (prev === 4 ? prev : prev + 1))}
      >
        Next
      </Button>
    </div>
  </div>
);

const Body: React.FC<BodyProps> = ({ setStep, handleChange, body }) => (
  <div>
    <TextField
      color='secondary'
      label='Body'
      multiline
      rows={8}
      sx={{ width: '100%' }}
      helperText='This editor uses Markdown to build the content of Chronicles.'
      required
      onChange={handleChange}
      value={body}
    />
    <NavButtons setStep={setStep} />
  </div>
);

const Category: React.FC<CategoryProps> = ({
  setStep,
  categories,
  category,
  handleChange,
}) => (
  <div>
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small' fullWidth required>
      <InputLabel id='demo-select-small-label' color='secondary'>
        Category
      </InputLabel>
      <Select
        value={category}
        label='Category'
        onChange={handleChange}
        color='secondary'
      >
        {categories.map((category) => (
          <MenuItem key={category.name} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <NavButtons setStep={setStep} />
  </div>
);

const DisplayImage: React.FC<DisplayImageProps> = ({
  setStep,
  displayImg,
  handleChange,
}) => (
  <div className='w-full'>
    <TextField
      variant='outlined'
      color='secondary'
      autoComplete='no'
      size='small'
      label='Display Image'
      sx={{ width: '100%' }}
      required
      value={displayImg}
      onChange={handleChange}
      helperText='This is the main image to be used as the preview for your Chronicle. Use a valid image link.'
    />
    <NavButtons setStep={setStep} />
  </div>
);

const Submit: React.FC<SubmitProps> = ({
  setStep,
  user,
  handleSubmitChronicle,
}) => (
  <div>
    <Button
      color='secondary'
      variant='contained'
      fullWidth
      disabled={user?.role !== 'admin' && user?.role !== 'author'}
      onClick={handleSubmitChronicle}
    >
      Submit Chronicle
    </Button>
    <div className='mt-1 text-xs text-slate-600'>
      NOTE: You must be a verified author to submit a chronicle
    </div>
    <div className='mt-3'>
      <Button
        color='secondary'
        onClick={() => setStep((prev) => (prev === 0 ? prev : prev - 1))}
      >
        Previous
      </Button>
    </div>
  </div>
);

export default function ChronicleForm({
  step,
  setStep,
  handleTitleChange,
  handleBodyChange,
  handleCategoryChange,
  handleDisplayImgChange,
  handleSubmitChronicle,
  title,
  body,
  category,
  displayImg,
  errors,
}: ChronicleFormProps) {
  const { categories } = useDataContext();
  const { user } = useAuthContext();

  return (
    <div className='mt-8 w-full'>
      {step === 0 && (
        <Title
          setStep={setStep}
          title={title}
          handleChange={handleTitleChange}
        />
      )}
      {step === 1 && (
        <Body setStep={setStep} body={body} handleChange={handleBodyChange} />
      )}
      {step === 2 && (
        <Category
          setStep={setStep}
          category={category}
          categories={categories}
          handleChange={handleCategoryChange}
        />
      )}
      {step === 3 && (
        <DisplayImage
          setStep={setStep}
          displayImg={displayImg}
          handleChange={handleDisplayImgChange}
        />
      )}
      {step === 4 && (
        <Submit
          setStep={setStep}
          user={user}
          handleSubmitChronicle={handleSubmitChronicle}
        />
      )}
      <div className='mt-6 text-red-600 text-sm'>
        {errors &&
          errors.map((error) => <li key={error.title}>{error.message}</li>)}
      </div>
    </div>
  );
}
