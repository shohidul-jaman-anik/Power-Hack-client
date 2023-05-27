import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from 'react';
import "./VIdeoPlayer.css";


const VideoPlayer = () => {

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [watchedVideos, setWatchedVideos] = useState([]);


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

    const handleVideoClick = (videoId, index) => {
        const selected = videos.find(video => video.id === videoId);
        setSelectedVideo(selected);
        setWatchedVideos(prevWatchedVideos => [...prevWatchedVideos, videoId]);
        
    };

    const watchedVideoCount = watchedVideos.length;
    const totalVideoCount = videos.length;
    const complete=watchedVideoCount / (totalVideoCount+1) * 100

    return (
        <div>
            <div>
                <div className='videoSection mt-8'>
                    {/* {
                        selectedVideoWatched ? (<iframe className='videoPlayer' src={selectedVideo?.videoUrl} frameBorder="0" allowfullscreen   ></iframe>) : (<div>
                            Please watch the current video before proceeding to the next one.
                        </div>)
                    } */}
                    <iframe className='videoPlayer' src={selectedVideo?.videoUrl} frameBorder="0" allowfullscreen   ></iframe>

                </div>
                <h3 className='videoTitle'>{selectedVideo?.title}</h3>
            </div>

            <div>

                <div class="max-w-screen-xl mx-auto bg-white min-h-sceen">
                    <div class="flex flex-col items-center">
                        <h2 class="font-bold text-5xl mt-5 tracking-tight">
                            FAQ
                        </h2>
                        <p class="text-neutral-500 text-xl mt-3">
                            Frequenty asked questions
                        </p>
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
                            customLabel={ `${watchedVideoCount / totalVideoCount * 100}%`}
                        />
                    </div>

                    <div class="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                        <div class="py-5">
                            <details class="group">
                                <summary class="flex justify-between items-center font-medium cursor-pointer list-none"

                                >
                                    <span >Module-1</span>
                                    <span class="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </summary>

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



                            </details>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default VideoPlayer;