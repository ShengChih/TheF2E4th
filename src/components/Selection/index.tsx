import React, { useState } from "react";

import {
  SelectionProps,
  // @ts-ignore
} from "./typing.d.ts";

import './index.scss';
import './pc.scss';

export default function Selection({ defaultText }: SelectionProps) {
  const [selected, setSelected] = useState<Array<any>>();

  return (
    <>
      <button>
        <p className="dropdown_text dropdown_text--pc">
          {defaultText}
        </p>
        <span className="dropdown_action dropdown_action--pc">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7.5L0.102887 0.750001L7.89711 0.750001L4 7.5Z"
              fill="#0D0B0C"
            />
          </svg>
        </span>
      </button>

      <div id="dropdownDivider" className="absolute w-full z-10 translate-y-[10px]">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
            </li>
          </ul>
          <div className="py-1">
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
          </div>
      </div>
    </>
  );
}
