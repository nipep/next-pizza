"use client";

import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const FormAddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token={'aa3e750c1c3f647573a375e2993309d4ae1f481b'}
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
