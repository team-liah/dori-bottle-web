import React from 'react';
import tw from 'tailwind-styled-components';
import CpointDrawerItem from './CpointDrawerItem';
import CpointJoinRequire from './CpointJoinRequire';
import CpointLinkComplete from './CpointLinkComplete';
import CpointNoticeTable from './CpointNoticeTable';
import CpointVerifyRequire from './CpointVerifyRequire';
import Layer from '@/components/common/Layer';

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-full
  flex-col
  items-center
  gap-5
  pt-10
`;

const BulletTextContainer = tw.ul`
  flex
  w-full
  list-outside
  list-disc
  flex-col
  gap-1
  bg-[#F2F3F8]
  p-5
  pl-10
`;

const BulletText = tw.li`
  text-[12px]
  font-normal
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

const PolicyWrapper = tw.div`
  mt-2
  flex
  w-full
  flex-col
  gap-1
  text-[12px]
  font-medium
  leading-[22px]
  tracking-[-0.36px]
  text-gray2
`;

//#endregion

const bulletList = [
  '도리보틀 회원이면서 탄소중립실천포인트 가입자인 경우에만 적립 가능합니다.',
  '탄소중립실천포인트에 이미 가입되어 있더라도 도리보틀 본인인증을 완료해야 포인트 적립이 가능합니다.',
  '반드시 도리보틀에 가입한 핸드폰 번호로 본인인증해주세요. 인증 번호가 다를 시 포인트 연동이 어렵습니다.',
  '포인트 가입여부 확인 및 연동은 약 3~5영업일 소요됩니다.',
  '인센티브 지급 주체는 한국환경공단으로, 한국환경공단의 사정에 따라 변동될 수 있습니다.',
  '인센티브 적립 내역 및 세부 내용은 탄소중립실천포인트 사이트에서 확인이 가능합니다.(www.cpoint.or.kr/netzero)',
  '탄소중립실천포인트 운영에 관한 규정(환경부 고시 제2023-16호)에 따라 운영됩니다.',
  '도리보틀 회원이 아닌 경우 적립 대상에서 제외됩니다.',
];

const CpointLayer = () => {
  const PASS_VERIFIED = true;
  const CPOINT_JOIN = true;

  const CpointContent = () => {
    if (!PASS_VERIFIED) return <CpointVerifyRequire />;
    if (!CPOINT_JOIN) return <CpointJoinRequire />;

    return <CpointLinkComplete />;
  };

  return (
    <Layer title="탄소중립실천포인트" scrollable={true} fullScreen={true}>
      <Wrapper>
        {CpointContent()}
        <PolicyWrapper>
          <CpointDrawerItem
            title="적립 및 지급안내"
            content={<CpointNoticeTable />}
          />
          <CpointDrawerItem
            title="유의사항"
            content={
              <BulletTextContainer>
                {bulletList.map((text, index) => (
                  <BulletText key={index}>{text}</BulletText>
                ))}
              </BulletTextContainer>
            }
          />
        </PolicyWrapper>
      </Wrapper>
    </Layer>
  );
};

export default CpointLayer;
