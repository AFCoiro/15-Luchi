const Footer = () => {
  return (
    <footer className="footer">
      {/* Créditos */}
      <p className="footer__credits u-title text-center">
        Sitio desarrollado por <a className="afc bold text-center" href="https://www.linkedin.com/in/agustinfcoiro/" target="_blank">AFCoiro</a> - ©&nbsp;Todos los derechos reservados
      </p>


      {/* Opcional: redes sociales */}
      <div className="footer__social">
        {/* TODO: agregar íconos SVG o FontAwesome */}
        {/* <a href="https://instagram.com/tuusuario" target="_blank" rel="noopener noreferrer">Instagram</a> */}
      </div>
    </footer>
  )
}

export default Footer
