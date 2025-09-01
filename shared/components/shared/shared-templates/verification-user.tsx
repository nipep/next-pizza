interface Props {
  code: string;
}

export const VerificationUser: React.FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      Подтвердите регистрацию по
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>ссылке</a>.
    </p>
  </div>
);
