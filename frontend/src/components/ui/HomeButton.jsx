import { Link } from "react-router-dom";

export default function HomeButton() {
    return (
        <Link to={"/"}>
            <button className='btn rounded btn-outline-info'>
                <span role="img" aria-label="Home" style={{ marginRight: "8px" }}>🏠</span>
                Torna alla Home
            </button>
        </Link>
    )
}