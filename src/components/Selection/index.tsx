import React, { Fragment, useState } from "react";
import styled from "styled-components";

import {
  SelectionProps,
  // @ts-ignore
} from "./typing.d.ts";


export default function Selection({ defaultText }: SelectionProps) {
  const [selected, setSelected] = useState<Array<any>>();
  const SelectionButton = styled.button`
    border-radius: 6px;
  `;

  const LowTriangle = styled.span`
    right: 18.5px;
  `;

  const DefaultSelectionText = styled.span`
    margin-left: 16px;
    color: #0d0b0c;
    font-family: "Noto Sans TC";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
  `;

  return (
    <>
      <SelectionButton className="relative round-lg text-left bg-white w-full">
        <DefaultSelectionText className="block truncate">
          {defaultText}
        </DefaultSelectionText>
        <LowTriangle className="flex absolute inset-y-0 items-center">
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
        </LowTriangle>
      </SelectionButton>
    </>
  );
}
