import React from 'react';
import tw from 'tailwind-styled-components';
import GuideTextItemWithBullet from './GuideTextItemWithBullet';
import * as Custom from '@/components/common/CustomStyledComponent';

//#region Styled Component

const Wrapper = tw(Custom.TabWrapper)`
  gap-8
`;

const HighlightText = tw.span<{ $color: 'red' | 'blue' }>`
  font-bold
  ${(props) => {
    switch (props.$color) {
      case 'red':
        return 'text-alert';
      case 'blue':
        return 'text-main-blue';
    }
  }}
`;

//#endregion

const guideItemList = [
  {
    id: 1,
    title: '컵 이용기한',
    content: (
      <p>
        컵 대여 시 이용기한은 <HighlightText $color="blue">2주</HighlightText>
        입니다.
        <br />
        기한 내에 반납해주세요!
      </p>
    ),
    bulletList: [
      '깨끗한 컵을 세척없이 편리하게 이용하기 위해선 사용 후 당일 반납을 가장 추천해요 :)',
    ],
  },
  {
    id: 2,
    title: '패널티 부과',
    content: (
      <p>
        2주 이내로 반납되지 않은 컵은{' '}
        <HighlightText $color="blue">분실</HighlightText>처리 되며 등록된 결제
        수단으로 <HighlightText $color="blue">패널티 5,000원</HighlightText>이
        자동으로 청구됩니다. 기한 내로 반드시 반납해주세요!
      </p>
    ),
    bulletList: [
      <p>
        패널티가 부과되었더라도{' '}
        <b>패널티 부과 후 2주 이내로 반납할 시 패널티 비용을 환급</b>받을 수
        있습니다. 환급처리를 위해서는 반납 후 고객센터로 연락 부탁드립니다.
      </p>,
      '2주 초과 이후 패널티 비용 환급은 불가능합니다.',
    ],
  },
  {
    id: 3,
    title: '환불규정',
    content: (
      <p>
        버블은 구매 후{' '}
        <HighlightText $color="blue">전액환불 가능</HighlightText>하나, 구매한
        버블을{' '}
        <HighlightText $color="blue">
          1개라도 사용하였다면 환불이 불가
        </HighlightText>
        하므로 이 점 유의해주시길 바랍니다.
      </p>
    ),
    bulletList: [
      '블락처리 된 사용자가 탈퇴를 위해 환불 절차를 진행하는 경우, 버블 개당 350원의 금액으로 산정되어 환불됩니다.',
    ],
  },
  {
    id: 4,
    title: '레드카드 / 블락처리',
    content: (
      <p className="break-all">
        컵과 수거함에{' '}
        <HighlightText $color="red">
          오염물을 투입하거나 파손하는 행위
        </HighlightText>
        에 대해서는 엄격히 조치합니다.
        <br />
        <br />
        해당 문제가 발생할 시 수거함 내부 블랙박스 및 사용자 이용내역을 확인 후{' '}
        <HighlightText $color="red">레드카드를 부여</HighlightText>합니다.
        레드카드가 <HighlightText $color="red">5장</HighlightText> 부여된
        사용자는 <HighlightText $color="red">블락처리</HighlightText> 되어{' '}
        <HighlightText $color="red">서비스 이용이 불가</HighlightText>하며,
        문제의 심각도에 따라 영업 방해에 따른 형사 처벌이 이루어질 수 있습니다.
        <br />
        <br />
        서비스 재이용을 위해서는{' '}
        <HighlightText $color="red">블락해제 비용 30,000원</HighlightText>을
        지불하셔야 하며, 재이용을 원하시지 않는 경우{' '}
        <HighlightText $color="red">
          버블 환불 및 회원 탈퇴가 가능
        </HighlightText>
        합니다.
        <br />
        <br />
        기분 좋고 청결한 서비스를 제공하기 위한 조치이므로, 회원님들께서는
        레드카드가 부여되지 않도록 유의하여 주시길 바랍니다 {':)'}
      </p>
    ),
  },
];
const GuidePolicyTab = () => {
  return (
    <Wrapper>
      {guideItemList.map((item) => (
        <GuideTextItemWithBullet key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default GuidePolicyTab;