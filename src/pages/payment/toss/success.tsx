import axios from 'axios';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect } from 'react';
import Loading from '@/components/common/Loading';

//#region Styled Component

//#endregion

export default function PaymentSuccess() {
  const router = useRouter();
  const { query } = router;

  const handleSuccess = useCallback(async () => {
    const { customerKey, authKey } = query;

    try {
      if (customerKey && authKey) {
        const options = {
          method: 'POST',
          url: 'https://api.tosspayments.com/v1/billing/authorizations/issue',
          headers: {
            Authorization:
              'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
            'Content-Type': 'application/json',
          },
          data: query,
        };
        const response = await axios.request(options);
        console.log(response.data);

        router.push('/payment');
      }
    } catch (error) {
      router.replace('/payment/toss/fail');
    }
  }, [query, router]);

  useEffect(() => {
    handleSuccess();
  }, [handleSuccess]);

  return (
    <Fragment>
      <Loading />
    </Fragment>
  );
}
