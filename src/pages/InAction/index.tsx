import NavBar from "@components/NavBar"
import Hero from "./components/Hero"
import Testimonies from "./components/Testimonies"
import Report from "./components/Report"
import Footer from "@components/Footer"

function InAction() {
    return (
        <div>
            <NavBar />
            <div className="mx-20">
                <Hero />
                <Testimonies />
                <Report />
            </div>
            <Footer />
        </div>
    )
}

export default InAction