import "./App.css";
import { Subscription } from "./components/Subscription";
import { useSearchParams } from "react-router-dom";
import { LoginButton } from "./components/LoginButton";

function App() {
    const [searchParams] = useSearchParams();
    let key = searchParams.get("key");
    console.log(searchParams);
    if (key) {
        localStorage.setItem("key", key);
        window.history.pushState(null, "", "/");
    } else {
        key = localStorage.getItem("key");
    }

    return (
        <div className="App">
            <header className="App-header">
                <b>Raspored Sati</b>
            </header>

            <div className="App-body">
                {key ? <Subscription/> : <LoginButton/>}
            </div>

            <footer className="App-footer">
                <p>🐧 mirko.</p>
            </footer>
        </div>
    );
}

export default App;
