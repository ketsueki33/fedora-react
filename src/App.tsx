import "./App.css";
import TopBar from "./components/TopBar/TopBar";
import useBaseStore from "./store";

function App() {
    const wallpaper = useBaseStore((state) => state.wallpaper);

    return (
        <>
            <main
                className="min-w-full h-screen bg-center bg-cover bg-no-repeat relative"
                style={{ backgroundImage: `url(${wallpaper})` }}
            >
                <TopBar />
            </main>
        </>
    );
}

export default App;
