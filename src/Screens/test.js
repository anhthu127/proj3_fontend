import React, { useState } from "react";
import Slider from "react-slick";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export default function SimpleSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
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
    // const [slide, setSlide] = useState()
    let slider = ''
    const next = () => {
        slider.slickNext();
    }
    const previous = () => {
        slider.slickPrev();
    }
    return (



        <div>
            <h2>Previous and Next methods</h2>
            <Slider ref={c => (slider = c)}  {...settings}>
                <div key={1}>
                    <h3>1</h3>
                </div>
                <div key={2}>
                    <h3>2</h3>
                </div>
                <div key={3}>
                    <h3>3</h3>
                </div>
                <div key={4}>
                    <h3>4</h3>
                </div>
                <div key={5}>
                    <h3>5</h3>
                </div>
                <div key={6}>
                    <h3>6</h3>
                </div>
            </Slider>
            <div style={{ width: '100%', height: '100px' }}></div>
            <div style={{ textAlign: "center" }}>
                <button className="button" onClick={previous}>
                    Previous
                  </button>
                <button className="button" onClick={next}>
                    Next
                  </button>
            </div>
        </div >
    );
} 