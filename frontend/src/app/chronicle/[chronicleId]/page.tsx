'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import Header from '../components/Header';
// utils
import { urlDecoder, specialCharDecoder } from '../../../../utils/decoders';
// custom hook
import { useAuthContext } from '@/providers/AuthProvider';
import { useDataContext } from '@/providers/DataProvider';
// mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// types
import { ChronicleInterface } from '../../../../../types/models';
// -------------------------------------------------- //

export default function ChroniclePage({
  params,
}: {
  [k: string]: { chronicleId: string };
}) {
  const { chronicleId } = params;
  const [chronicle, setChronicle] = React.useState<ChronicleInterface | null>(
    null
  );
  const [showForm, setShowForm] = React.useState(false);
  const [subChronicleImg, setSubChronicleImg] = React.useState('');
  const [subChronicleBody, setSubChronicleBody] = React.useState('');

  const { user } = useAuthContext();
  const { fetchData } = useDataContext();

  const fetchChronicleData = React.useCallback(async () => {
    const data = await httpClient.get(`chronicle/${chronicleId}`);
    setChronicle(data);
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
            className='w-full h-[700px] mt-12 bg-cover'
          />
          <div
            className='mt-8 w-2/3 pb-4'
            style={{ borderBottom: 'solid 1px #d6d3d1' }}
          >
            {specialCharDecoder(chronicle.description)}
          </div>
          <div className='flex flex-col items-center mt-8 w-2/3 '>
            {chronicle?.sub_chronicles &&
              chronicle.sub_chronicles.map((subChronicle) => {
                const decodedImgURL = subChronicle.image_url
                  ? urlDecoder(subChronicle.image_url)
                  : '/';

                return (
                  <div
                    key={subChronicle._id}
                    className='flex flex-col items-center pb-4'
                    style={{ borderBottom: 'solid 1px #d6d3d1' }}
                  >
                    {/* eslint-disable-next-line */}
                    <img src={decodedImgURL} className='w-full mb-5' />
                    <span>{specialCharDecoder(subChronicle.description)}</span>
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
                  helperText='Add the content of your Subchronicle.'
                  required
                  onChange={(e) => setSubChronicleBody(e.target.value)}
                />
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
        </div>
      )}
    </>
  );
}
