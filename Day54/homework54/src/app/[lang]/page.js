import { getDictionary } from "./dictionaries";
import Image from "next/image";
import image from "../assets/facebook.jpg";
import icons from "./../assets/icons";
import { cookies } from "next/headers";
import Home from "../components/Home";
import Language from "../components/Language";
import { notFound } from "next/navigation";
import DarkLight from "../components/DarkLight";
export default async function Page({ params }) {
    const { lang } = params;
    let dict;
    if (!params.lang) {
        dict = await getDictionary("en");
    } else {
        if (params.lang === "en") {
            dict = await getDictionary("en");
        } else if (params.lang === "vi") {
            dict = await getDictionary("vi");
        } else {
            notFound();
        }
    } // en

    return (
        <div className="theme">
            <header className="header">
                <div className="header-left">
                    <div className="logo">
                        <Image
                            src={image}
                            alt="facebook"
                            width="40"
                            height="40"
                        />
                    </div>
                    <div className="name-user">Khang Vũ</div>
                    <Home />
                </div>
                <div className="header-right">
                    <ul className="list-page">
                        <li>
                            <a href="">
                                <Image
                                    src={icons?.github}
                                    width={24}
                                    height={24}
                                    alt="icon"
                                    style={{ color: "#bbb" }}
                                ></Image>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <svg
                                    fill="none"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    className="text-default-500"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    ></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            clip-rule="evenodd"
                                            d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                                            fill="currentColor"
                                            fill-rule="evenodd"
                                        ></path>
                                    </g>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <svg
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    class="text-default-500"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M9.49614 7.13176C9.18664 6.9549 8.80639 6.95617 8.49807 7.13509C8.18976 7.31401 8 7.64353 8 8V16C8 16.3565 8.18976 16.686 8.49807 16.8649C8.80639 17.0438 9.18664 17.0451 9.49614 16.8682L16.4961 12.8682C16.8077 12.6902 17 12.3589 17 12C17 11.6411 16.8077 11.3098 16.4961 11.1318L9.49614 7.13176ZM13.9844 12L10 14.2768V9.72318L13.9844 12Z"
                                        fill="currentColor"
                                    ></path>
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 12C0 8.25027 0 6.3754 0.954915 5.06107C1.26331 4.6366 1.6366 4.26331 2.06107 3.95491C3.3754 3 5.25027 3 9 3H15C18.7497 3 20.6246 3 21.9389 3.95491C22.3634 4.26331 22.7367 4.6366 23.0451 5.06107C24 6.3754 24 8.25027 24 12C24 15.7497 24 17.6246 23.0451 18.9389C22.7367 19.3634 22.3634 19.7367 21.9389 20.0451C20.6246 21 18.7497 21 15 21H9C5.25027 21 3.3754 21 2.06107 20.0451C1.6366 19.7367 1.26331 19.3634 0.954915 18.9389C0 17.6246 0 15.7497 0 12ZM9 5H15C16.9194 5 18.1983 5.00275 19.1673 5.10773C20.0989 5.20866 20.504 5.38448 20.7634 5.57295C21.018 5.75799 21.242 5.98196 21.4271 6.23664C21.6155 6.49605 21.7913 6.90113 21.8923 7.83269C21.9973 8.80167 22 10.0806 22 12C22 13.9194 21.9973 15.1983 21.8923 16.1673C21.7913 17.0989 21.6155 17.504 21.4271 17.7634C21.242 18.018 21.018 18.242 20.7634 18.4271C20.504 18.6155 20.0989 18.7913 19.1673 18.8923C18.1983 18.9973 16.9194 19 15 19H9C7.08058 19 5.80167 18.9973 4.83269 18.8923C3.90113 18.7913 3.49605 18.6155 3.23664 18.4271C2.98196 18.242 2.75799 18.018 2.57295 17.7634C2.38448 17.504 2.20866 17.0989 2.10773 16.1673C2.00275 15.1983 2 13.9194 2 12C2 10.0806 2.00275 8.80167 2.10773 7.83269C2.20866 6.90113 2.38448 6.49605 2.57295 6.23664C2.75799 5.98196 2.98196 5.75799 3.23664 5.57295C3.49605 5.38448 3.90113 5.20866 4.83269 5.10773C5.80167 5.00275 7.08058 5 9 5Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                    <DarkLight></DarkLight>
                    <Language>{params}</Language>
                </div>
            </header>
            <main className="main">
                <h1 className="heading">{dict?.main?.heading}</h1>
                <div className="container">
                    <div className="my-skill">
                        <div className="image">
                            <div className="img-2"></div>
                            <div className="img">
                                <Image
                                    src={image}
                                    alt="facebook"
                                    width="300"
                                    height="300"
                                />
                            </div>
                            <div class="desc">{dict?.main?.my_skill_desc}</div>
                        </div>
                        <div className="content-skill">
                            <div className="skills">
                                <h2>{dict?.main?.skills?.heading}</h2>
                                <div className="skill">
                                    <div className="desc">
                                        {dict?.main?.skills?.skill_1?.desc}
                                    </div>
                                    <span>
                                        {dict?.main?.skills?.skill_1?.span}
                                    </span>
                                </div>
                                <div className="skill">
                                    <div className="desc">
                                        {dict?.main?.skills?.skill_2?.desc}
                                    </div>
                                    <span>
                                        {dict?.main?.skills?.skill_2?.span}
                                    </span>
                                </div>
                            </div>
                            <div className="histories">
                                <div className="topic">
                                    <h2>{dict.main.histories.heading}</h2>
                                </div>
                                <div className="times">
                                    <div className="time">
                                        <div className="year">
                                            {dict.main.histories.times[0].year}{" "}
                                        </div>
                                        <span>
                                            {dict.main.histories.times[0].span}
                                        </span>
                                    </div>
                                    <div className="time">
                                        <div className="year">
                                            {dict.main.histories.times[1].year}{" "}
                                        </div>
                                        <span>
                                            {dict.main.histories.times[1].span}
                                        </span>
                                    </div>
                                    <div className="time">
                                        <div className="year">
                                            {dict.main.histories.times[2].year}{" "}
                                        </div>
                                        <span>
                                            {dict.main.histories.times[2].span}
                                        </span>
                                    </div>
                                    <div className="time">
                                        <div className="year">
                                            {dict.main.histories.times[3].year}{" "}
                                        </div>
                                        <span>
                                            {dict.main.histories.times[3].span}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="social sub-content">
                            <h2>{dict.main.content.social}</h2>
                            <div className="items">
                                <div className="phone">
                                    <span>Phone: </span>
                                    <a href="tel: 0395815099">0395815099</a>
                                </div>
                                <div className="zalo">
                                    <span>Zalo: </span>
                                    <a href="#!">https://zalo.me</a>
                                </div>
                                <div className="email">
                                    <span>Email: </span>
                                    <a href="mailto: 17loiten@gmail.com">
                                        17loiten@gmail.com
                                    </a>
                                </div>
                                <div className="facebook">
                                    <span>Facebook: </span>
                                    <a href="#!">
                                        https://www.facebook.com/groups/f8official
                                    </a>
                                </div>
                                <div className="phone">
                                    <span>Youtube:</span>
                                    <a href="">youtube</a>
                                </div>
                            </div>
                        </div>

                        <div className="self-projects sub-content">
                            <h2 className="heading">
                                {dict.main.content.self_projects.heading}
                            </h2>
                            <div className="project">
                                <h3 className="heading">
                                    {
                                        dict.main.content.self_projects
                                            .projects[0].heading
                                    }
                                </h3>
                                <div className="desc">
                                    {
                                        dict.main.content.self_projects
                                            .projects[0].desc[0]
                                    }
                                </div>
                                <div className="desc">
                                    {
                                        dict.main.content.self_projects
                                            .projects[0].desc[1]
                                    }
                                </div>
                                <div className="action">
                                    <div className="demo">
                                        <span>jkfsa</span>
                                        <a href="">Demo</a>
                                    </div>
                                    <div className="code">
                                        <span>fdasjk</span>
                                        <a href="">Code</a>
                                    </div>
                                </div>
                            </div>

                            <div className="project">
                                <h3 className="heading">
                                    {
                                        dict.main.content.self_projects
                                            .projects[1].heading
                                    }
                                </h3>
                                <div className="desc">
                                    {
                                        dict.main.content.self_projects
                                            .projects[1].desc[0]
                                    }
                                </div>
                                <div className="desc">
                                    {
                                        dict.main.content.self_projects
                                            .projects[1].desc[1]
                                    }
                                </div>
                                <div className="action">
                                    <div className="demo">
                                        <span>jkfsa</span>
                                        <a href="">Demo</a>
                                    </div>
                                    <div className="code">
                                        <span>fdasjk</span>
                                        <a href="">Code</a>
                                    </div>
                                </div>
                            </div>

                            <div className="project">
                                <h3 className="heading">
                                    {
                                        dict.main.content.self_projects
                                            .projects[2].heading
                                    }
                                </h3>
                                <div className="desc">
                                    {
                                        dict.main.content.self_projects
                                            .projects[2].desc[0]
                                    }
                                </div>
                                <div className="desc">
                                    {
                                        dict.main.content.self_projects
                                            .projects[2].desc[1]
                                    }
                                </div>
                                <div className="action">
                                    <div className="demo">
                                        <span>jkfsa</span>
                                        <a href="">Demo</a>
                                    </div>
                                    <div className="code">
                                        <span>fdasjk</span>
                                        <a href="">Code</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="github">
                            <a href=""></a>
                        </div>

                        <div className="my-hobbies sub-content">
                            <h2>{dict.main.content.my_hobbies.heading}</h2>
                            <ul>
                                <li>
                                    {dict.main.content.my_hobbies.list_item[0]}
                                </li>
                                <li>
                                    {dict.main.content.my_hobbies.list_item[1]}
                                </li>
                                <li>
                                    {dict.main.content.my_hobbies.list_item[2]}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div>© 2023 The Example Name. All rights reserved.</div>
                </div>
            </main>
        </div>
    );
}
