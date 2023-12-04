
import * as React from "react";

interface EmailPost {
  name: string;
  post: {
    id: number;
    title: string;
    slug: string;
    userId: string;
    content?: string | null;
  };
}

export const EmailPost: React.FC<Readonly<EmailPost>> = ({
  name,
  post: p,
}) => {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <p>
        {name} vừa đăng bài post mới!
      </p>
      {/* <img src={p.image || ''} alt={p.title} /> */}
      <hr />
      <p>Sent with help from Resend and Kirimase 😊</p>
    </div>
  );
};
