import { About } from '../sections/About'
import { Catalog } from '../sections/Catalog'
import { Collection } from '../sections/Collection'
import { Closing, Contact } from '../sections/Contact'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'

export function Home() {
  return (
    <main>
      <Hero />
      <Collection />
      <Catalog />
      <Services />
      <About />
      <Closing />
      <Contact />
    </main>
  )
}
