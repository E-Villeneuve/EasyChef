import './not_found.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';

function NotFound() {
    return (
        <AnimatePage>
            <Container id='not_found_container'>
            <p>
                <h1 id='not_found_title'>Page not found!</h1>
                <h4 id='not_found_subtitle'>Hmmm... Maybe try another page?</h4>
            </p>
            </Container>
        </AnimatePage>
    );
}

export default NotFound;