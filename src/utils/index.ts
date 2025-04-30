export function classNames(...clases : string[]) {
    return clases.filter(Boolean).join('')
}

export function isValidUrl(url: string) {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false
    }
}

