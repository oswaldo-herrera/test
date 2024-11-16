function Navbar() {
  return (
    <nav className="flex flex-row w-dvw fixed top-0 left-0 bg-blue-600">
        <div className="flex flex-row w-dvw">
            <a href="/" className="text-black text-2xl font-bold p-2">Home</a>
        </div>
        <div className="flex flex-row w-dvw">
            <a href="/login" className="text-black text-2xl font-bold p-2">Login</a>
        </div>

    </nav>
  );
}

export default Navbar;