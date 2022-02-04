import Link from "next/link"
import Image from "next/image"
import logo from "../public/img/mavic.png"

const Navbar = ({account}) => {
return (
    <div className="navbar">
        <div className="logo-wrapper">
            <Link href="/" passHref><Image className="nav-logo" src={logo} alt={"mavic Logo"} width={100} height={70}></Image></Link>
        </div>
        <div className="account-info">
            <p>Welcome, <strong>{account.username}</strong></p>
            <div className="ava">
            <Image height={35} width={35} className="avatar" src={account.avatar.url} alt="account-image" />
            </div>
        </div>
    </div>
)
}

export default Navbar;