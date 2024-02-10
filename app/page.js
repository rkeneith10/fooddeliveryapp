import BackImage1 from "../public/images/foodapp.PNG";

const Home = () => {
  return (
    <>
      <div>
        <div
          id="top"
          className="min-h-screen  max-w-screen-2xl mx-auto flex flex-col justify-center p-7 lg:p-40  bg-center bg-cover bg-no-repeat "
          style={{ backgroundImage: `url(${BackImage1.src})` }}
        >
          <div className="max-w-sceen">
            <h1 className="text-3xl  text-white font-bold ">
              FOOD APP DELIVERY
            </h1>
            <br />
            <h1 className="text-xl   text-white font-bold ">
              Un espace dédié au rire et à la bonne humeur. Explorez une
              collection variée de mèmes qui sauront égayer votre quotidien,
              propageant la joie et la détente. Rejoignez-nous dans cette
              aventure humoristique et partagez des éclats de rire avec vos
              proches.
            </h1>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
