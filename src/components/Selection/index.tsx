import React, { useState } from "react";

import {
  SelectionProps,
  // @ts-ignore
} from "./typing.d.ts";

import './index.scss';
import './pc.scss';

export default function Selection({ defaultText, dropdownId, selectOptions }: SelectionProps) {
  const [isOpened, setOpened] = useState<Boolean>(false);
  const [selected, setSelected] = useState<Array<any>>();

  const hasRoundedStyles = isOpened
    ? 'rounded-b-none'
    : ''

  const displaySelectionOptions = (
    isOpened
      ? (
        <div id={dropdownId}  className="dropdown_options dropdown_options--pc">
        <ul className="" aria-labelledby={dropdownId}>
          {
            selectOptions
              ? (
                selectOptions.map((option: string) => (
                  <li>
                    <a href="#"><p>{option}</p></a>
                  </li>
                ))
              )
              : ''
          }
          </ul>
      </div>
    ): ''
  )

  const onClickDropdown = () => { 
    setOpened(!isOpened)
  }

  const onBlurDropdown = () => { 
    setOpened(false)
  }

  return (
    <>
      <button
        className={`dropdown_click dropdown_click--pc ${hasRoundedStyles}`}
        onClick={onClickDropdown}
        onBlur={onBlurDropdown}
      >
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
      {displaySelectionOptions}
    </>
  );
}
