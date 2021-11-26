import './Header.scss'
import logo from '../../assets/images/logo.png'
import SearchBar from '../search/SearchBar'
import Personicon from '../../assets/tsx/Personicon'
import Favouriteicon from '../../assets/tsx/Favouriteicon'
import Carticon from '../../assets/tsx/Carticon'
import ButtonNotification from '../button/notification/ButtonNotification'
import { LegacyRef, MutableRefObject, useEffect, useRef } from 'react'
import NavigationTop from '../navigation/top/NavigationTop'
import { INFO_ITEMS, MENU_ITEMS, SHOP_ITEMS } from '../../constants/constants'

interface HeaderProps {
    searchCallback?: (query: string) => void,
}

function Header({ searchCallback}: HeaderProps) {
    const bodyRef: LegacyRef<HTMLDivElement> = useRef(null)
    const floatingRef: LegacyRef<HTMLDivElement> = useRef(null)
    const setCartValueRef: MutableRefObject<((value: string) => void) | null> = useRef(null)
    const setCartCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)
    const setFavouriteCountRef: MutableRefObject<((count: number) => void) | null> = useRef(null)

    useEffect(() => {
        const body = bodyRef.current
        const floating = floatingRef.current

        const setFavouriteCount = setCartCountRef.current
        if (setFavouriteCount !== null) {
            setFavouriteCount(31)
        }

        window.onscroll = () => {
            if (body !== null && floating !== null) {
                const rect = body.getBoundingClientRect()
                if (rect.y <= -191) {
                    if (!floating.classList.contains('header-floating-show')) {
                        floating.classList.add('header-floating-show')
                    }
                }
                else {
                    if (floating.classList.contains('header-floating-show')) {
                        floating.classList.remove('header-floating-show')
                    }
                }
            }
        }
    })

    return (
        <div ref={bodyRef} className='header'>
            <div className="header-top">
                <div className="header-top-container">
                    <div className="header-top-container-whatsapp">WHATSAPP KAMI</div>
                    <div className="header-top-container-location">JL. KAPASAN NO.55 SURABAYA</div>
                </div>
            </div>
            <div className="header-middle">
                <img className="header-middle-logo" alt="" src={logo} />
                <SearchBar searchCallback={searchCallback} menuItems={MENU_ITEMS} />
                <div className="header-middle-profile">
                    <ButtonNotification icon={Personicon} showCounter={false} showTitle={false} />
                    <ButtonNotification icon={Favouriteicon} showTitle={false} count={25} setCountRef={setFavouriteCountRef} />
                    <ButtonNotification icon={Carticon} count={1000} titleLabel='Cart' titleValue='RP.0000' setCountRef={setCartCountRef} setValueRef={setCartValueRef} />
                </div>
            </div>
            <NavigationTop mode='static' shopItems={SHOP_ITEMS} infoItems={INFO_ITEMS} />
            <NavigationTop navRef={floatingRef} className='header-floating' mode='dynamic' shopItems={SHOP_ITEMS} infoItems={INFO_ITEMS} />
        </div>
    )
}

export default Header
