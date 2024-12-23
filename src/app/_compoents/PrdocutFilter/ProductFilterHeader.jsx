"use client";

import { IoIosSearch } from "react-icons/io";
import { FaArrowUp, FaCar } from "react-icons/fa";
import { Suspense, useEffect, useRef, useState } from "react";
import Card from "./Card";
import Product from "./Product";
import useFetchCarsData from "../../../hooks/FetchData";
import Loading from "app/[locale]/loading";
import { useLocale, useTranslations } from "next-intl";

export default function ProductFilterHeader() {
  const [IsitOpened, setIsitOpened] = useState(true);
  const [IsArrowClicked, setIsArrowClicked] = useState(false);
  const [Qurrey, setQurrey] = useState("");
  const [Catagory, setCatagory] = useState("");
  const dropdownRef = useRef(null);
  const t = useTranslations();
  const ActiveLocale = useLocale();
  const { data } = useFetchCarsData();

  const ArrowToggle = () => {
    setIsArrowClicked(!IsArrowClicked);
  };
  const ToggleBtn = () => {
    setIsitOpened(!IsitOpened);
    ArrowToggle();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsitOpened(true);
        setIsArrowClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const SearchedName = data.filter((item) => {
    return item.name.toLowerCase().indexOf(Qurrey.toLowerCase()) !== -1;
  });

  const FilteredProducts = () => {
    let CarsProducts = data;

    if (Qurrey) {
      CarsProducts = SearchedName;
    }

    if (Catagory) {
      CarsProducts = CarsProducts.filter((item) => {
        return item.name.toLowerCase().includes(Catagory.toLowerCase());
      });
    }
    return CarsProducts.map((car) => {
      return (
        <Card
          name={car.name}
          automatic={car.automatic}
          tire={car.tire}
          fuel={car.fuel}
          rent={car.rent}
          key={car.name}
          image={`/CarModels/${car.image}`}
          id={car.id}
        />
      );
    });
  };
  const result = FilteredProducts();

  return (
    <div className=" bg-[--background-color-Products] rounded-md pt-24">
      <div className=" p-10">
        <h1 className=" pb-5 font-semibold text-2xl text-[--text-color]">
          {t("carCatalogueTitle")}
        </h1>
        <p className=" text-[--text-color]">
          {t("exploreTheCarsYouMightLike")}
        </p>
      </div>

      <div className=" w-screen h-10 flex justify-around max-md:flex-col max-md:justify-center max-md:items-center max-md:my-5">
        <div className="max-w-3xl h-10 flex ">
          <div className="flex items-center w-80">
            <button
              className={`w-10 h-full flex items-center justify-center bg-gray-200 ${
                ActiveLocale === "en" ? "rounded-l-lg" : "rounded-r-lg"
              }`}
            >
              <FaCar />
            </button>
            <input
              type="text"
              id="Search"
              placeholder={t("searchACar")}
              className="w-full h-full py-2.5 px-3 border border-gray-200 rounded-none sm:text-sm outline-none"
              onChange={(eo) => {
                setQurrey(eo.target.value);
              }}
            />
            <button
              className={`w-10 h-full flex items-center justify-center bg-[--buttons-color]  hover:bg-[--buttons-color-hovered] transition-all  text-white ${
                ActiveLocale === "en" ? "rounded-r-lg" : "rounded-l-lg"
              }`}
            >
              <IoIosSearch />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center flex-row max-md:my-5  ">
          <div
            onClick={ToggleBtn}
            className="group inline-flex items-center overflow-hidden rounded-md border bg-white "
            ref={dropdownRef}
          >
            <button className="border-e px-5 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
              {t("carCatagory")}
            </button>

            <button
              id="Buy"
              className="h-full p-2 bg-[--buttons-color]  hover:bg-[--buttons-color-hovered] transition-all "
            >
              <FaArrowUp
                className={`${
                  IsArrowClicked ? "rotate-180" : ""
                } transition-transform`}
              />
            </button>
          </div>

          <div
            className={` ${
              IsitOpened ? "hidden" : "block"
            } absolute md:end-0 z-50   mt-12 max-sm:mt-10 w-56 rounded-md border border-gray-100 bg-white shadow-lg`}
            role="menu"
          >
            <ul className="p-2">
              <li
                onClick={() => {
                  setCatagory("");
                }}
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
              >
                {t("all")}
              </li>

              <li
                onClick={() => {
                  setCatagory("BMW");
                }}
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
              >
                {t("bmw")}
              </li>

              <li
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setCatagory("Ferrari");
                }}
              >
                {t("ferrari")}
              </li>

              <li
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setCatagory("Mercedes");
                }}
              >
                {t("mercedes")}
              </li>

              <li
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setCatagory("Fiat");
                }}
              >
                {t("fiat")}
              </li>

              <li
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setCatagory("Volkswagen");
                }}
              >
                {t("volkswagen")}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        <Product result={result} />
      </Suspense>
    </div>
  );
}
