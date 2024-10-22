import { Time } from "./Time";

const TopBar = () => {
    return (
        <div className="absolute top-0 left-0 w-full bg-black/50 backdrop-blur-sm h-8 flex justify-center items-center cursor-default">
            <Time />
        </div>
    );
};
export default TopBar;
