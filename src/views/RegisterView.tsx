import { Link } from "react-router-dom";

export default function RegisterView() {
    return (
        <>
            <div>RegisterView</div>

            <nav>
                <Link to='/auth/login'>
                    Ya tienes Cuenta? Inicia Sesion
                </Link>
            </nav>
        </>
    )
}
