import { getDictionary } from "../dictionaries/dictionaries";
import Image from "next/image";
import image from "../assets/facebook.jpg";
import { cookies } from "next/headers";

export default async function Page() {
    let dict;
    if (!cookies().get("lang")?.value) {
        dict = await getDictionary("en");
    } else {
        const lang = cookies().get("lang").value;
        dict = await getDictionary(lang);
    }

    return (
        <>
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
        </>
    );
}
