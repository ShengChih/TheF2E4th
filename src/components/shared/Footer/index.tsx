import { memo } from 'react'
type FooterProps = {
	content?: string
	className?: string
}

const Footer = ({ className, content }: FooterProps) => {
	return (
		<footer className={className}>{content}</footer>
	)
}

export default memo(Footer)