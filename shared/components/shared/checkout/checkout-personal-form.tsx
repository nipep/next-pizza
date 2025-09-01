"use-client";

import { WhiteBlock } from "../white-block";
import { FormInput } from "../form/forrm-input";

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональная информация" className={className}>
      <div className="grid md:grid-cols-2 grid-cols-1 sm:gap-5 gap-2">
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput
          name="phone"
          className="text-base"
          placeholder="Телефон"
          mask="+{7} (000) 000-00-00"
        />
      </div>
    </WhiteBlock>
  );
};
