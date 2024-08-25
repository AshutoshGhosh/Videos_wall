import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/lib/hooks/users/use-create-order";
import { useVerifyOrder } from "@/lib/hooks/users/use-verify-order";
import { loadScript } from "@/lib/loadscript";
import React, { useEffect } from "react";

const Upgrade = () => {
  const createOrderMutation = useCreateOrder();
  const verifyOderMutation = useVerifyOrder();

  const verifyPayment = async (orderData: any) => {
    verifyOderMutation.mutate(
      {
        signature: orderData.razorpay_signature,
        orderId: orderData.razorpay_order_id,
        paymentId: orderData.razorpay_payment_id,
      },
      {
        onSuccess: () => {
          console.log("Payment verified");
        },
        onError: () => {
          console.log("Payment verification failed");
        },
      }
    );
  };

  const onPayment = async () => {
    let orderData;
    createOrderMutation.mutate(
      {
        planId: "premium",
      },
      {
        onSuccess: async (data) => {
          const paymentObject = new (window as any).Razorpay({
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            order_id: data.data.id,
            ...data.data,
            handler: async function (response: any) {
              console.log(response);
              orderData = response;
              await verifyPayment(orderData);
            },
          });

          await paymentObject.open();
        },
      }
    );
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <Button onClick={onPayment} className="w-full mt-4">
      Upgrade
    </Button>
  );
};

export default Upgrade;
