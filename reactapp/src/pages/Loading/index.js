import './loading.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';

function Loading() {
    return (
        <AnimatePage>
            <Container id='loading_container'>
            <p>
                <h1 id='loading_title'>Loading...</h1>
                <h4 id='loading_subtitle'>Please wait</h4>
            </p>
            </Container>
        </AnimatePage>
    );
}

export default Loading;