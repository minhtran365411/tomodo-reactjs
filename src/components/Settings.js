import { useContext } from 'react';
import '../App.css'
import ReactSlider from 'react-slider';
import SettingsContext from './SettingsContext';
import BackButton from './BackButton';

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    return(
        <div className='settingsContainer'>

            <label><b>Work:</b> {settingsInfo.workMinutes}:00 minutes</label>
            <ReactSlider 
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes} //call from the context
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />

            <label><b>Break:</b> {settingsInfo.breakMinutes}:00 minutes</label>
            <ReactSlider 
                className={'slider break'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakMinutes} //call from the context
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={60}
            />
            <div style={{textAlign:'center', marginTop: '20px'}}>
            <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
            </div>
            

        </div>
    )
}

export default Settings;