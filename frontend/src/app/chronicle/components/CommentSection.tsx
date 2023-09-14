import React from 'react';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
// utils
import formatDate from '../../../../utils/dateFormat';
// -------------------------------------------------- //

interface CommentSectionProps {
  chronicleTitle: string;
}

const mockComments = [
  {
    id: 293812,
    author: 'Jimmy',
    date: new Date(),
    content: 'Sa moara jean daca nu te sparg',
    likes: 3,
    replies: [
      {
        id: 234234,
        author: 'Ted',
        date: new Date(),
        content: 'Te rup daca te prind crede-ma',
        likes: 0,
        replies: [
          {
            id: 454555,
            author: 'Bob',
            date: new Date(),
            content: 'Ba linistiti va ca va muiesc',
            likes: 1,
            replies: [],
          },
        ],
      },
    ],
  },
];

function Comment({ comment }) {
  const nestedComments = (comment.replies || []).map((comment) => (
    <Comment key={comment.id} comment={comment} />
  ));

  return (
    <div
      style={{
        borderLeft: 'solid #ab47bc 1px',
        paddingLeft: '10px',
        marginBottom: '30px',
      }}
    >
      <div className='mb-3 pt-3'>
        <div className='text-sm font-semibold'>{comment.author}</div>
        <div className='text-xs'>{formatDate(comment.date)}</div>
      </div>
      <div
        className='text-sm pb-3'
        style={{ borderBottom: 'solid 1px #d6d3d1' }}
      >
        <div>{comment.content}</div>
        <div className='flex gap-5 mt-3'>
          <div className='flex gap-1'>
            {comment.likes > 0 ? (
              <FavoriteIcon
                color='secondary'
                fontSize='small'
                className='cursor-pointer'
              />
            ) : (
              <FavoriteBorderIcon
                color='secondary'
                fontSize='small'
                className='cursor-pointer'
              />
            )}
            <span className='text-[#ab47bc]'>{comment.likes}</span>
          </div>
          <div className='flex gap-1 cursor-pointer'>
            <ReplyIcon color='secondary' fontSize='small' />
            <span className='text-[#ab47bc]'>Reply</span>
          </div>
        </div>
      </div>
      <div>{nestedComments}</div>
    </div>
  );
}

export default function CommentSection({
  chronicleTitle,
}: CommentSectionProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div className='mt-20 flex flex-col w-2/3'>
      <span className='font-bold text-xl self-center mb-6'>Comments</span>
      {/* eslint-disable-next-line */}
      <span className='mb-3'>Commenting on chronicle "{chronicleTitle}"</span>
      <TextField
        label='Enter your comment here'
        variant='standard'
        color='secondary'
        onFocus={() => setFocused(true)}
      />
      {focused && (
        <div>
          <Button
            size='small'
            color='secondary'
            variant='text'
            sx={{ alignSelf: 'flex-start', marginTop: '10px' }}
          >
            Comment
          </Button>
          <Button
            size='small'
            color='secondary'
            variant='text'
            sx={{ alignSelf: 'flex-start', marginTop: '10px' }}
            onClick={() => setFocused(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      <div className='mt-10'>
        {mockComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
