import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.payments)["verify-payments"]["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.payments)["verify-payments"]["$post"]
>["json"];

export const useVerifyOrder = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.payments["verify-payments"].$post({
        json,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },

    onError: (error) => {
      console.log(error);
      toast.error("Payment not verified");
    },
    onSuccess: () => {
      toast.success("Payment verified successfully");
    },
  });

  return mutation;
};
