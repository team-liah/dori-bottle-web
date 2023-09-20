import React from 'react';
import tw from 'tailwind-styled-components';
import * as Custom from '@/components/common/CustomStyledComponent';

interface IGuideTextItemWithBulletProps {
  id: number;
  title: string;
  content: React.ReactNode;
  bulletList?: React.ReactNode[];
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  flex-col
  gap-6
`;

const TitleWrapper = tw.div`
  flex
  flex-row
  items-center
  gap-[10px]
`;

const DetailWrapper = tw.div`
  flex
  w-full
  flex-row
  items-center
  gap-[10px]
  rounded-[16px]
  bg-white
  px-[22px]
  py-5
  text-[15px]
  font-medium
  leading-[22px]
  text-main-text
  shadow-[0_0_5px_0px_rgba(17,17,17,0.15)]
`;

const TitleText = tw.div`
  text-[16px]
  font-medium
  leading-[22px]
  tracking-[0.48px]
  text-main-text
`;

const BulletTextContainer = tw.ul`
  flex
  list-outside
  list-disc
  flex-col
  gap-3
  pl-6
`;

const BulletText = tw.li`
  text-[12px]
  font-medium
  leading-[16px]
  tracking-[0.24px]
  text-main-text
`;

//#endregion

const GuideTextItemWithBullet = ({
  id,
  title,
  content,
  bulletList,
}: IGuideTextItemWithBulletProps) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Custom.GuideNumber>{id}</Custom.GuideNumber>
        <TitleText>{title}</TitleText>
      </TitleWrapper>
      <DetailWrapper>{content}</DetailWrapper>
      <BulletTextContainer>
        {bulletList?.map((bullet, index) => (
          <BulletText key={index}>{bullet}</BulletText>
        ))}
      </BulletTextContainer>
    </Wrapper>
  );
};

export default GuideTextItemWithBullet;
