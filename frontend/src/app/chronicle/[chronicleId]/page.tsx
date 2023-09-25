'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import Header from '../components/Header';
import CommentSection from '../components/CommentSection';
import CustomReactMarkdown from '@/components/CustomReactMarkdown';
// utils
import { urlDecoder } from '../../../../utils/decoders';
// custom hook
import { useAuthContext } from '@/providers/AuthProvider';
import { useDataContext } from '@/providers/DataProvider';
// mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// types
import { ChronicleInterface } from '../../../../types/models';
import { CommentInterface } from '../../../../types/models';
// -------------------------------------------------- //

interface ChroniclePageProps {
  params: {
    chronicleId: string;
  };
}

export default function ChroniclePage({ params }: ChroniclePageProps) {
  const { chronicleId } = params;
  const [chronicle, setChronicle] = React.useState<ChronicleInterface | null>(
    null
  );
  const [comments, setComments] = React.useState<CommentInterface[] | []>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [subChronicleImg, setSubChronicleImg] = React.useState('');
  const [subChronicleBody, setSubChronicleBody] = React.useState('');

  const { user } = useAuthContext();
  const { fetchData } = useDataContext();

  const fetchChronicleData = React.useCallback(async () => {
    const data = await httpClient.get(`chronicle/${chronicleId}`);
    const chronicleData = await httpClient.get(`comment/${chronicleId}`);
    setChronicle(data);
    setComments(chronicleData);
  }, [chronicleId]);

  const handleBuildSubChronicle = () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmitSubChronicle = async () => {
    try {
      const newSubChronicle = {
        image_url: subChronicleImg,
        description: subChronicleBody,
        chronicle_id: chronicle?._id,
      };

      const response = await httpClient.post(
        'sub-chronicle/create',
        JSON.stringify(newSubChronicle),
        {
          'Content-Type': 'application/json',
        }
      );

      if (response.description || response[0].description) {
        setSubChronicleImg('');
        setSubChronicleBody('');
        setShowForm(false);
        fetchChronicleData();
        fetchData();
      } else {
        console.log('Something went wrong');
      }
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    fetchChronicleData();
  }, [fetchChronicleData]);

  const decodedImgURL = chronicle ? urlDecoder(chronicle?.image_url) : '/';

  return (
    <>
      {chronicle && (
        <div className='mt-20 w-full flex flex-col items-center leading-7'>
          <Header
            category={chronicle.category}
            title={chronicle.title}
            date={chronicle.date}
            author={chronicle.author.username}
          />
          <div
            style={{
              backgroundImage: `url(${decodedImgURL})`,
              backgroundPosition: 'center center',
            }}
            className='w-full h-[700px] mt-12 bg-cover rounded-md'
          />
          <div
            className='mt-8 w-2/3 pb-4 max-460:w-[97%]'
            style={{ borderBottom: 'solid 1px #d6d3d1' }}
          >
            <CustomReactMarkdown markdown={chronicle.description} />
          </div>
          <div className='flex flex-col items-center mt-8 w-2/3 max-460:w-[97%]'>
            {chronicle?.sub_chronicles &&
              chronicle.sub_chronicles.map((subChronicle) => {
                const decodedImgURL = subChronicle.image_url
                  ? urlDecoder(subChronicle.image_url)
                  : '';

                return (
                  <div
                    key={subChronicle._id}
                    className='flex flex-col items-baseline pb-4 w-full rounded-md'
                    style={{ borderBottom: 'solid 1px #d6d3d1' }}
                  >
                    {decodedImgURL.length > 0 ? (
                      // eslint-disable-next-line
                      <img
                        src={decodedImgURL}
                        className='w-full mb-5 rounded-md'
                      />
                    ) : (
                      ''
                    )}
                    <span className='max-460:px-2'>
                      <CustomReactMarkdown
                        markdown={subChronicle.description}
                      />
                    </span>
                  </div>
                );
              })}
          </div>
          {showForm && (
            <form className='mt-10'>
              <div className='w-full'>
                <TextField
                  className='mb-4'
                  variant='outlined'
                  color='secondary'
                  autoComplete='no'
                  size='small'
                  label='Display Image'
                  sx={{ width: '100%' }}
                  required
                  helperText='The Subchronicle image. Use a valid image link.'
                  onChange={(e) => setSubChronicleImg(e.target.value)}
                />
                <TextField
                  className='mb-4'
                  color='secondary'
                  label='Body'
                  multiline
                  rows={8}
                  sx={{ width: '100%' }}
                  required
                  onChange={(e) => setSubChronicleBody(e.target.value)}
                />
              </div>
              <div className='text-xs ml-3 text-slate-600 -mt-2 mb-5'>
                Add the content of your subchronicle. This editor uses{' '}
                <a
                  href='https://www.markdownguide.org/getting-started/'
                  style={{ color: '#ab47bc' }}
                >
                  markdown
                </a>
                .
              </div>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleSubmitSubChronicle}
              >
                Submit Subchronicle
              </Button>
            </form>
          )}
          {user?.username === chronicle.author.username && (
            <Button
              variant='outlined'
              color='secondary'
              className='mt-10'
              onClick={handleBuildSubChronicle}
            >
              {showForm ? 'Close form' : 'Build Subchronicle'}
            </Button>
          )}
          <CommentSection
            chronicleId={chronicle._id}
            chronicleTitle={chronicle.title}
            comments={comments}
            fetchData={fetchChronicleData}
          />
        </div>
      )}
    </>
  );
}
