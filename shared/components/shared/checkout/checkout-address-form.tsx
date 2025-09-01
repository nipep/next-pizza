"use-client";

import { FormTextarea } from "../form/form-textarea";
import { WhiteBlock } from "../white-block";
import { Controller, Form, useFormContext } from "react-hook-form";
import { FormAddressInput } from "../form/form-address-input";
import { ErrorText } from "../error-text";
interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставка" className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name="addres"
          render={({ field, fieldState }) => (
            <>
              {" "}
              <FormAddressInput onChange={field.onChange} />{" "}
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}{" "}
            </>
          )}
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
