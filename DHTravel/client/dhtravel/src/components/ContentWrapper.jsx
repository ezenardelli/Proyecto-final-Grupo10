import React from 'react'
import Footer from '../components/Footer'
import TopBar from '../components/TopBar'
import ContentRowTop from '../components/ContentRowTop'

export default function ContentWrapper() {
    return (
        <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
                <TopBar />
                <ContentRowTop />
                <Footer />
            </div>
        </div>
    )
}
