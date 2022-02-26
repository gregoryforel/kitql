import type { HtmlTag } from '$lib/ui/shared/htmltag.types'

export const getHtmltag = (tag: string): HtmlTag => {
	return tag as unknown as HtmlTag
}
