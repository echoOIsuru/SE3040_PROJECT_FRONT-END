import React from 'react'

function Footer() {
    return (
        <div style={{
            marginTop: "200px"
        }}>
            <footer style={{
                position: "inherit",
                left: 0,
                bottom: 0,
                width: "100%",

            }}>
                <div class="jumbotron jumbotron-fluid bg-dark p-4 mt-5 mb-0">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 cizgi">
                                <div class="card bg-dark border-0">
                                    <div class="card-body text-center">
                                        <h5 class="card-title text-white display-4" style={{ fontSize: "20px" }}>Research project management tool</h5>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 cizgi">
                                <div class="card bg-dark border-0">
                                    <div class="card-body text-center">
                                        <h5 class="card-title text-white display-4" style={{ fontSize: "20px" }}>Application Frameworks - SE3040</h5>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                                <div class="card bg-dark border-0">
                                    <div class="card-body text-center">
                                        <h5 class="card-title text-white display-4" style={{ fontSize: "20px" }}>2022</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer