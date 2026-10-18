import Carousel from 'react-bootstrap/Carousel';
import './viewimagecarousel.css';
import noimage from '../../images/noimageavailable.png'

function DisplayImageCarousel(props) {
  let files = props.items;
  const imageUrls = files ? Object.values(files) : [];
  return (
    <Carousel className='mediacarousel' fade>
      {imageUrls.length > 0 && imageUrls.map((url, index) => (
        <Carousel.Item key={index}>
          <img
            src={`http://127.0.0.1:8000${url}`}
            alt={`Recipe image ${index + 1}`}
            className='mediaincarousel'
          />
        </Carousel.Item>
      ))}
      {imageUrls.length === 0 &&
        <Carousel.Item>
          <img
            src={noimage}
            alt="No Image Found"
            className='mediaincarousel'
          />
        </Carousel.Item>
      }
    </Carousel>
  );
}

export default DisplayImageCarousel;
