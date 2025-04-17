import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InternDetail() {
    const { id } = useParams();
    const [intern, setIntern] = useState(null);

    useEffect(() => {
        const fetchInternship = async () => {
            try {
                const response = await fetch(`https://appjob-o3ho.onrender.com/api/upload-internship/${id}`);
                const data = await response.json();
                if (data.success) {
                    setIntern(data.intern);
                } else {
                    console.error("Failed to fetch intern");
                }
            } catch (error) {
                console.error("Error fetching intern:", error);
            }
        };

        fetchInternship();
    }, [id]);

    if (!intern) {
        return <p className="text-center mt-10 text-gray-600">Loading intern details...</p>;
    }


    const convertToEmbedURL = (url) => {
        if (!url) return "";

        // Match both youtube.com and youtu.be links
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
                <h1 className="text-xl sm:text-xl md:text-3xl font-bold mb-5">Internship Details</h1>
                <div className="border p-5 mb-5 w-[95%] sm:w-[95%] md:w-3/4 bg-white rounded-lg shadow-md space-y-3">
                    <h2 ><strong className="text-base sm:text-lg md:text-xl  " >Internship Title :  </strong> <span className="mt-2 text-gray-950 text-base sm:text-lg md:text-xl font-semibold" >{intern.interntitle}</span> </h2>
                    <p><strong className="text-base sm:text-base md:text-lg  " > Internship Skills : </strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.internskill}</span></p>
                    <p><strong className="text-base sm:text-base md:text-lg  " >Internship Salary : </strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.internsalary}</span></p>
                    <p><strong className="text-base sm:text-base md:text-lg  " >Internship Role : </strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.internrole}</span></p>
                    <p><strong className="text-base sm:text-base md:text-lg  " >Internship Type : </strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.interntype}</span></p>
                    <p><strong className="text-base sm:text-base md:text-lg  " >Organization Name :</strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.internorganization}</span></p>
                    <p><strong className="text-base sm:text-base md:text-lg  " >Internship Location :</strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.internlocation}</span></p>
                    <p><strong className="text-base sm:text-base md:text-lg  " >Last Date to Apply :</strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.internlastdate}</span></p>
                    <div>
                        <p><strong className="text-base sm:text-base md:text-lg  ">Internship Description : </strong> <span className="mt-2 text-gray-900 text-base sm:text-base md:text-lg">{intern.interndescription}</span></p>
                        <p><strong className="text-base sm:text-base md:text-lg  " > Fill Form : </strong><a href={intern.internform} target="_blank" rel="noreferrer" className="text-blue-500 underline text-xl ">Apply Now</a></p>

                        <p>
                            <strong className="text-base sm:text-base md:text-lg">Video link for Form Filling:</strong>
                            <div className="mt-2">
                                <iframe
                                    className="w-full max-w-2xl h-80 rounded-lg shadow-md"
                                    src={convertToEmbedURL(intern.internvideo)}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                >video</iframe>
                            </div>
                        </p>


                    </div>


                </div>
            </div>
        </>
    );
}

export default InternDetail;