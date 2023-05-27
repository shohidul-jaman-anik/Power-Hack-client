import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./VIdeoPlayer.css";


const VideoPlayer = () => {

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [watchedVideos, setWatchedVideos] = useState([]);
    const [message, setMessage] = useState([]);
    const [notes, setNote] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetch('videos.json')
            .then(res => res.json())
            .then(data => {
                setVideos(data);
                if (data.length > 0) {
                    setSelectedVideo(data[0]);
                }
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/allNote')
            .then(res => res.json())
            .then(data => {
                setNote(data)
                console.log(data, "noteee")
            });
    }, []);

    const handleVideoClick = (videoId, index) => {
        const selected = videos.find(video => video.id === videoId);
        setSelectedVideo(selected);
        setWatchedVideos(prevWatchedVideos => [...prevWatchedVideos, videoId]);

    };

    const watchedVideoCount = watchedVideos.length;
    const totalVideoCount = videos.length;
    const complete = watchedVideoCount / (totalVideoCount + 1) * 100


   

    const onSubmit = data => {
        console.log(data)
        const url = `http://localhost:5000/addNote`
        fetch(url, {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                reset()
                if (result) {
                    setMessage(result.message)

                }
            }
            )
    };

    return (
        <div className="videoContainer">
            <div>
                <div className='videoSection mt-8'>

                    <iframe className='videoPlayer' src={selectedVideo?.videoUrl} frameBorder="0" allowfullscreen   ></iframe>

                </div>
                <h3 className='videoTitle'>{selectedVideo?.title}</h3>
            </div>

            <div className="VideodownSection">

                {/*------------ Pill--------- */}
                <div>
                    <div class="border-b border-gray-200 dark:border-gray-700">
                        <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
                            <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-blue-600  active" id="tabs-with-icons-item-1" data-hs-tab="#tabs-with-icons-1" aria-controls="tabs-with-icons-1" role="tab">
                                Add Note
                            </button>
                            <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-12 inline-flex items-center gap-2 border-b-[3px] border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-blue-600" id="tabs-with-icons-item-2" data-hs-tab="#tabs-with-icons-2" aria-controls="tabs-with-icons-2" role="tab">

                                All Note
                            </button>
                            <button type="button" class="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-lg whitespace-nowrap text-gray-500 hover:text-blue-600" id="tabs-with-icons-item-3" data-hs-tab="#tabs-with-icons-3" aria-controls="tabs-with-icons-3" role="tab">

                                Resource
                            </button>


                        </nav>
                    </div>

                    <div class="mt-3">
                        <div id="tabs-with-icons-1" role="tabpanel" aria-labelledby="tabs-with-icons-item-1">

                            <div className='reviewContainer '>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        className='inputStyle'
                                        placeholder='Note Title'
                                        // value={user?.displayName}
                                        {...register("title", { required: true, maxLength: 20 })}
                                    /> <br />


                                    <textarea
                                        className='textarea'
                                        placeholder='Enter Your Note'

                                        {...register("description",
                                            {
                                                maxLength: 250, required: {
                                                    value: true,
                                                    message: "Description is required"
                                                },
                                            })}
                                    /><br />
                                    <label className="label">
                                        {errors.description?.type === 'required' && <span className="label-text-alt text-danger">{errors.description.message}</span>}
                                    </label>

                                    <p className="text-green-500 mb-6">{message}</p>

                                    <input
                                        className='addComment'
                                        type="submit"
                                        value="Add Review"
                                    />

                                </form>
                            </div>
                        </div>


                        <div id="tabs-with-icons-2" class="hidden" role="tabpanel" aria-labelledby="tabs-with-icons-item-2">


                            {/* {
                                notes?.map((note, index) => {

                                    <div key={index}>
                                        <p>{note?.title}</p>
                                        <p>{note?.description}</p>
                                    </div>

                                })
                            } */}


                        </div>
                        <div id="tabs-with-icons-3" class="hidden resource" role="tabpanel" aria-labelledby="tabs-with-icons-item-3"
                        >

                            <div>
                                <h3>GitHub Repository</h3>
                                <p class="text-gray-500 dark:text-gray-400">
                                    GitHub: https://github.com/shohidul-jaman-anik
                                </p>
                            </div>
                            <div>
                                <h3>Leson Related Importent Link</h3>
                                <p class="text-gray-500 dark:text-gray-400">
                                    w3school : https://www.w3schools.com/REACT/DEFAULT.ASP
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/*---------------- Accrodion------------ */}


                <div class="hs-accordion-group">
                    <div class="hs-accordion active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                        <button class="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                            <span className="text-2xl">Module-1</span>

                            <ProgressBar
                                completed={watchedVideoCount / totalVideoCount * 100}
                                bgColor="#6D67E4"
                                className='mal'
                                baseBgColor="rgb(191, 191, 255)"
                                height="15px"
                                width='250px'
                                labelColor="#ffffff"
                                labelSize="10px"
                                animateOnRender
                                maxCompleted={100}
                                customLabel={`${watchedVideoCount / totalVideoCount * 100}%`}
                            />
                            <svg class="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                            <svg class="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </button>
                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                            {
                                videos.map(video => (
                                    <div
                                        className={`eatchVideo ${watchedVideos.includes(video.id) ? '' : 'disabled'}`}
                                        onClick={() => handleVideoClick(video.id)}
                                    >
                                        {video.title}
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default VideoPlayer;