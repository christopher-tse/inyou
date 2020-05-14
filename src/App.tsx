import React, { useState, useEffect } from 'react'
import icon from './Spinner.svg'
import { Quote, QuoteResponse } from './types'

import './css/compiled.css'

const QUOTE_SOURCE =
    'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
    const [quoteList, setQuoteList] = useState<Quote[] | null>(null)
    const [author, setAuthor] = useState<string | null>(null)
    const [quote, setQuote] = useState<string | null>(null)

    function getRandomIndex(max: number) {
        return Math.floor(Math.random() * max)
    }

    useEffect(() => {
        fetch(QUOTE_SOURCE)
            .then(res => res.json())
            .then((res: QuoteResponse) => {
                setQuoteList(res.quotes)

                const index = getRandomIndex(res.quotes.length)
                setAuthor(res.quotes[index].author)
                setQuote(res.quotes[index].quote)
            })
    }, [])

    function getNewQuote() {
        if (!quoteList) {
            return
        }
        const index = getRandomIndex(quoteList.length)
        setAuthor(quoteList[index].author)
        setQuote(quoteList[index].quote)
    }

    function tweetQuote() {
        const url = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`

        const win = window.open(url)
        if (win) {
            win.focus()
        } else {
            alert('Please allow popups for tweeting')
        }
    }

    return (
        <main className="grid grid-rows-layout grid-columns-1 gap-10 max-w-5xl mx-auto">
            <header className="grid-start-1 grid-end-1 flex align-center justify-center">
                <h1 className="font-bold text-6xl self-center">Qwotez</h1>
            </header>
            <div className="flex align-center justify-center">
                <button
                    className="text-3xl px-6 py-1 bg-purple-600 mr-10 rounded-md font-semibold h-16 self-center cursor-pointer"
                    onClick={() => getNewQuote()}
                >
                    Get New Quote
                </button>
                <button
                    className="text-3xl px-6 py-1 bg-blue-500 rounded-md font-semibold h-16 self-center cursor-pointer"
                    onClick={() => tweetQuote()}
                >
                    Tweet Quote
                </button>
            </div>

            <div className="bg-gray-700 mx-2 p-10 rounded-md flex flex-col justify-center">
                {!author && !quote ? (
                    <img src={icon} className="inline-block" />
                ) : (
                    <>
                        <p className="text-5xl">{quote}</p>
                        <p className="mt-10 text-3xl">
                            <em>- {author}</em>
                        </p>
                    </>
                )}
            </div>
        </main>
    )
}

export default App
