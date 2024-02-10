import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BackImage1 from "../public/images/foodapp.PNG";

const Home = () => {
  return (
    <>
      <div>
        <div
          id="top"
          className="h-[400px]  max-w-screen-2xl mx-auto flex flex-col justify-center p-7 lg:p-40  bg-center bg-cover bg-no-repeat "
          style={{ backgroundImage: `url(${BackImage1.src})` }}
        >
          <div className="max-w-sceen">
            <h1 className="text-3xl  text-white font-bold ">
              FOOD APP DELIVERY
            </h1>
            <br />
            <h1 className="text-xl   text-white font-normal ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              cursus enim dapibus enim faucibus laoreet vel at sapien.
              Pellentesque hendrerit, ligula eget dignissim sagittis, nisi ipsum
              facilisis dolor, quis ultrices orci leo dignissim ligula.
            </h1>
            <br />
          </div>
        </div>
        <div className="w-[250px] h-80 p-10">
          <Skeleton className="w-[200px] h-[200px]" />
        </div>
      </div>
    </>
  );
};

export default Home;
