import React, { useState, useEffect } from 'react';
//import nav bar
import NavBar from "../../component/common/UserNav"
import GetStarted from "../../component/general/getStarted"
import CoinSection from "../../component/general/coinSection"

import EarningSection from "../../component/general/earningSection"
import Patner from "../../component/general/patner"
import PortfolioSection from "../../component/general/portfolio"
import SecuritySection from "../../component/general/Security"
import InfoSection from "../../component/general/Info"
import Action from "../../component/general/action"

import Footer from "../../component/common/Footer"
import EarnSection from '../../component/general/earnSection';
import Download from './../../component/Modal/Download';
import { DownloadButton } from '../../component/general/DownloadButton';



function Home() {
    let [download, setDownload] = useState(false)
    let navigateToApp = () => {
        //alert('navigating')
    }

 

    let closeHandler =()=>{
        setDownload(false)

    }


    return (<>
        <NavBar navigateToApp={navigateToApp} />

        <GetStarted navigateToApp={navigateToApp} />
        
        <DownloadButton/>

        <CoinSection navigateToApp={navigateToApp} />

        <EarnSection navigateToApp={navigateToApp} />

        <PortfolioSection navigateToApp={navigateToApp} />

        <SecuritySection navigateToApp={navigateToApp} />

        <InfoSection navigateToApp={navigateToApp} />

        <Action navigateToApp={navigateToApp} />

        {/*<Patner />*/}

        <EarningSection navigateToApp={navigateToApp} />
        <Footer />
    </>

    );
}

export default Home;