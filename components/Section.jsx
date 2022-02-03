import Card from "./Card"

const Section = ({genre, videos}) => {
    // console.log(videos)

    return (
        <div className="section">
            <h3>{genre}</h3>
            <div>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <Card thumbnail={video.thumbnail} />
                    </a> //href from video slug direc. localhost:3000/video/slug..
                ))}
            </div>
        </div>
    )
}

export default Section 