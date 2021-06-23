import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Homepage from "./pages/products-page/ProductsPage";

function App() {
    return (
        <div>
            <Header />
            <main>
                <Container>
                    <h1 className="text-center p-5">
                        Hello world, welcome to the Fabrique app!
                    </h1>
                    <Homepage />
                </Container>
            </main>
            <Footer />
        </div>
    );
}

export default App;
