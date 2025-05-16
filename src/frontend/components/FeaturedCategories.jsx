import React from "react";
import { Dumbbell, Flame, HeartPulse, Shirt, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Proteínas",
    icon: <Dumbbell size={32} />,
    link: "/proteinas",
  },
  {
    name: "Creatina",
    icon: <Flame size={32} />,
    link: "/creatina",
  },
  {
    name: "Vitaminas",
    icon: <HeartPulse size={32} />,
    link: "/vitaminas",
  },
  {
    name: "Pre-entrenos",
    icon: <PackageSearch size={32} />,
    link: "/preentrenos",
  },
  {
    name: "Ropa y accesorios",
    icon: <Shirt size={32} />,
    link: "/ropa",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold uppercase mb-10 tracking-tight">
          Categorías destacadas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <Link
              to={cat.link}
              key={index}
              className="flex flex-col items-center border border-black rounded-xl py-6 px-4 hover:bg-black hover:text-white transition duration-300"
            >
              {cat.icon}
              <span className="mt-4 font-semibold text-sm">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
