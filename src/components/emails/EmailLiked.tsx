
import * as React from "react";

interface EmailLike {
    name: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export const EmailLiked: React.FC<Readonly<EmailLike>> = ({
    name,
    user: u,
}) => {
    return (
        <div>
            <p>
                {name} vừa like bài viết của bạn!
            </p>
            <div>{u.email}</div>
            <hr />
            <p>Sent with help from Resend and Kirimase 😊</p>
        </div>
    );
};
