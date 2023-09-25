import React from 'react';
// utils
import { urlDecoder, markdownDecoder } from '../../../utils/decoders';
// components
import CategoryTag from '../CategoryTag';
import ChronicleCardDetail from '../ChronicleCard/ChronicleCardDetail';
// next
import { useRouter } from 'next/navigation';
// types
import { ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

export default function ChronicleOverview({
  chronicle,
}: {
  chronicle: ChronicleInterface;
}) {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chronicle/${chronicle._id}`);
  };

  React.useEffect(() => {
    const widthSetter = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', widthSetter);

    return () => window.removeEventListener('resize', widthSetter);
  }, []);

  return (
    <div
      className='flex gap-6 cursor-pointer max-300:gap-2'
      onClick={handleClick}
    >
      <div>
        {/* eslint-disable-next-line */}
        <img
          className='h-[250px] w-[400px] max-720:max-w-[350px] max-720:h-auto max-550:max-w-[250px] max-460:max-w-[200px] max-300:max-w-[160px] rounded-md'
          src={urlDecoder(chronicle.image_url)}
          alt='Chronicle'
        />
      </div>
      <div className='flex flex-col justify-center'>
        <div className='max-300:hidden'>
          <CategoryTag category={chronicle.category} />
        </div>
        <ChronicleCardDetail
          description={
            screenWidth > 720 ? markdownDecoder(chronicle.description) : ''
          }
          title={chronicle.title}
          visibleLetters={screenWidth > 1000 ? 35 : 15}
          center={false}
        />
      </div>
    </div>
  );
}
