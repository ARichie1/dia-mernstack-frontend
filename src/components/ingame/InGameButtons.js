import React from 'react'

const InGameButtons = () => {
    return (
        <div class="codedImages bottomContents">
            <div class="agents">
                <div class="batch1 batch">
                <button class="numbtn" data-sound="../sounds/0.wav" type="button">
                    <img id="_0_" src="assets/images/faces/pa_cyber_bully.png" />
                </button>
                <button class="numbtn" data-sound="../sounds/1.wav" type="button">
                    <img id="_1_" src="assets/images/faces/pa_naval_fireman.png" />
                </button>
                <button class="numbtn" data-sound="../sounds/2.wav" type="button">
                    <img id="_2_" src="assets/images/faces/pa_naval_chef.png" />
                </button>
                </div>
                <div class="batch2 batch">
                <button class="numbtn" data-sound="../sounds/3.wav" type="button">
                    <img id="_3_" src="assets/images/faces/pa_xmas_gangster.png" />
                </button>
                <button class="numbtn" data-sound="../sounds/4.wav" type="button">
                    <img id="_4_" src="assets/images/faces/pa_birthday_zombie.png" />
                </button>
                <button class="numbtn" data-sound="../sounds/5.wav" type="button">
                    <img id="_5_" src="assets/images/faces/pa_devil_wakanda.png" />
                </button>
                </div>
                <div class="batch3 batch">
                <button class="numbtn" data-sound="../sounds/6.wav" type="button">
                    <img id="_6_" src="assets/images/faces/pa_paid_tiger.png" />
                </button>
                <button class="numbtn" data-sound="../sounds/7.wav" type="button">
                    <img id="_7_" src="assets/images/faces/pa_paid_wakanda.png" />
                </button>
                <button class="numbtn" data-sound="../sounds/8.wav" type="button">
                    <img id="_8_" src="assets/images/faces/pa_savage_vikings.png" />
                </button>
                </div>
                <div class="batch4 batch">
                <button id="btnx1" class="numbtnReset" type="button">Reset</button>
                <button class="numbtn" data-sound="../sounds/9.wav" type="button">
                    <img id="_9_" src="assets/images/faces/pa_red_indian.png" />
                </button>
                <button id="btnx2" class="numbtnSend" type="button">Check</button>
                </div>
            </div>
        </div>
    )
}

export default InGameButtons