import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <Link to={"/"}>
            <button className='btn rounded btn-outline-info'>
                <span role="img" aria-label="Home" >🏠</span>

            </button>
        </Link>
    )
}