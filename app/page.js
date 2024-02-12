import CategoryComponent from "@/components/categoryComponent";
import axios from "axios";
import BackImage1 from "../public/images/foodapp.PNG";

export async function getStaticProps() {
  try {
    const categoriesResponse = await axios.get(
      "https://fooddelivery-kappa.vercel.app/api/categories"
    );
    const categoriesData = categoriesResponse.data;
    return {
      props: {
        categories: categoriesData.all,
      },
    };
  } catch (error) {
    console.log("Error fetching data:", error);
    return {
      props: {
        categories: [],
      },
    };
  }
}

const Home = ({ categories }) => {
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
        <div className="p-10 bg-gray-100">
          <div className="text-md font-semibold text-center">
            <span>Popular Categories</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <div key={cat._id}>
                <CategoryComponent
                  category={cat.category}
                  imageUrl={cat.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
