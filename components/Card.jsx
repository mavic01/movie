import Image from "next/image"

const Card = ({thumbnail}) => {
    return (
        <div className="card">
            <Image height="300" width="300" src={thumbnail.url} alt={thumbnail.title} />
        </div>
    )
}

export default Card;