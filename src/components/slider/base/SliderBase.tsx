import { ComponentType, LegacyRef, MutableRefObject, useEffect, useRef } from 'react';
import { clearBackgroundColor, clearTransition, setBackgroundColor, setHeight, SetPosition, setTransition } from '../../../utilities/transition';
import SliderComponent from '../component/SliderComponent';
import './SliderBase.scss';


interface SliderBaseProps {
    sliderRef?: MutableRefObject<{
        next: () => void,
        prev: () => void
    }>,
    images?: Array<string>
    contents?: Array<{
        type: string,
        data: {
            title: string,
            description: string,
            buttonLabel: string
        },
        Component?: ComponentType<any>,
        backgroundColor?: string
    }>,
    contentLinker?: Array<{
        backgroundIndex: number,
        foregroundIndex: number
    }>
}

function SliderBase({ sliderRef, images = [], contents, contentLinker=[] }: SliderBaseProps) {
    const baseRef: LegacyRef<HTMLImageElement> = useRef(null)
    const imageCurrentRef: LegacyRef<HTMLImageElement> = useRef(null)
    const imageAfterRef: LegacyRef<HTMLImageElement> = useRef(null)
    const containerRef: LegacyRef<HTMLDivElement> = useRef(null)
    const overlayRef: LegacyRef<HTMLDivElement> = useRef(null)
    const innerOverlayRef: LegacyRef<HTMLDivElement> = useRef(null)
    const innerImageRef: LegacyRef<HTMLImageElement> = useRef(null)
    const currentIndexRef: MutableRefObject<number> = useRef(0)
    const animatorRef: MutableRefObject<{
        play: (index: number) => void
    }> = useRef({ play: () => { } })



    useEffect(() => {
        const base = baseRef.current
        const imageCurrent = imageCurrentRef.current
        const imageAfter = imageAfterRef.current
        const container = containerRef.current
        const overlay = overlayRef.current
        const innerOverlay = innerOverlayRef.current
        const innerImage = innerImageRef.current
        let animating = false

        if (base && imageCurrent && imageAfter && container && overlay && innerOverlay && innerImage && sliderRef) {
            const animateImage = (idxAfter: number) => {
                //set container position to top then animate the height from 0 to 100%
                SetPosition('top', container)
                setHeight('0', container)
                setTransition('in', container)
                setHeight('100%', container)

                //Animated the height of current image from 100% to 0
                setTransition('in', imageCurrent)
                setHeight('0', imageCurrent)

                //set Image buffer position to top
                SetPosition('top', imageAfter)
                setHeight('0', imageAfter)

                //clear overlay background then apply transition to them
                clearBackgroundColor(overlay, innerOverlay)
                setTransition('in', overlay, innerOverlay)

                //Assign callback to overlay element, so we know when to start next animation
                overlay.ontransitionend = () => {
                    //clear callback from the overlay element
                    overlay.ontransitionend = null
                    //Assign callback to imageAfter element, so we know when to start next animation
                    imageAfter.ontransitionend = () => {

                        //clear cllanback from the imageAfter element
                        imageAfter.ontransitionend = null

                        //clear all the transition effect
                        clearTransition(base, imageCurrent, imageAfter, container, overlay, innerOverlay, innerImage)

                        //when imageAfter transition end, set chosen imageCureent and hide imageAfter (image buffer)
                        imageCurrent.src = images[idxAfter]
                        setHeight('100%', imageCurrent)
                        SetPosition('bottom', imageCurrent)
                        setHeight('0', imageAfter)

                        //set current index according to the chosen image
                        currentIndexRef.current = idxAfter
                        animating = false
                        console.log('animation-3')

                    }

                    //when overlay transition end, set container position to bottom
                    clearTransition(container)
                    SetPosition('bottom', container)

                    //set container height from 100% to 0. set imageAfter from 0 to 100%
                    setTransition('out', container, imageAfter)
                    setHeight('0', container)
                    setHeight('100%', imageAfter)

                    //clear overlay background
                    clearBackgroundColor(overlay)
                  

                }
                setBackgroundColor('#00000051', overlay, innerOverlay)
          
            }

            sliderRef.current = {
                next: () => {
                 
                    if (!animating && images.length > 0) {
                        animating = true
                        const idxAfter = ((currentIndexRef.current + 1) < images.length) ? currentIndexRef.current + 1 : 0
                        imageAfter.src = images[idxAfter]
                        innerImage.src = images[idxAfter]
                        animateImage(idxAfter)
                        
                        const linker = contentLinker.find((value) => value.backgroundIndex === idxAfter)
                        animatorRef.current.play(linker ? linker.foregroundIndex : -1)
                    }
                },

                prev: () => {
                    if (!animating && images.length > 0) {
                        animating = true
                        const idxAfter = ((currentIndexRef.current - 1) < 0) ? images.length - 1 : currentIndexRef.current - 1
                        imageAfter.src = images[idxAfter]
                        innerImage.src = images[idxAfter]
                        animateImage(idxAfter)
                        const linker = contentLinker.find((value) => value.backgroundIndex === idxAfter)
                        animatorRef.current.play(linker ? linker.foregroundIndex: -1)

                    }
                }
            }

            animating = true
            animateImage(0)
            animatorRef.current.play(0)
            const linker = contentLinker.find((value) => value.backgroundIndex === 0)
            animatorRef.current.play(linker ? linker.foregroundIndex: -1)

        }
    }, [sliderRef, images, contentLinker])


    return (
        <div ref={baseRef} className='slider-base'>
            <img ref={imageCurrentRef} className="slider-base-bg" style={{ bottom: '0' }} alt='' src={images[0]} />
            <img ref={imageAfterRef} className="slider-base-bg" style={{ top: '0' }} alt='' src={images[0]} />
            <div ref={containerRef} className='slider-base-container'>
                <img ref={innerImageRef} className='slider-base-container-bg' alt='' src={images[0]} />
                <div ref={innerOverlayRef} className='slider-base-container-overlay' />
            </div>
            <div ref={overlayRef} className='slider-base-overlay' />
            <div className="slider-base-component">
                <SliderComponent backgroundColor ='#00000000' animatorRef={animatorRef} contents={contents} />
            </div>
        </div>
    )
}

export default SliderBase
