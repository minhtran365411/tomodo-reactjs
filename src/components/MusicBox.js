import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

function MusicBox() {
    const [youtubeLink, setYoutubeLink] = useState("https://www.youtube.com/embed/xDLDiUjrk5g?si=c6VEO-azIfdM_ljo");

    //function to switch to a different channel according to button
    function changeVideo(number) {
        switch (number) {
            case 1:
                setYoutubeLink("https://www.youtube.com/embed/xDLDiUjrk5g?si=c6VEO-azIfdM_ljo")
            break;

            case 2:
                setYoutubeLink("https://www.youtube.com/embed/I59cZGcSJhE?si=zEy13yrFdHC60pcx")
            break;

            case 3:
                setYoutubeLink("https://www.youtube.com/embed/jfKfPfyJRdk?si=tjPcBdGri_fMwqBX")
            break;

            case 4:
                setYoutubeLink("https://www.youtube.com/embed/tVW7Fb3qK_A?si=PFZb87Tf4wHMWBxw")
            break;
        
            default:
                break;
        }
    }

    return (
        <main>
            <iframe style={{width:'100%', height: 'auto'}}  src={youtubeLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <p style={{marginTop: 20}}>Click on button to choose different channel:</p>
            <ButtonToolbar aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                    <Button onClick={()=> changeVideo(1)}>1</Button> 
                    <Button onClick={()=> changeVideo(2)}>2</Button> 
                    <Button  onClick={()=> changeVideo(3)}>3</Button>{' '}
                    <Button  onClick={()=> changeVideo(4)}>4</Button>
                </ButtonGroup>
            </ButtonToolbar>    
        </main>
    )
}

export default MusicBox;