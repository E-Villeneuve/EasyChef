import './unauthorized.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';

function Unauthorized() {
    return (
        <AnimatePage>
            <Container id='unauth_container'>
                <h1 id='unauth_title'>You aren't allowed to view this page</h1>
                <h4 id='unauth_subtitle'>Sign in for authorization!</h4>
            </Container>
        </AnimatePage>
    );
}

export default Unauthorized;