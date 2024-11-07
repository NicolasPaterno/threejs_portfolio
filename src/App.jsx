
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";

const App = () => {
    return (
        <main className={"max-w-7xl mx-auto relative"}>
            <Navbar/>
            <Hero/>
            <About/>
            <Projects/>
        </main>
    )
}
export default App
