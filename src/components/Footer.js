import Github from "../assets/github.png";

function Footer() {
  return (
    <footer className="footer">
      <div>Copyright © 2022 </div>
      <a href="https://github.com/wise-guru/cico-mode">
        <img src={Github} alt="Github Logo" />
      </a>
    </footer>
  );
}

export default Footer;
