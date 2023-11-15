import React from 'react';

import Button from './Button';
import '../styles/css/components/footer.css';


function Footer() {
    return (
        <div className="footer">
            <div className='footer-banner'>
                <Button
                    text="Hero Of The Week"
                    imageUrl="images/MVFFLogo.svg"
                    to="#/"
                />
            </div>
        </div>
    );
}

export default Footer;
