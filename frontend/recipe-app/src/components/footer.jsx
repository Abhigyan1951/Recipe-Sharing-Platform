import React from 'react'

export default function Footer(){
    return(
        <footer className='footer'>
            <p>
                @{new Date().getFullYear()} Recipe-App, rights reserved.
                <a href="https:github.com/Abhigyan1951/Recipe-Sharing-Platform" target='_blank'>Github</a>
            </p>
        </footer>
    )
}