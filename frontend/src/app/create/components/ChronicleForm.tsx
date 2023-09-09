import React from 'react';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// -------------------------------------------------- //

type SetStep = (prev: (prevState: number) => number) => void;

interface NavButtonsProps {
  setStep: SetStep;
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

const Title = (setStep) => (
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
    />
    <NavButtons setStep={setStep} />
  </div>
);

const Body = (setStep) => (
  <div>
    <TextField
      color='secondary'
      label='Body'
      multiline
      rows={8}
      sx={{ width: '100%' }}
      helperText='This editor uses Markdown to build the content of Chronicles.'
    />
    <NavButtons setStep={setStep} />
  </div>
);

const Category = (setStep) => (
  <div>
    <div></div>
  </div>
);

const Image = (setStep) => (
  <div>
    <div></div>
  </div>
);

const Submit = (setStep) => (
  <div>
    <div></div>
  </div>
);

export default function ChronicleForm({
  step,
  setStep,
}: {
  step: number;
  setStep: () => void;
}) {
  return (
    <div className='mt-8 w-full'>
      {step === 0
        ? Title(setStep)
        : step === 1
        ? Body(setStep)
        : step === 2
        ? Category(setStep)
        : step === 3
        ? Image(setStep)
        : Submit(setStep)}
    </div>
  );
}
