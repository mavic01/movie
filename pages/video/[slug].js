import { gql, GraphQLClient } from "graphql-request"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export const getServerSideProps = async (pageContext) => {
    const url = process.env.ENDPOINT
    
    const graphQLClient = new GraphQLClient(url, {
        headers: {
          "Authorization" : process.env.GRAPH_CMS_TOKEN
        }
    })

    const pageSlug = pageContext.query.slug

    const query = gql`
    query ($pageSlug: String!) {
        video (where: {
          slug: $pageSlug
        }){
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

    const variables = {
        pageSlug,
    }

    const data = await graphQLClient.request(query, variables)
    const video = data.video //data.video.. see GQl query web

    return {
        props: {
            video
        }
    }
}

const changeToSeen = async (slug) => {
  await fetch("/api/changeToSeen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ slug })
  })
}

const Video = ({video}) => {
  const [watching, setWatching] = useState(false)
    return (
        <div style={{height: "100vh"}}>
          {!watching && <Image height="900" width="1500" className="video-img" src={video.thumbnail.url} alt={video.title} />}
          {!watching && <div className="info">
            <p className="desc">{video.tags.join(", ")}</p>
            <p className="desc">{video.description}</p>
            <button 
              className="video-overlay"
              onClick={() => {
                changeToSeen(video.slug)
                watching ? setWatching(false) : setWatching(true)
              }}
            >PLAY
            </button>
            <Link href="/" passHref>Back</Link>
          </div>}
          {watching && (
            <video width="100%" height="100%" controls>
              <source src={video.mp4.url} type="video/mp4" />
            </video>
          )}
            {watching && <button className="footer-back" onClick={() => watching ? setWatching(false) : null} >Back</button>}
        </div>
    )
}

export default Video