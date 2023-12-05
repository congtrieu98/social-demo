
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
      <p>
        {name} vừa đăng bài post mới!
      </p>
      {/* <img src={p.image || ''} alt={p.title} /> */}
      <div>{p.title}</div>
      <div>{p.content}</div>
      <hr />
      <p>Sent with help from Resend and Kirimase 😊</p>
    </div>
  );
};
