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
        컵 대여 시 이용기한은{' '}
        <HighlightText $color="blue">24시간(하루)</HighlightText>
        입니다.
        <br />
        기한 내에 반납해주세요!
      </p>
    ),
  },
  {
    id: 2,
    title: '페널티 부과',
    content: (
      <p>
        24시간 내로 반납되지 않은 컵은{' '}
        <HighlightText $color="blue">분실</HighlightText>처리 되며 등록된 결제
        수단으로 <HighlightText $color="blue">페널티 8,000원</HighlightText>이
        자동으로 청구됩니다. 반드시 기한 내에 반납해주세요 :)
      </p>
    ),
    bulletList: [
      <p>
        {'페널티가 부과되었더라도'}
        <b>
          {
            '컵 분실 시점으로부터 1주일 이내로 해당 컵을 반납할 시 페널티 비용을 환급'
          }
        </b>
        {
          // eslint-disable-next-line
          "받을 수 있습니다. 컵 반납 후 ‘결제내역 > 컵 분실'의 상세 탭에서 에서 환불접수를 해주세요. 미접수시 환불되지 않습니다."
        }
      </p>,
      '컵 분실 시점으로부터 1주일이 지나면 페널티 비용 환불이 불가합니다.',
    ],
  },
  {
    id: 3,
    title: '환불규정',
    content: (
      <p>
        구매한 버블은 사용하지 않은 경우에 한해{' '}
        <HighlightText $color="blue">전액 환불이 가능</HighlightText>합니다.
        버블을{' '}
        <HighlightText $color="blue">
          1개라도 사용한 경우 환불에 제한
        </HighlightText>
        이 발생할 수 있습니다.
      </p>
    ),
    bulletList: [
      '블락처리 된 이용자가 탈퇴를 위해 환불 절차를 진행하는 경우, 남은 버블은 개당 350원의 금액으로 산정되어 환불됩니다.',
    ],
  },
  {
    id: 4,
    title: '레드카드 / 블락처리',
    content: (
      <p className="break-all">
        컵과 반납함에{' '}
        <HighlightText $color="red">
          오염물을 투입하거나 파손하는 행위
        </HighlightText>
        에 대해서는 엄격히 조치합니다.
        <br />
        <br />
        해당 문제가 발생할 시 반납함 내부 블랙박스 및 이용자 이용내역을 확인 후{' '}
        <HighlightText $color="red">레드카드를 부여</HighlightText>합니다.
        레드카드가 <HighlightText $color="red">5장</HighlightText> 부여된
        이용자는 <HighlightText $color="red">블락처리</HighlightText> 되어{' '}
        <HighlightText $color="red">서비스 이용이 불가</HighlightText>하며,
        문제의 심각도에 따라 영업 방해에 따른 형사 처벌이 이루어질 수 있습니다.
        <br />
        <br />
        서비스 재이용을 위해서는{' '}
        <HighlightText $color="red">블락해제 비용 30,000원</HighlightText>을
        지불하셔야 하며, 재이용을 원하시지 않는 경우{' '}
        <HighlightText $color="red">환불 및 회원 탈퇴가 가능</HighlightText>
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
      {guideItemList.map((item, index) => (
        <>
          <GuideTextItemWithBullet key={item.id} {...item} />
          {index !== guideItemList.length - 1 && (
            <hr className="text-[#F2F1F1]" />
          )}
        </>
      ))}
    </Wrapper>
  );
};

export default GuidePolicyTab;
