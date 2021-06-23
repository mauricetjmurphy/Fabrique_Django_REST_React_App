import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div>
            <Header />
            <Container>
                <h1 className="text-center">
                    Hello world, welcome to the Fabrique app!
                </h1>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
