const ONE_HOUR = 60 * 60 * 1000
let timeTokenSet = null

export function isTokenExpired() {
    if (!timeTokenSet) return true
    return new Date() - timeTokenSet >= ONE_HOUR
}

export function setTokenCreationTime() {
    timeTokenSet = new Date()
}