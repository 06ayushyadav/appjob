


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SkillDetail() {
    const { id } = useParams();
    const [skill, setSkill] = useState(null);

    useEffect(() => {
        const fetchSkill = async () => {
            try {
                const response = await fetch(`https://appjob-o3ho.onrender.com/api/upload-skill/${id}`);
                const data = await response.json();
                if (data.success) {
                    setSkill(data.skill);
                } else {
                    console.error("Failed to fetch skill");
                }
            } catch (error) {
                console.error("Error fetching skill:", error);
            }
        };

        fetchSkill();
    }, [id]);

    if (!skill) {
        return <p className="text-center mt-10 text-gray-600">Loading skill details...</p>;
    }


    const convertToEmbedURL = (url) => {
        if (!url) return "";

        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]{11})/;
        const match = url.match(regex);

        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }

        return "";
    };

    return (
        <>

            <div className="flex flex-col items-center justify-center mt-10">
                <h1 className="text-xl sm:text-xl md:text-3xl font-bold mb-5">Course Details</h1>
                <div className="border p-5 mb-5 w-[95%] sm:w-[95%] md:w-3/4 bg-white rounded-lg shadow-md space-y-3">
                    <h2 ><strong className="text-base sm:text-lg md:text-xl  " >Course Title :  </strong> <span className="mt-2 text-gray-950 text-base sm:text-lg md:text-xl font-semibold" >{skill.skilltitle}</span> </h2>
                    <p><strong className="text-base sm:text-base md:text-lg" > Course Description : </strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{skill.skilldescription}</span></p>
                    <p>
                        <strong className="ttext-base sm:text-base md:text-lg">Full Video of Course :</strong>
                        <div className="mt-2">
                            <iframe
                                className="w-full max-w-2xl h-80 rounded-lg shadow-md"
                                src={convertToEmbedURL(skill.skillvideo)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >video</iframe>
                        </div>
                    </p>


                </div>
            </div>
        </>
    );
}

export default SkillDetail;



