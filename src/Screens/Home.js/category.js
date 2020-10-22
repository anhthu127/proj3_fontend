import React, { useState } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowLeft } from "@material-ui/icons";
import { ArrowRight } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core";
import './category.css'
import VideoThumbnail from 'react-video-thumbnail';
import Slider from "react-slick";

function Category(props) {
    const [isHover, setHover] = useState('none')
    const renderArrows = () => {
        return (
            <div className="slider-arrow">
                <ButtonBase
                    style={{ display: isHover }}
                    className="arrow-btn prev"
                    onClick={() => slider.slickPrev()}
                >
                    <ArrowLeft />
                </ButtonBase>
                <ButtonBase
                    style={{ display: isHover }}
                    className="arrow-btn next"
                    onClick={() => slider.slickNext()}
                >
                    <ArrowRight />
                </ButtonBase>
            </div>
        );
    };
    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
        centerMode: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 3
    };
    let slider = ''

    const onMouseEnter = () => {
        setHover('block')
    }
    return (
        <div style={{ position: "relative", marginTop: "2rem" }} onMouseEnter={onMouseEnter} >
            {renderArrows()}
            <Slider ref={c => (slider = c)} {...settings}>
                {props.data && props.data.map((item, key) => {
                    return (
                        <div>
                            <Card>

                                <video width="320" height="240"
                                    controls
                                    src="https://dl.dropboxusercontent.com/s/7b21gtvsvicavoh/statue-of-admiral-yi-no-audio.mp4?dl=1">
                                    Your browser does not support the video tag.
                                </video>

                                <CardBody>
                                    {/* <CardTitle>{item.name}</CardTitle> */}
                                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                                    {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                                    {/* <Button>Button</Button> */}
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}

            </Slider>
        </div>
    )
}

export default Category;