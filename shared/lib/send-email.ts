import { Resend } from "resend";
import { PayOrderTemplate } from "../components/shared/shared-templates/pay-order-template";
import { ReactNode } from "react";

export const sendEmail = async (
  to: string,
  subject: string,
  template: ReactNode
) => {
  const resend = new Resend(process.env.RESEND_API);

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};
