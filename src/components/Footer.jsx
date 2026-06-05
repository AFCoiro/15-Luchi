const Footer = ({ name }) => {
  return (
    <footer className="footer">
      {/* Mensaje personal */}
      <p className="footer__message">Con amor, {name} 🎀</p>

      {/* Créditos */}
      <p className="footer__credits">
        Sitio desarrollado por <strong>Agustín Coiro</strong> © Todos los derechos reservados
      </p>

      {/* Contacto */}
      <div className="footer__contact">
        <p>📞 <a href="tel:1169742087">1169742087</a></p>
        <p>📧 <a href="mailto:agustinfcoiro@gmail.com">agustinfcoiro@gmail.com</a></p>
      </div>

      {/* Opcional: redes sociales */}
      <div className="footer__social">
        {/* TODO: agregar íconos SVG o FontAwesome */}
        {/* <a href="https://instagram.com/tuusuario" target="_blank" rel="noopener noreferrer">Instagram</a> */}
      </div>
    </footer>
  )
}

export default Footer
