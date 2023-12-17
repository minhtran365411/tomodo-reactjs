//import progress bar from npm
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {StyleSheet, View} from 'react-native-web';
import '../App.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingButton from './SettingButton';
import MusicBox from './MusicBox';

import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';


function Timer() {
    //called context being passed from paramodo page
    const settingsInfo = useContext(SettingsContext);

    //set states
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); //work,break,null
    const [secondsLeft, setSecondsLeft] = useState(0);

    //set refs
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSecond = (nextMode === 'work'? settingsInfo.workMinutes : settingsInfo.breakMinutes)*60;
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSecond);
        secondsLeftRef.current = nextSecond;
    }

    //every time the counter count down - tick in tick tock
    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        secondsLeftRef.current = settingsInfo.workMinutes * 60
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        initTimer();

        //countdown
        const interval = setInterval(() => {
            if(isPausedRef.current) { //if pausing, do nothing
                return;
            } 
            if(secondsLeftRef.current === 0) {
                switchMode(); //call function switching betweens different modes
            }
            tick();
        }, 1000);

        return () => clearInterval(interval);

    },[settingsInfo]); //update everytime this changes

    //calculate percentage
    const totalSeconds = mode === 'work' ? settingsInfo.workMinutes*60 : settingsInfo.breakMinutes*60;
    const percentage = Math.round(secondsLeft/totalSeconds*100);

    //calculate to show minutes & seconds left
    const minutes = Math.floor(secondsLeft/60);
    let seconds = secondsLeft%60;
    if(seconds < 10) seconds = '0'+seconds //give 00 at the end

    return (
        <View style={styles.container}>
        
        <View>
        <CircularProgressbar value={percentage} text={minutes +':'+seconds} styles={buildStyles({
            pathColor: mode === 'work' ? '#ff6d29' : '#52de6c',
            textColor: mode === 'work' ? '#ff6d29' : '#52de6c',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
        })} />
        
        {/* play button for timer */}
        <div style={{marginTop: 20}}>
            {/* show either thie or another btn */}
            {isPaused ? 
                <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false;}} /> 
                : 
                <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true;}} />
            }
        
        </div>

        <div style={{marginTop: 20}}>
            <SettingButton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>



        </View>

        <View >
        <MusicBox />
        </View>

        </View>
    )
}

export default Timer;

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        marginLeft: '10%',
        marginTop: '10%'
    }
})