const four_Images = ({ images }) => {
    return (
        <div className='four-images'>
            <img src={images[0] ? images[0].url : "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}></img>
            <img src={images[1] ? images[0].url : "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}></img>
            <img src={images[2] ? images[0].url : "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}></img>
            <img src={images[3] ? images[0].url : "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}></img>
        </div>
    )
}

export default four_Images
