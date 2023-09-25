import React from 'react';
// mui
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
// components
import CommentInput from './CommentInput';
// utils
import formatDate from '../../../../utils/dateFormat';
// custom hooks
import { useAuthContext } from '@/providers/AuthProvider';
// http
import httpClient from '@/api/http-client';
// next
import { useRouter } from 'next/navigation';
// types
import { CommentInterface } from '../../../../types/models';
import { UserInterface } from '../../../../types/models';
// -------------------------------------------------- //

interface CommentSectionProps {
  chronicleTitle: string;
  comments: CommentInterface[] | [];
  chronicleId: string;
  fetchData: () => void;
}

interface CommentProps {
  comment: CommentInterface;
  user?: UserInterface | null;
  fetchData?: () => void;
  chronicleId: string;
}

function Comment({ comment, user, fetchData, chronicleId }: CommentProps) {
  const nestedComments = (comment.replies || []).map((comment) => (
    <Comment
      key={comment._id}
      comment={comment}
      user={user}
      fetchData={fetchData}
      chronicleId={chronicleId}
    />
  ));
  const [showReplyField, setShowReplayField] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState('');
  const router = useRouter();

  const handleReplyClick = () => {
    if (!user) {
      router.push(`/auth/login?from=/chronicle/${chronicleId}`);
      return;
    }
    setShowReplayField(true);
  };

  const submitReply = async () => {
    console.log('hit');
    const reply = {
      author: user?.username,
      content: replyContent,
      commentId: comment._id,
    };

    const response = await httpClient.post(
      'comment/create',
      JSON.stringify(reply),
      {
        'Content-Type': 'application/json',
      }
    );

    if (response.author && fetchData) {
      setReplyContent('');
      setShowReplayField(false);
      fetchData();
    } else {
      console.error('Error submitting reply.');
    }
  };

  const handleHeartClick = async () => {
    const username = {
      username: user?.username,
    };

    const response = await httpClient.post(
      `comment/like/${comment._id}`,
      JSON.stringify(username),
      {
        'Content-Type': 'application/json',
      }
    );

    if (response === 'OK' && fetchData) {
      fetchData();
    } else {
      console.error('Error liking comment');
    }
  };

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
            {comment.likes.length > 0 ? (
              <FavoriteIcon
                color='secondary'
                fontSize='small'
                className='cursor-pointer'
                onClick={handleHeartClick}
              />
            ) : (
              <FavoriteBorderIcon
                color='secondary'
                fontSize='small'
                className='cursor-pointer'
                onClick={handleHeartClick}
              />
            )}
            <span className='text-[#ab47bc]'>{comment.likes.length}</span>
          </div>
          <div className='flex gap-1 cursor-pointer' onClick={handleReplyClick}>
            <ReplyIcon color='secondary' fontSize='small' />
            <span className='text-[#ab47bc]'>Reply</span>
          </div>
        </div>
        <div className='my-3'>
          {showReplyField && (
            <CommentInput
              setContent={setReplyContent}
              submitContent={submitReply}
              setShowReplayField={setShowReplayField}
              content={replyContent}
            />
          )}
        </div>
      </div>
      <div>{nestedComments}</div>
    </div>
  );
}

export default function CommentSection({
  chronicleTitle,
  comments,
  chronicleId,
  fetchData,
}: CommentSectionProps) {
  const [commentContent, setCommentContent] = React.useState('');
  const { user } = useAuthContext();

  const submitComment = async () => {
    const comment = {
      author: user?.username,
      content: commentContent,
      chronicleId: chronicleId,
    };

    const response = await httpClient.post(
      'comment/create',
      JSON.stringify(comment),
      {
        'Content-Type': 'application/json',
      }
    );

    if (response.author) {
      setCommentContent('');
      fetchData();
    } else {
      console.error('Error submitting comment.');
    }
  };

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className='mt-20 flex flex-col w-2/3 max-460:w-[97%]'>
      <a
        className='font-bold text-xl self-center mb-6 no-underline text-inherit'
        href='#comments'
        id='comments'
      >
        Comments
      </a>
      {user && (
        <span className='mb-3 text-sm'>
          {/* eslint-disable-next-line */}
          Commenting on chronicle "{chronicleTitle}"
        </span>
      )}
      {user ? (
        <CommentInput
          submitContent={submitComment}
          setContent={setCommentContent}
          content={commentContent}
        />
      ) : (
        <span className='mt-6 flex justify-center text-sm text-slate-600'>
          Please log in to leave a comment.
        </span>
      )}
      <div className='mt-10'>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              user={user}
              fetchData={fetchData}
              chronicleId={chronicleId}
            />
          ))
        ) : (
          <span className='mt-10 flex justify-center text-sm text-slate-600'>
            Be the first one who leaves a comment!
          </span>
        )}
      </div>
    </div>
  );
}
