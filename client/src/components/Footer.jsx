export default function Footer({ className }) {
  return (
    <footer
      className={`${className} mt-auto bg-blue-900 h-16 px-3 lg:px-16 flex items-center gap-1 justify-center text-white`}
    >
      Copyright &copy; {new Date().getFullYear()}
      <a href="https://landing-khotami.vercel.app/" className="text-cyan-500 hover:underline">
        mkhotami
      </a>{" "}
    </footer>
  );
}
Footer.propTypes;
