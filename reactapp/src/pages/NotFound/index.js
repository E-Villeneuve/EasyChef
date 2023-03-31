import './not_found.css';
import Container from 'react-bootstrap/Container';

function NotFound() {
    return (
        <Container id='not_found_container'>
        <p>
            <h1 id='not_found_title'>Page not found!</h1>
            <h4 id='not_found_subtitle'>Hmmm... Maybe try another page?</h4>
        </p>
        </Container>
    );
}

export default NotFound;