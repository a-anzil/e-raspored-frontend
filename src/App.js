import "./App.css";
import { Subscription } from "./components/Subscription";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <b>Raspored Sati</b>
            </header>

            <div className="App-body">
                <Subscription/>
            </div>

            <footer className="App-footer">
                <p>🐧 mirko.</p>
            </footer>
        </div>
    );
}

export default App;
