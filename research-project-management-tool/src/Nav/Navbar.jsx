import React from 'react'
import './common.css'

function Navbar() {
    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-lg">
                    <div class="container">
                        <a class="navbar-brand text-white" href="#"><i class="fa fa-graduation-cap fa-lg mr-2"></i>Research Project Management Tool</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nvbCollapse" aria-controls="nvbCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="nvbCollapse" style={{ paddingLeft: "50%" }}>
                            <ul class="navbar-nav ml-left">
                                <li class="nav-item pl-1">
                                    <a class="nav-link" href="#"><i class="fa fa-home fa-fw mr-1"></i>Home</a>
                                </li>
                                <li class="nav-item pl-1">
                                    <a class="nav-link" href="#"><i class="fa fa-phone fa-fw fa-rotate-180 mr-1"></i>Chats</a>
                                </li>
                                <li class="nav-item pl-1">
                                    <a class="nav-link" href="#"><i class="fa fa-sign-in fa-fw mr-1"></i>Log out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>
        </div>
    )
}

export default Navbar