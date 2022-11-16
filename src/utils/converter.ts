export function px2vw(px: number) {
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
	// const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

	return Math.ceil(px / vw * 100)
}


const BASE64_MARKER = ';base64,'
export function convertDataURIToBinary (dataURI: string) {
	let base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	let base64 = dataURI.substring(base64Index);
	let raw = window.atob(base64);
	let rawLength = raw.length;
	let array = new Uint8Array(new ArrayBuffer(rawLength));
	
	for (let i = 0; i < rawLength; i++) {
			array[i] = raw.charCodeAt(i);
	}

	return array;
}