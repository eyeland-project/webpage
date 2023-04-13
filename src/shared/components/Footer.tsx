import MiniLogo from '@icons/MiniLogo.svg';

function Footer() {
	return (
		<div className="mb-5 flex h-auto w-screen flex-col items-center justify-center">
			<hr className="my-5 w-4/5 border-black" />
			<img src={MiniLogo} alt="" />
		</div>
	);
}

export default Footer;
