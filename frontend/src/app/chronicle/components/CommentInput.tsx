import React from 'react';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface CommentInputProps {
  submitContent: () => void;
  setContent: (value: string) => void;
  setShowReplayField?: (bool: boolean) => void;
  content: string;
}

export default function CommentInput({
  submitContent,
  content,
  setContent,
  setShowReplayField,
}: CommentInputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <>
      <TextField
        label='Enter your comment here'
        variant='standard'
        color='secondary'
        onFocus={() => setFocused(true)}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      {focused && (
        <div>
          <Button
            size='small'
            color='secondary'
            variant='text'
            sx={{ alignSelf: 'flex-start', marginTop: '10px' }}
            onClick={submitContent}
          >
            Comment
          </Button>
          <Button
            size='small'
            color='secondary'
            variant='text'
            sx={{ alignSelf: 'flex-start', marginTop: '10px' }}
            onClick={() => {
              setFocused(false);
              if (setShowReplayField) {
                setShowReplayField(false);
              }
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </>
  );
}
