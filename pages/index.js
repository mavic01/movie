import { gql, GraphQLClient } from "graphql-request"
import Section from "../components/Section"
import Navbar from "../components/Navbar"
import Link from "next/link"
import Image from "next/image"
import classicLogo from "../public/img/classic.png"
import dramaLogo from "../public/img/drama.png"
import thrillerLogo from "../public/img/thriller.png"
import crimeLogo from "../public/img/crime.png"
import romanceLogo from "../public/img/romance.png"

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization" : process.env.GRAPH_CMS_TOKEN
    }
  })
const videosQuery = gql`
query {
  videos {
  createdAt,
  id,
  title,
  description,
  seen,
  slug,
  tags,
  thumbnail{
    url
  },
  mp4 {
    url
  }
  }
}
`
const accountQuery = gql`
query {
  account(where: {id: "ckz430amg55400c132lrvq6o3"}){
    username,
    avatar {
      url
    }
  }
}
`

const videoData = await graphQLClient.request(videosQuery) //see docs
const videos = videoData.videos

const accountData = await graphQLClient.request(accountQuery)
const account = accountData.account

return {
  props: {
    videos,
    account
  }
}
}

const Home = ({videos, account}) => {
  // console.log(videos);
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre)) //.includes the genre passed in
  }

  const unseenVideos = (videos) => {
    return videos.filter((video) => video.seen == false || video.seen === null) //if d video is seen equals false or video.seen = null.. it wil basically return the ones not seen yet
  }

  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video" style={{objectFit: "cover"}}>
          {/* <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} /> */}
          <Image className="main-video-img" height="820" width="1332" src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} />
        </div>
        {/* <div className="video-feed">
          <Link passHref href="#romance"><div className="franchise" id="romance">ROMANCE</div></Link>
          <Link passHref href="#thriller"><div className="franchise" id="thriller">THRILLER</div></Link>
          <Link passHref href="#drama"><div className="franchise" id="drama">DRAMA</div></Link>
          <Link passHref href="#classic"><div className="franchise" id="classic">CLASSIC</div></Link>
          <Link passHref href="#crime"><div className="franchise" id="crime">CRIME</div></Link>
        </div> */}
        <div className="home-card">
          <div className="home-card-child">
            <h3>Recommended For You</h3>
            <Section className="unseen" videos={unseenVideos(videos)}/> 
          </div>
          <div className="home-card-child">
            <h3>Family</h3>
            <Section className="family" videos={filterVideos(videos, "family")}/>
          </div>
          <div className="home-card-child">
            <h3>Romance</h3>
            <Section className="romance" videos={filterVideos(videos, "romance")}/>
          </div>
          <div className="home-card-child">
            <h3>Thriller</h3>
            <Section className="thriller" videos={filterVideos(videos, "thriller")}/>
          </div>
          <div className="home-card-child">
            <h3>Horror</h3>
            <Section className="horror" videos={filterVideos(videos, "horror")}/>
          </div>
          <div className="home-card-child">
            <h3>Comedy</h3>
            <Section className="comedy" videos={filterVideos(videos, "comedy")}/>
          </div>
          <div className="home-card-child">
            <h3>Drama</h3>
            <Section className="drama" videos={filterVideos(videos, "drama")}/>
          </div>
          <div className="home-card-child">
            <h3>Classic</h3>
            <Section className="classic" videos={filterVideos(videos, "classic")}/>
          </div>
          <div className="home-card-child">
            <h3>Crime</h3>
            <Section className="crime" videos={filterVideos(videos, "crime")}/>
          </div>
           
        </div>
      </div>
    </>
  ) 
}

export default Home
