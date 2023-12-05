import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import tw from 'tailwind-styled-components';
import Error from '../common/Error';
import * as Custom from '@/components/common/CustomStyledComponent';
import { ERROR_MESSAGE } from '@/constants/ErrorMessage';
import useAuth from '@/hooks/useAuth';
import { getErrorMessage } from '@/utils/error';

interface IQrcodeErrorModalProps {
  error: AxiosError;
  onClose: () => void;
}

//#region Styled Component

const Wrapper = tw.div`
  flex
  w-[calc(100vw-60px)]
  max-w-[310px]
  flex-col
  items-center
  bg-white
  p-9
  pt-[42px]
  shadow-md
`;

const TextWrapper = tw.div`
  text-medium
  text-center
  text-[14px]
  leading-[22px]
  tracking-[-0.42px]
  text-gray1
`;

const ButtomWrapper = tw.div`
  mt-7
  flex
  w-full
  flex-row
  items-center
  justify-between
  gap-3
`;

const Button = tw(Custom.Button)`
  w-auto
  max-w-[120px]
  flex-1
  h-[48px]
  mx-auto
`;

const DetailButton = tw.div`
  mt-5
  text-[13px]
  font-medium
  tracking-[-0.36px]
  text-unactivated
  underline
`;
//#endregion

const QrcodeErrorModal = ({ error, onClose }: IQrcodeErrorModalProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [showDetail, setShowDetail] = useState(false);

  const handleConfirm = () => {
    onClose();
    router.push('/payment/penalty');
  };

  const handleRefund = () => {
    onClose();
    router.push('/payment/refund');
  };

  return (
    <Wrapper>
      {showDetail ? (
        <Fragment>
          <TextWrapper>
            <p>결제 오류 발생 사유는 대표적으로</p>
            <p>다음과 같습니다.</p>
            <p className="mt-3 text-alert">1. 카드 정지</p>
            <p className="text-alert">2. 잔액 부족</p>
            <p className="mb-3 text-alert">3. 서버 오류</p>
            <p>문제가 해결되지 않을 시</p>
            <p>고객센터에 문의를 남겨주세요!</p>
          </TextWrapper>
          <ButtomWrapper>
            <Button onClick={onClose}>닫기</Button>
          </ButtomWrapper>
        </Fragment>
      ) : getErrorMessage(error) === ERROR_MESSAGE.G006 ? (
        <Fragment>
          <TextWrapper>
            <p>결제 오류로 인해</p>
            <p>
              <span className="text-main-blue">컵 분실 패널티가 연체</span>되어
            </p>
            <p>서비스 이용이 정지되었습니다.</p>
            <p>서비스 이용을 위해</p>
            <p>패널티 비용을 결제해주세요!</p>
          </TextWrapper>
          <ButtomWrapper>
            <Button $style="disable" onClick={onClose}>
              닫기
            </Button>
            <Button onClick={handleConfirm}>패널티 결제</Button>
          </ButtomWrapper>
          <DetailButton onClick={() => setShowDetail(true)}>
            왜 오류가 발생하나요?
          </DetailButton>
        </Fragment>
      ) : getErrorMessage(error) === ERROR_MESSAGE.C007 ? (
        <Fragment>
          <TextWrapper>
            <p>
              {user?.name}님께서는{' '}
              <span className="text-alert">레드카드가 5회</span> 부여되어
            </p>
            <p>서비스를 이용하실 수 없습니다.</p>
            <p className="mt-[10px]">서비스 재이용을 원하시는 경우 </p>
            <p>블락해제 비용을 지불하셔야 합니다.</p>
            <p className="mt-[10px]">재이용을 원치 않는 경우,</p>
            <p>이용약관에 따라 잔여 버블 환불이 가능하며</p>
            <p>회원 탈퇴 절차로 이어집니다.</p>
          </TextWrapper>
          <ButtomWrapper>
            <Button $style="disable" onClick={handleRefund}>
              탈퇴하기
            </Button>
            <Button onClick={handleConfirm}>블락해제</Button>
          </ButtomWrapper>
        </Fragment>
      ) : (
        <Fragment>
          <Error message={getErrorMessage(error)} />
          <ButtomWrapper>
            <Button onClick={onClose}>확인</Button>
          </ButtomWrapper>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default QrcodeErrorModal;
