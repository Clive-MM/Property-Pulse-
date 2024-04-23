import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebook, 
    faInstagram, 
    faLinkedin, 
    faGithub, 
    faGoogle 
} from '@fortawesome/free-brands-svg-icons';


function ContactUs(){
    return(
        <div>
            <div>
                <h3 className="text-muted">CONTACT</h3>
            </div>
            <div>
                <h4>Connecting You to Your Dream Home,</h4>
                <h4>Reach Out and Let's Make It Happen!</h4>
            </div>
            <div>
                <p>0723176982</p>
                <p>propertypulse@gmail.com</p>
                <div>
                    <div>
                    <a href="@propertypulse" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} /> 
                    </a>
                    </div>

                    <div>
                    <a href="@instagram" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} /> 
                    </a>
                    </div>

                    <div>

                    <a href="@linkedin" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} /> 
                    </a>
                    </div>

                    <div>
                    <a href="@github" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub} /> 
                    </a>
                    </div>

                    <div>
                    <a href="@google" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGoogle} /> 
                    </a>
                    </div>
                  
                    
                    
                    
                </div>
            </div>
        </div>
    )
}

export default ContactUs;
