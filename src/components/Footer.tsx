import { Facebook, GoalIcon, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div>
                <div className="footer-content py-14">
                    <div className="w-full flex justify-center sm:items-center lg:gap-x-7 gap-x-14 sm:gap-y-5 gap-y-14 lg:flex-nowrap sm:flex-row flex-col flex-wrap sm:px-0 px-10 mobile:px-4 micro:px-3">
                        <div className='lg:w-[30%] w-[350px] mobile:w-[90%] micro:w-[95%]'>
                            <div className="footer-widget">
                                <div className="footer-logo">
                                    <Link to="/"><img src="/logo.png" className="h-14" alt="logo" /></Link>
                                </div>
                                <div className="footer-text">
                                    <p className='w-full'>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                        elit,Lorem ipsum dolor sit amet.</p>
                                </div>
                                <div className="footer-social-icon w-full">
                                    <span>Follow us</span>
                                    <div className='w-full flex justify-start items-center gap-x-3'>
                                        <div className='bg-[#3b5998] w-10 h-10 rounded-full flex justify-center items-center'>
                                            <Facebook fill='white' stroke='white' />
                                        </div>
                                        <div className='bg-[#55acee] w-10 h-10 rounded-full flex justify-center items-center'><MessageCircle fill='white' stroke='white' /></div>
                                        <div className='bg-[#dd4b39] w-10 h-10 rounded-full flex justify-center items-center'><GoalIcon fill='white' stroke='white' /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[25%] w-[280px]'>
                            <div className="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <div className='w-[350px] flex justify-start micro:flex-col gap-y-3'>
                                <div className='w-1/2 flex flex-col text-[white] text-[14px] opacity-60 gap-y-3'>
                                    <Link to="/">Home</Link>
                                    <Link to="/">Blogs</Link>
                                    <Link to="/most-liked-blogs">Most Liked</Link>
                                    <p className='text-white' onClick={() => window.scrollTo({
                                        behavior: 'smooth',
                                        top: 0
                                    })}>Search Blogs</p>
                                </div>
                                <div className='w-1/2 flex flex-col text-[white] text-[14px] opacity-60 gap-y-3'>
                                    <Link to="/">Review us</Link>
                                    <Link to="/">Dashboard</Link>
                                    <Link to="/">Portfolio</Link>
                                    <Link to="/">Contact</Link>
                                </div>
                            </div>
                        </div>
                        <div className='lg:w-[30%] mobile:w-[90%] micro:w-[95%]'>
                            <div className='w-full'>
                                <div className="footer-widget-heading">
                                    <h3>Subscribe</h3>
                                </div>
                                <div className="footer-text mb-25">
                                    <p className='w-[350px] mobile:w-full micro:w-full'>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                </div>
                                <div className="subscribe-form">
                                    <div>
                                        <input type="email" placeholder="Email Address" />
                                        <button><Send stroke='white' /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <div className='flex justify-center items-center sm:flex-row flex-col gap-x-20 gap-y-2'>
                    <div className='sm:order-1 order-2'>
                        <p className='text-[13px] text-[#878787] text-center'>Copyright &copy; 2018, All Right Reserved <span className='text-[#ff5e14] micro:block'>Usman Haider</span></p>
                    </div>
                    <div className="text-right">
                        <ul className='flex gap-x-5 micro:flex-wrap micro:px-3 micro:justify-center'>
                            <li className='text-[13px] text-[#878787]'>Home</li>
                            <li className='text-[13px] text-[#878787]'>Terms</li>
                            <li className='text-[13px] text-[#878787]'>Privacy</li>
                            <li className='text-[13px] text-[#878787]'>Policy</li>
                            <li className='text-[13px] text-[#878787]'>Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;