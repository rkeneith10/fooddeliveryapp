"use client";
import axios from "axios";
import { useEffect, useState } from "react";
// import Skeleton from "react-loading-skeleton";
import CategoryComponent from "@/components/categoryComponent";
import "react-loading-skeleton/dist/skeleton.css";
import BackImage1 from "../public/images/foodapp.PNG";

const Home = () => {
  const [isloading, setisLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(
          "https://fooddelivery-kappa.vercel.app/api/categories"
        );
        const responseData = response.data;

        if (responseData.success) {
          console.log(responseData.all);
          setCategories(responseData.all);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchCategories();
    setisLoading(false);
  }, []);
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
        <div className="p-10">
          <div className="text-md font-semibold text-xl text-center">
            Popular Categories
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {isloading && (
              <div className="items-center justify-center">Loading...</div>
            )}

            {categories.map((cat) => (
              <div key={cat._id}>
                <CategoryComponent
                  category={cat.category}
                  cloudinary_id={cat.cloudinary_id}
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