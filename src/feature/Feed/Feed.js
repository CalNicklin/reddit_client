import Post from "../../components/post/post";
import Flair from "../../components/flair/Flair";
import useFetchPost from "../../hooks/useFetchPost";
import { useSubreddit } from "../../context/subreddits";
import { useFlair } from "../../context/flairs";
import { useEffect } from "react";

const Feed = () => {

    const { subreddit } = useSubreddit();
    const { isError, response, fetchPost } = useFetchPost(subreddit);

    useEffect(() => {
        fetchPost(subreddit)
    }, [subreddit, fetchPost]);

    // generates an array of flairs
    const allFlairs = response.map(post => post.data.link_flair_text).filter(flair => flair !== null);
    const uniqueFlairs = [...new Set(allFlairs)];

    const { flair, chooseFlair, resetFlair } = useFlair();

    const filteredResponse = response.filter(post => post.data.link_flair_text === flair);

    useEffect(() => {
        chooseFlair('')
    }, [subreddit]);

    return (
        <div className='feed'>
            <main>
                {response && !isError && (
                    (flair === '' ? response : filteredResponse).map((post, index) => (
                    <div className='post' key={index}>
                        <Post
                            post={post.data}
                        />
                    </div>
                ))
                )}
            {isError && <div className="post">Something went wrong</div>}
            </main>

            {uniqueFlairs.length > 0 && (
            <div className="flairContainer">
                {uniqueFlairs.map((flair, index) => (
                    <Flair flair={flair} key={index} />
                ))}
                <button onClick={resetFlair}>Clear Flairs</button>
            </div>
            )}
        </div>
    )
};

export default Feed;

