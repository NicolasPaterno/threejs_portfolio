import React from 'react';

const Footer = () => {
    return (
        <section className="c-psace pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-2">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy policy</p>
            </div>
            <div className="flex gap-3">
                <div className="social-icon flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
                    <a href="https://www.instagram.com/nicaozx/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                        <img src="/assets/instagram.svg" alt="github" className="w-1/2 h-1/2" />
                    </a>
                </div><div className="social-icon flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
                    <a href="https://www.linkedin.com/in/nicolaspaternosantos/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                        <img src="/assets/icons8-linkedin.svg" alt="github" className="w-1/2 h-1/2" />
                    </a>
                </div><div className="social-icon flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
                    <a href="https://www.linkedin.com/in/nicolaspaternosantos/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
                        <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2" />
                    </a>
                </div>
            </div>
            <p className="text-white-500">© 2024 Nícolas. All
                rights reserved. </p>
        </section>
    );
}

export default Footer;
