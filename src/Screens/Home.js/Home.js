import React, { useState } from 'react'
import Header from '../Components/Header'
import './home.css'
import Category from './category';
export default function Home() {
    const [listMovies, setList] = useState(
        [{
            name: 'a',
            link: 'b'
        },
        {
            name: 'a',
            link: 'b'
        },
        {
            name: 'a',
            link: 'b'
        },
        {
            name: 'a',
            link: 'b'
        }, {
            name: 'a',
            link: 'b'
        }, {
            name: 'a',
            link: 'b'
        },
        {
            name: 'a',
            link: 'b'
        },
        {
            name: 'c',
            link: 'd'
        }]
    )
    const [typeMovies, setType] = useState([{
        type: "a"
    }, {
        type: "a"
    }, {
        type: "a"
    }, {
        type: "a"
    }])
    return (
        <div className='wrap-home-page'>
            <div>
                <Header /></div>
            <div className='wrap-body'>
                <section className='intro-slider'>
                    <div style={{ width: '100%', height: '3%' }}></div>
                    <div className='slider'>
                    </div>
                    <div style={{ width: '100%', height: '3%' }}>
                    </div>
                </section>
                {typeMovies.map((value, index) => {
                    return (
                        <section className='wrap-category'>
                            <div className='wrap-title'>
                                <p>{value.type}</p>
                            </div>
                            <Category data={listMovies} />
                            <div style={{ width: '100%', height: '50px' }}></div>
                        </section>)
                })}
            </div>
        </div >
    )
}