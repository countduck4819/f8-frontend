"use client";
import React, { memo, useEffect, useRef, useState } from "react";

function About() {
    const videoRef = useRef();
    const [vid, setVid] = useState(false);
    useEffect(() => {
        videoRef.current.addEventListener("click", (e) => {
            if (vid) {
                e.target.pause();
                setVid(false);
            } else {
                e.target.play();
                setVid(true);
            }
        });
    });
    return (
        <section className="about">
            <div className="intro">
                <div ref={videoRef} className="video-desc">
                    <div className="box-video"></div>
                    <video
                        autoPlay={false}
                        loop={true}
                        muted={false}
                        src={require("@/video/intro-video.mp4")}
                    ></video>
                </div>
                <div className="info-desc">
                    <h1 className="heading">Welcome to our site</h1>
                    <div className="desc">
                        At Mindmap Flow, we believe that mind mapping can change
                        the way you work. Mind maps provide a more intuitive way
                        to brainstorm, ideate, organize and manage your work. We
                        are passionate about mind mapping and want to share it
                        with you. Mind mapping is a powerful yet simple method
                        for developing ideas and diving into a more creative
                        workflow. Join the millions of business leaders,
                        teachers, students, and creatives that know how mind
                        mapping can add value to your workflow. Whether you are
                        creating a simple to-do list, brainstorming a marketing
                        plan, or building a robust knowledge map for your
                        business, learning the ins and outs of mind mapping can
                        help you to achieve your goals. We’re excited to share
                        our knowledge with you and see what you create for your
                        own business and community. So, whether you are a
                        teacher, student, or business professional, welcome to
                        the world of mind mapping!
                    </div>
                </div>
            </div>

            <div className="learn-more text-center">
                <button className="btn-more">Learn more</button>
            </div>
        </section>
    );
}

export default memo(About);
