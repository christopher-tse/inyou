interface Quote {
    quote: string
    author: string
}

interface QuoteResponse {
    quotes: Quote[]
}

export { Quote, QuoteResponse }
