import './NavigationTop.scss'
import  { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import pngLogo from '../../../assets/images/logo.png'
import Carticon from '../../../assets/tsx/Carticon'
import Favouriteicon from '../../../assets/tsx/Favouriteicon'
import Personicon from '../../../assets/tsx/Personicon'
import ButtonNotification from '../../button/notification/ButtonNotification'
import ChevronIcon from '../../../assets/tsx/Chevronicon'
import { useHistory } from 'react-router'

type Mode = 'static' | 'dynamic'

interface NavigationTopProps {
    navRef?: LegacyRef<HTMLDivElement>
    mode?: Mode
    className?: string
    infoItems: Array<{path: string, label: string}>
    shopItems: Array<{title: string, path:string, items: Array<{id: string, label: string}>}>
}


function NavigationTop({ navRef, className, mode = 'static', infoItems, shopItems }: NavigationTopProps) {
    const setCartValueRef: MutableRefObject<((value: string) => void) | null> = useRef(null)
    const setCartCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)
    const setFavouriteCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)

    const homeRef: LegacyRef<HTMLDivElement> = useRef(null)
    const shopRef: LegacyRef<HTMLDivElement> = useRef(null)
    const combedRef: LegacyRef<HTMLDivElement> = useRef(null)
    const catalogRef: LegacyRef<HTMLDivElement> = useRef(null)
    const priceRef: LegacyRef<HTMLDivElement> = useRef(null)

    const history = useHistory()


    useEffect(() => {
        const home = homeRef.current
        const shop = shopRef.current
        const combed = combedRef.current
        const catalog = catalogRef.current
        const price = priceRef.current
 

        if(home !==null){
            home.onclick =() =>{
                history.push('/')
            }
        }
        if(shop !==null){
            shop.onclick =() =>{
                history.push('/shop')
            }
        }
        if(combed !==null){
            combed.onclick =() =>{
                history.push('/combed')
            }
        }
        if(price !==null){
            price.onclick =() =>{
                history.push('/price')
            }
        }
   
        if(catalog !==null){
            catalog.onclick =() =>{
                history.push('/catalog')
            }
        }

    }, [history])



    return (
        <div ref={navRef} className={`navigation-top ${className}`}>
            <div className="navigation-top-container">
                <img className={`navigation-top-container-logo ${mode === 'static' ? 'hide' : ''}`} src={pngLogo} alt="" />
                <div className="navigation-top-container-menu">
                    <div ref={homeRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`}>HOME</div>
                    <div className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`}>
                       <div ref={shopRef} style={{height:'100%', display:'flex', alignItems:'center'}}>  SHOP </div>

                        <ChevronIcon className="navigation-top-container-menu-chevron" />
                        <div className="navigation-top-container-menu-item-shop">
                            {shopItems.map((value, index) => <div key={index} className='navigation-top-container-menu-item-shop-item'>
                                <div className='navigation-top-container-menu-item-shop-item-label'>{value.title}</div>
                                <div className="navigation-top-container-menu-item-shop-item-container">
                                    {value.items.map((v, i) => <div key={i} className='navigation-top-container-menu-item-shop-item-container-item' onClick={(e)=>{
                                        history.push(value.path  + '/' + v.id)
                                        e.stopPropagation()
                                    }}>{v.label}</div>)}
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div ref={combedRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`}>COMBED</div>
                    <div ref={catalogRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`}>KATALOG KAIN</div>
                    <div ref={priceRef} className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`}>DAFTAR HARGA KAIN</div>
                    <div className={`navigation-top-container-menu-item ${mode === 'static' ? 'font-bold' : ''}`} style={{cursor:'default'}}>
                    <div style={{height:'100%', display:'flex', alignItems:'center'}}>  INFO </div>
                        <ChevronIcon className="navigation-top-container-menu-chevron" />
                        <div className="navigation-top-container-menu-item-info">
                            {infoItems.map((value, index) => <div key={index} className='navigation-top-container-menu-item-info-item' onClick={(e)=> {
                                history.push(value.path)
                                e.stopPropagation()
                                
                            }} style={{cursor:'pointer'}} >{value.label}</div>)}

                        </div>

                    </div>
                </div>

                <div className={`navigation-top-container-profile ${mode === 'static' ? 'hide' : ''}`}>
                    <div className="header-middle-profile">
                        <ButtonNotification icon={Personicon} showCounter={false} showTitle={false} />
                        <ButtonNotification icon={Favouriteicon} showTitle={false} count={25} setCountRef={setFavouriteCountRef} />
                        <ButtonNotification icon={Carticon} count={1000} titleLabel='Cart' titleValue='RP.0000' setCountRef={setCartCountRef} setValueRef={setCartValueRef} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavigationTop
