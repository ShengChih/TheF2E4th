import GNsign from '@/gnsign.svg'
import NewPaper from '@/newspaper.svg'

export function changeFavicon(url: string) {
  const favicon = document.getElementById("favicon") as HTMLLinkElement
	if (favicon && favicon.href) {
		favicon.href = url
	}
}

export function GNsignFavicon() {
	changeFavicon(GNsign)
}

export function NewsPaperFavicon() {
	changeFavicon(NewPaper)
}