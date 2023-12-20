'use client'

import React from "react";
import Lottie from "lottie-react";
import ArrowRight from './data/arrow_right_line.json'

export default function LottieAnimate() {
    const style = {
        height: 30,
        width: 30
    }
    return (
        <Lottie animationData={ArrowRight} style={style} loop={true} />
    )
}