import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.payments)["create-order"]["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.payments)["create-order"]["$post"]
>["json"];

export const useCreateOrder = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.payments["create-order"].$post({
        json,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return await response.json();
    },

    onError: (error) => {
      console.log(error);
      toast.error("Error creating order");
    },
    onSuccess: (response) => {
      toast.success("Order created successfully");
    },
  });

  return mutation;
};
