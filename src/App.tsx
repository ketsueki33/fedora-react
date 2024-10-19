import "./App.css";
import useBearStore from "./store";

function App() {
    const bears = useBearStore((state) => state.bears);
    const increase = useBearStore((state) => state.increase);

    return (
        <>
            <div
                onClick={() => {
                    increase(1);
                }}
                className="w-full bg-red-500 flex justify-center"
            >
                {bears}
            </div>
        </>
    );
}

export default App;
