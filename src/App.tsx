import { Route, Switch } from 'wouter'
import { Layout } from './components/layout'
import Home from './pages/home'
import About from './pages/about'
import Services from './pages/services'
import Contact from './pages/contact'
import CaseStudies from './pages/case-studies'
import Blog from './pages/blog'

function Router () {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/blog/:id">
        {(params) => <Blog params={params} />}
      </Route>
      <Route>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-muted-foreground">Page not found</p>
          </div>
        </div>
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  )
}

export default App