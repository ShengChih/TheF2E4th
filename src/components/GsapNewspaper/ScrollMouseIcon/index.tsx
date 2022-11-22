import React, { ComponentProps } from 'react'
import { deviceWidth } from '@/utils/config'
import useCheckScreen from '@/hooks/useCheckScreen'
import baseStyles from './styles/base.module.scss'

type ScrollMouseIconProps = ComponentProps<'div'>

export default function ScrollMouseIcon(props: ScrollMouseIconProps) {
  const [, , isTablet, isDesktop] = useCheckScreen(deviceWidth)

  const Icon = isDesktop ? (
    <>
      <svg
        className={`absolute ${baseStyles['scroll-down-1']}`}
        width="64"
        height="101"
        viewBox="0 0 64 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 83.696V86.816H5.984V83.696H10ZM11.104 87.888V82.624H4.896V89.024H5.984V87.888H11.104ZM14.448 79.36H7.312C7.712 78.592 8.128 77.68 8.48 76.832L7.024 76.576C6.816 77.392 6.4 78.496 6 79.36H1.632V91.216H2.8V80.512H13.264V89.632C13.264 89.936 13.168 90.016 12.88 90.032C12.544 90.048 11.44 90.048 10.288 90C10.464 90.32 10.656 90.88 10.72 91.216C12.16 91.216 13.136 91.2 13.712 91.008C14.272 90.816 14.448 90.416 14.448 89.632V79.36ZM31.072 78.976V77.792H16.944V78.976H23.056V91.2H24.32V82.784C26.144 83.76 28.288 85.072 29.376 85.968L30.208 84.896C28.944 83.936 26.432 82.496 24.528 81.584L24.32 81.824V78.976H31.072ZM42.624 80.144C42.624 81.04 42.832 81.408 43.84 81.408H45.664C46.064 81.408 46.48 81.408 46.672 81.344C46.64 81.088 46.624 80.768 46.608 80.512C46.384 80.56 45.888 80.576 45.648 80.576H44.032C43.728 80.576 43.696 80.48 43.696 80.16V79.008H47.104V78.032H42.24C42.032 77.632 41.728 77.056 41.472 76.64L40.432 76.896C40.608 77.248 40.816 77.648 40.992 78.032H36.672V79.008H42.624V80.144ZM39.68 79.392C39.44 80.416 38.656 80.784 36.224 80.976C36.416 81.168 36.688 81.584 36.752 81.824C39.504 81.504 40.464 80.88 40.72 79.392H39.68ZM36.672 78.512C36.08 78.048 34.928 77.344 34.096 76.88L33.52 77.76C34.352 78.256 35.504 79.008 36.08 79.504L36.672 78.512ZM35.856 82.704C35.248 82.24 34.064 81.616 33.184 81.248L32.656 82.176C33.552 82.576 34.704 83.232 35.28 83.696L35.856 82.704ZM35.44 85.216C34.704 86.96 33.728 88.928 33.056 90.112L33.952 90.88C34.688 89.456 35.568 87.568 36.224 85.952L35.44 85.216ZM38.848 82.704H44.304V84.416H38.848V82.704ZM46.032 85.712C45.52 86.304 44.672 87.136 43.952 87.712C43.36 87.008 42.896 86.208 42.56 85.344H45.296V81.776H37.872V85.344H40.256C39.184 86.4 37.52 87.28 35.728 87.872C35.952 88.064 36.32 88.448 36.48 88.688C37.152 88.448 37.792 88.16 38.4 87.856V89.344C38.4 89.936 38.208 90.144 38.016 90.256C38.192 90.448 38.4 90.928 38.464 91.184C38.752 90.992 39.232 90.832 42.576 90.128C42.56 89.92 42.56 89.504 42.576 89.2L39.44 89.744V87.264C40.24 86.736 40.944 86.144 41.504 85.472C42.512 88.064 44.224 90.08 46.672 91.072C46.832 90.784 47.168 90.416 47.424 90.192C46.32 89.792 45.344 89.168 44.544 88.384C45.312 87.808 46.24 87.008 46.96 86.288L46.032 85.712ZM50.176 85.184V84.016H52.192V85.184H50.176ZM50.176 82.08H52.192V83.232H50.176V82.08ZM55.36 82.08V83.232H53.264V82.08H55.36ZM55.36 85.184H53.264V84.016H55.36V85.184ZM59.568 80.32C59.6 79.2 59.6 78.016 59.6 76.816H58.48C58.48 78.032 58.48 79.2 58.448 80.32H56.544V81.44H58.416C58.272 84.432 57.84 87.008 56.464 88.896V88.832C55.392 88.96 54.304 89.072 53.264 89.168V87.904H56.4V86.992H53.264V86.016H56.368V81.264H53.264V80.256H56.656V79.328H53.264V78.16C54.432 78.032 55.52 77.888 56.384 77.696L55.792 76.784C54.144 77.152 51.264 77.44 48.896 77.568C49.024 77.808 49.136 78.192 49.184 78.448C50.128 78.416 51.168 78.352 52.192 78.272V79.328H48.736V80.256H52.192V81.264H49.2V86.016H52.192V86.992H49.168V87.904H52.192V89.28C50.88 89.408 49.68 89.52 48.72 89.6L48.896 90.64C50.688 90.448 53.168 90.176 55.584 89.888C55.376 90.08 55.152 90.272 54.896 90.448C55.184 90.64 55.6 91.04 55.776 91.296C58.592 89.184 59.328 85.696 59.52 81.44H61.808C61.648 87.248 61.456 89.36 61.088 89.824C60.928 90.032 60.784 90.08 60.512 90.08C60.208 90.08 59.504 90.064 58.736 90C58.912 90.304 59.04 90.8 59.072 91.12C59.808 91.168 60.56 91.184 61.008 91.12C61.488 91.072 61.808 90.944 62.08 90.528C62.624 89.856 62.768 87.632 62.944 80.928C62.944 80.768 62.96 80.32 62.96 80.32H59.568Z"
          fill="black"
        />
        <rect x="18" y="10" width="28" height="42" rx="11" stroke="black" strokeWidth="2" />
        <line
          x1="32.5"
          y1="18.5"
          x2="32.5"
          y2="29.5"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className={`absolute ${baseStyles['scroll-down-2']}`}
        width="64"
        height="101"
        viewBox="0 0 64 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 69.696V72.816H5.984V69.696H10ZM11.104 73.888V68.624H4.896V75.024H5.984V73.888H11.104ZM14.448 65.36H7.312C7.712 64.592 8.128 63.68 8.48 62.832L7.024 62.576C6.816 63.392 6.4 64.496 6 65.36H1.632V77.216H2.8V66.512H13.264V75.632C13.264 75.936 13.168 76.016 12.88 76.032C12.544 76.048 11.44 76.048 10.288 76C10.464 76.32 10.656 76.88 10.72 77.216C12.16 77.216 13.136 77.2 13.712 77.008C14.272 76.816 14.448 76.416 14.448 75.632V65.36ZM31.072 64.976V63.792H16.944V64.976H23.056V77.2H24.32V68.784C26.144 69.76 28.288 71.072 29.376 71.968L30.208 70.896C28.944 69.936 26.432 68.496 24.528 67.584L24.32 67.824V64.976H31.072ZM42.624 66.144C42.624 67.04 42.832 67.408 43.84 67.408H45.664C46.064 67.408 46.48 67.408 46.672 67.344C46.64 67.088 46.624 66.768 46.608 66.512C46.384 66.56 45.888 66.576 45.648 66.576H44.032C43.728 66.576 43.696 66.48 43.696 66.16V65.008H47.104V64.032H42.24C42.032 63.632 41.728 63.056 41.472 62.64L40.432 62.896C40.608 63.248 40.816 63.648 40.992 64.032H36.672V65.008H42.624V66.144ZM39.68 65.392C39.44 66.416 38.656 66.784 36.224 66.976C36.416 67.168 36.688 67.584 36.752 67.824C39.504 67.504 40.464 66.88 40.72 65.392H39.68ZM36.672 64.512C36.08 64.048 34.928 63.344 34.096 62.88L33.52 63.76C34.352 64.256 35.504 65.008 36.08 65.504L36.672 64.512ZM35.856 68.704C35.248 68.24 34.064 67.616 33.184 67.248L32.656 68.176C33.552 68.576 34.704 69.232 35.28 69.696L35.856 68.704ZM35.44 71.216C34.704 72.96 33.728 74.928 33.056 76.112L33.952 76.88C34.688 75.456 35.568 73.568 36.224 71.952L35.44 71.216ZM38.848 68.704H44.304V70.416H38.848V68.704ZM46.032 71.712C45.52 72.304 44.672 73.136 43.952 73.712C43.36 73.008 42.896 72.208 42.56 71.344H45.296V67.776H37.872V71.344H40.256C39.184 72.4 37.52 73.28 35.728 73.872C35.952 74.064 36.32 74.448 36.48 74.688C37.152 74.448 37.792 74.16 38.4 73.856V75.344C38.4 75.936 38.208 76.144 38.016 76.256C38.192 76.448 38.4 76.928 38.464 77.184C38.752 76.992 39.232 76.832 42.576 76.128C42.56 75.92 42.56 75.504 42.576 75.2L39.44 75.744V73.264C40.24 72.736 40.944 72.144 41.504 71.472C42.512 74.064 44.224 76.08 46.672 77.072C46.832 76.784 47.168 76.416 47.424 76.192C46.32 75.792 45.344 75.168 44.544 74.384C45.312 73.808 46.24 73.008 46.96 72.288L46.032 71.712ZM50.176 71.184V70.016H52.192V71.184H50.176ZM50.176 68.08H52.192V69.232H50.176V68.08ZM55.36 68.08V69.232H53.264V68.08H55.36ZM55.36 71.184H53.264V70.016H55.36V71.184ZM59.568 66.32C59.6 65.2 59.6 64.016 59.6 62.816H58.48C58.48 64.032 58.48 65.2 58.448 66.32H56.544V67.44H58.416C58.272 70.432 57.84 73.008 56.464 74.896V74.832C55.392 74.96 54.304 75.072 53.264 75.168V73.904H56.4V72.992H53.264V72.016H56.368V67.264H53.264V66.256H56.656V65.328H53.264V64.16C54.432 64.032 55.52 63.888 56.384 63.696L55.792 62.784C54.144 63.152 51.264 63.44 48.896 63.568C49.024 63.808 49.136 64.192 49.184 64.448C50.128 64.416 51.168 64.352 52.192 64.272V65.328H48.736V66.256H52.192V67.264H49.2V72.016H52.192V72.992H49.168V73.904H52.192V75.28C50.88 75.408 49.68 75.52 48.72 75.6L48.896 76.64C50.688 76.448 53.168 76.176 55.584 75.888C55.376 76.08 55.152 76.272 54.896 76.448C55.184 76.64 55.6 77.04 55.776 77.296C58.592 75.184 59.328 71.696 59.52 67.44H61.808C61.648 73.248 61.456 75.36 61.088 75.824C60.928 76.032 60.784 76.08 60.512 76.08C60.208 76.08 59.504 76.064 58.736 76C58.912 76.304 59.04 76.8 59.072 77.12C59.808 77.168 60.56 77.184 61.008 77.12C61.488 77.072 61.808 76.944 62.08 76.528C62.624 75.856 62.768 73.632 62.944 66.928C62.944 66.768 62.96 66.32 62.96 66.32H59.568Z"
          fill="black"
        />
        <rect x="18" y="10" width="28" height="42" rx="11" stroke="black" strokeWidth="2" />
        <line
          x1="32.5"
          y1="4.5"
          x2="32.5"
          y2="15.5"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </>
  ) : isTablet ? (
    <>
      <div className={`absolute md:top-[14px] w-fit h-fit animate-swipe-up-infinite`}>
        <svg
          width="23"
          height="14"
          viewBox="0 0 23 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12L11.5 2L2 12"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`absolute md:top-[27px] w-fit h-fit animate-swipe-up-infinite`}>
        <svg
          width="23"
          height="14"
          viewBox="0 0 23 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12L11.5 2L2 12"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className={`absolute w-full md:top-[45px] md:h-[23px] md:w-[64px] md:h-[23px]`}>
        往上移動
      </p>
    </>
  ) : (
    <></>
  )
  return <div {...props}>{Icon}</div>
}
