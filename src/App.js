import logo from "./logo.svg";
import "./App.css";
import { Subscription } from "./components/Subscription";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    {"gaming"}
                </p>
                <Subscription/>
            </header>
        </div>
    );
}

export default App;
