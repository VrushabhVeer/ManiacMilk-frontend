import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "../../assets/images/loadingAnimation.json";

const Loader = () => {
    return (
        <div className="flex w-8/12 md:w-4/12 h-[80vh] mx-auto justify-center items-center">
            <div>
                <Player autoplay loop src={loadingAnimation} />
            </div>
        </div>
    );
};

export default Loader;
