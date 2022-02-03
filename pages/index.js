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
          <img src={randomVideo(videos).thumbnail.url} alt={randomVideo(videos).title} />
        </div>

        <div className="video-feed">
          <Link passHref href="#romance"><div className="franchise" id="romance"><Image src={romanceLogo}/></div></Link>
          <Link passHref href="#thriller"><div className="franchise" id="thriller"><Image src={thrillerLogo}/></div></Link>
          <Link passHref href="#drama"><div className="franchise" id="drama"><Image src={dramaLogo}/></div></Link>
          <Link passHref href="#classic"><div className="franchise" id="classic"><Image src={classicLogo}/></div></Link>
          <Link passHref href="#crime"><div className="franchise" id="crime"><Image src={crimeLogo}/></div></Link>
        </div>
          <Section genre={"Recommended For You"} videos={unseenVideos(videos)}/> 
          <Section genre={"Family"} videos={filterVideos(videos, "family")}/>
          <Section id="romance" genre={"Romance"} videos={filterVideos(videos, "romance")}/>
          <Section id="thriller" genre={"Thriller"} videos={filterVideos(videos, "thriller")}/>
          <Section genre={"Horror"} videos={filterVideos(videos, "horror")}/>
          <Section genre={"Comedy"} videos={filterVideos(videos, "comedy")}/>
          <Section id="drama" genre={"Drama"} videos={filterVideos(videos, "drama")}/>
          <Section id="classic" genre={"Classic"} videos={filterVideos(videos, "classic")}/>
          <Section id="crime" genre={"Crime"} videos={filterVideos(videos, "crime")}/>
        
      </div>
    </>
  ) 
}

export default Home
