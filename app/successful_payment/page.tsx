import { SuccessfulPayment } from "@/shared/components/shared/successful-payment";
import Head from "next/head";

export default function CheckoutSuccessfulPayment() {
  return (
    <div>
      <Head>
        <title>Оплата прошла успешно!</title>
        <meta name="description" content="example description" />
      </Head>
      <SuccessfulPayment />
    </div>
  );
}
