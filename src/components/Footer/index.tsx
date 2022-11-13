import { flatClassName } from "@utils/reduce";

export default function Footer() {
	return (
		<footer className={flatClassName({
			common:`w-full flex justify-center font-sans font-normal bg-[#3C221B] text-white py-[10px] text-[16px] leading-[23px] h-[43px]`,
		})}>六角日報 © Code: ShengChih  /  Design: KT</footer>
	)
}