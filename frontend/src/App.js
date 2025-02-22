import "./App.css";
import YearSelector from "./components/reusable/YearSelector";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <YearSelector yearOptions={["2014", "2025"]} />
        <p>
          Edit <code>src/App.js</code> and save to reload. hehe
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
