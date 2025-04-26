import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
        <div className="text-5xl">LoginView</div>

        <nav>
            <Link to='/auth/register'>
                No tienes una cuenta? Create una aqui
            </Link>
        </nav>

    </>
  )
}
