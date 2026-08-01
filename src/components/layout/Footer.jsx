import { MessageCircle, Phone } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__credits u-title text-center">
        Sitio desarrollado por{' '}

        <a
          className="footer__afc bold"
          href="https://wa.me/5491169742087"
          target="_blank"
          rel="noopener noreferrer"
        >
          AFCoiro

          <MessageCircle
            size={20}
            strokeWidth={1.8}
          >
            <Phone
              size={10}
              x={7}
              y={7}
              strokeWidth={2}
              absoluteStrokeWidth
            />
          </MessageCircle>
        </a>
      </p>
    </footer>
  )
}

export default Footer