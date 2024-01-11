import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import "@/sass/profile.scss";
import React from "react";
import { redirect } from "next/navigation";
import Logout from "@/app/components/Logout";

async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/auth");
    }
    return (
        <>
            <div className="main profile-page">
                <div className="profile-main">
                    <div className="user">
                        <img
                            alt="avatar"
                            width="100%"
                            height="100%"
                            className="img"
                            src={session.user.image}
                        />
                        <div className="info">
                            <div className="name-user">{session.user.name}</div>
                            <div className="email-user">
                                {session.user.email}
                            </div>
                        </div>
                    </div>

                    <div className="action">
                        <Logout />
                    </div>

                    <div className="post-watched">
                        <h2 className="heading">Bài viết đã xem</h2>
                        <div className="post-info">
                            :{"("} Bạn chưa xem bài viết nào
                        </div>
                    </div>
                    <div className="cmt-watched">
                        <h2 className="heading">Comment đã viết</h2>
                        <div className="cmt-info">
                            :{"("} Bạn chưa xem bài viết nào
                        </div>
                    </div>

                    <div className="span">© 2024 Khang portfolio</div>
                    <div className="desc">
                        My name is Thanh Khang, this is my portfolio.
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
