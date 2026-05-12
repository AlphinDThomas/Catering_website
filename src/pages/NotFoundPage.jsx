import { Link } from 'react-router-dom'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <main className="page not-found-page" aria-label="Page not found">
      <div className="container not-found-inner">
        <p className="label-caps not-found__eyebrow">Error 404</p>
        <h1 className="display-lg not-found__title" aria-label="404">404</h1>
        <h2 className="headline-md not-found__sub">This page has left the menu.</h2>
        <div className="divider divider-center" />
        <p className="body-lg not-found__desc">
          The page you're looking for doesn't exist or has been moved. Let us guide you back to something delicious.
        </p>
        <div className="not-found__ctas">
          <Link to="/" id="not-found-home-btn" className="btn btn-primary">
            Return Home
          </Link>
          <Link to="/menus" id="not-found-menus-btn" className="btn btn-secondary">
            Explore Menus
          </Link>
          <Link to="/book" id="not-found-book-btn" className="btn btn-ghost">
            Book an Event
          </Link>
        </div>
      </div>
    </main>
  )
}
