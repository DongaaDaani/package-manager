import { Link } from "react-router-dom";

const subMasterDatas = [
  {
    name: "Csomagkezelő felület",
    to: "packages",
  },
];

const NavigationElements = () => {
  return (
    <>
      <ul className="mt-1 space-y-1 px-6">
        {subMasterDatas.map((item) => (
          <li
            key={item.name}
            className="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 "
          >
            <Link
              to={item.to === "#" ? "/" : `/${item.to}`}
              className="text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavigationElements;
