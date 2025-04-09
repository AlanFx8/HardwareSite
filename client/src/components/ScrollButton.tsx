import React, { useState, useEffect } from 'react';
import '../styles/scroll-button.scss';
import ScrollController from '../classes/ScrollController';

const _ScrollController = new ScrollController;
const ScrollButton: React.FC = () => {
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const SCROLL_SPEED = 30;

    useEffect(() => {
        window.addEventListener('scroll', OnScroll);

        return () => {
            window.removeEventListener('scroll', OnScroll);
            _ScrollController.EnableScrolling();
        }
    }, []);

    const OnScroll = () => {
        let scrollButton = document.getElementById("scroll-button");
        if (window.scrollY === 0){
            scrollButton?.classList.remove("active");
        }
        else {
            scrollButton?.classList.add("active");
        }
    }

    const OnClick = () => {
        if (isScrolling) return;
        var scrollUpRequestWrapper: any;
        var scrollUp = ()=>{
            if (window.scrollY === 0){
                cancelAnimationFrame(scrollUpRequestWrapper);
                _ScrollController.EnableScrolling();
                setIsScrolling(false);
            }
            else {
                window.scrollBy(0, -SCROLL_SPEED);
                scrollUpRequestWrapper = requestAnimationFrame(scrollUp);
            }
        }
        _ScrollController.DisableScrolling();
        scrollUpRequestWrapper = requestAnimationFrame(scrollUp);
        setIsScrolling(true);
    }

    return (<div id="scroll-button" onClick={ OnClick }>
        <div></div>
    </div>);
}

export default ScrollButton;