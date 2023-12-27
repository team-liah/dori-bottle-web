import React from 'react';
import Slider, { Settings } from 'react-slick';
import tw from 'tailwind-styled-components';
import { IBanner } from '@/types/banner';

interface ISlickBannerProps {
  banners?: IBanner[];
}

//#region Styled Component

const ItemWrapper = tw.div`
  relative
  flex
  h-[150px]
  w-full
  flex-row
  items-start
  justify-between
  overflow-hidden
  whitespace-pre-wrap
  rounded-[25px]
  bg-red
  p-6
`;

const TextWrapper = tw.div`
  flex
  flex-col
  items-start
  justify-between
  gap-2
`;

const Title = tw.div`
  text-[16px]
  font-bold
  leading-[1.2]
  tracking-[-0.48px]
  text-gray1
`;

const Content = tw.div`
  text-[12px]
  leading-[1.2]
  tracking-[-0.36px]
  text-gray2
`;

const BannerImage = tw.img`
  h-[86px]
`;

//#endregion

const SlickBanner = ({ banners }: ISlickBannerProps) => {
  const settings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings}>
      {banners?.map((banner) => (
        <div key={banner.id}>
          <ItemWrapper
            style={{
              backgroundColor: banner.backgroundColor,
            }}
          >
            <TextWrapper>
              <Title>{banner.title}</Title>
              <Content>{banner.content}</Content>
            </TextWrapper>
            {banner.imageUrl && (
              <BannerImage src={banner.imageUrl} alt={banner.title} />
            )}
          </ItemWrapper>
        </div>
      ))}
    </Slider>
  );
};

export default SlickBanner;
