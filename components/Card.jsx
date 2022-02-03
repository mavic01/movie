import Image from "next/image"

const Card = ({thumbnail}) => {
    return (
        <>
            <Image height="190" width="190" className="card" src={thumbnail.url} alt={thumbnail.title} />
        </>
    )
}

export default Card;