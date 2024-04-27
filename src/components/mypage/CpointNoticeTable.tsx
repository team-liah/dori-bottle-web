import React from 'react';
import tw from 'tailwind-styled-components';

//#region Styled Component

const TableWrapper = tw.div`
  my-5
  grid
  max-w-[90%]
  grid-cols-[1fr_4fr]
  gap-[1px]
  border-[1px]
  border-back-line
  bg-back-line
`;

const ColumnHeader = tw.div`
  vertical-align-middle
  flex
  items-center
  justify-center
  bg-back-color
  px-3
  py-[10px]
  text-[12px]
  font-medium
`;

const ColumnContent = tw.div`
  flex
  flex-row
  items-center
  justify-start
  whitespace-pre-line
  bg-white
  px-3
  py-[10px]
  text-[12px]
  font-normal
  text-gray1
`;
//#endregion

const CpointNoticeTable = () => {
  return (
    <TableWrapper>
      <ColumnHeader>적립기준</ColumnHeader>
      <ColumnContent>
        {'도리보틀 컵 반납 시 300원 적립\n ※ 연간 최대 50만 원까지 적립 가능'}
      </ColumnContent>
      <ColumnHeader>지급주체</ColumnHeader>
      <ColumnContent>한국환경공단</ColumnContent>
      <ColumnHeader>지급시기</ColumnHeader>
      <ColumnContent>익월 말일</ColumnContent>
      <ColumnHeader>지급안내</ColumnHeader>
      <ColumnContent>
        적립 포인트는 탄소중립실천포인트 가입 시 기입한 계좌번호로 지급돼요.
      </ColumnContent>
    </TableWrapper>
  );
};

export default CpointNoticeTable;
