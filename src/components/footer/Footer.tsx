import { LegacyRef, useEffect, useRef } from "react";
import { FIELD_BINDER } from "../../constants/constants";
import { useBinder } from "../../utilities/binder";
import "./Footer.scss";

function Footer() {
    const bodyRef : LegacyRef<HTMLDivElement> = useRef(null)
    const fieldBinder = useBinder(FIELD_BINDER)


    useEffect(()=>{
        const body = bodyRef.current
        
        if(body !== null){
            body.onclick =() =>{
                fieldBinder.dispatch()
            }
        }
    },[fieldBinder])

    console.log('rerender')



    return (
        <div ref={bodyRef} className="footer">
            <div className="footer-container">
                <div className="footer-container-corp">
                    <div className="footer-container-corp-is">
                        <h3>WEVA ADHIJAYA TEXTILE </h3>
                        Supplier Besar / Pusat Kain Tekstil untuk konveksi Anda. Tersedia
                        lengkap warna dan stok kain Cotton Combed, Drill, Parasut, Drifit,
                        Kain Topi, Celana Stretch Jeans, dan Asesoris Konveksi. Kirim ke
                        seluruh Indonesia. Terbesar, Terpercaya, dan Terlengkap di Surabaya.
                    </div>
                    <div className="footer-container-corp-about">
                        <h3>TENTANG KAMI </h3>
                        <li>Tentang Kami</li>
                        <li> Blog Daftar </li>
                        <li> Harga Kain</li>
                        <li>Gudang Kain</li>
                        <li>Katalog Kain</li>
                    </div>
                </div>
                <div className="footer-container-location">
                    <h3>LOKASI</h3>
                    <div className="footer-container-location-title">
                        Jalan Kapasan No. 55 B Surabaya
                    </div>
                    <div className="footer-container-location-map">
                        <iframe
                            title='kurios-utama'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d506669.13887311134!2d110.4250367761692!3d-7.200545801785829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7086a01017a5e5%3A0xe1daeac2d3ff49e!2sPT.%20Kurios%20Utama!5e0!3m2!1sid!2sid!4v1636355264399!5m2!1sid!2sid"
                            width="250"
                            height="180"
                            loading="lazy"
                        ></iframe>
                    </div>
                    <div className="footer-container-location-clock">
                        <h3> Buka :</h3>
                        <li> Senin – Jumat 08.00 – 17.00</li>
                        <li>Sabtu 08.00 – 16.00</li>
                        <li> Hari Minggu libur.</li>

                    </div>
                </div>
                <div className="footer-container-location">
                    <h3>EMAIL</h3>
                    <li>eduardus@kurios-utama.com</li>
                    <li>rossa@kurios-utama.com</li>

                </div>
                <div className="footer-container-information">
                    <h3>INFORMASI</h3>
                    <li>Syarat dan Ketentuan</li>
                    <li>
                        Kebijakan Privasi & Cookies
                    </li>
                    <li>Info Penting</li>
                </div>
            </div>

            <div className="footer-bottom">
                Copyright 2021 PT. KURIOS UTAMA, All Right Reserved
            </div>

        </div>
    );
}

export default Footer;